/**
 * Cloudflare Worker for Logo Upload Service
 *
 * Handles file uploads to R2 storage with:
 * - CORS support for https://latente.net
 * - File validation (images only, max 10MB)
 * - Metadata storage
 * - Secure download endpoints
 */

interface Env {
  LOGOS_BUCKET: R2Bucket;
  CORS_ORIGIN: string;
  MAX_FILE_SIZE: string;
  ALLOWED_EXTENSIONS: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    key: string;
    url: string;
    downloadUrl: string;
    size: number;
    type: string;
    shortCode: string;
  };
  error?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  error: string;
}

// CORS headers for our allowed origin
const getCorsHeaders = (origin: string): Record<string, string> => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
});

// Validate file extension
const isValidExtension = (filename: string, allowedExtensions: string[]): boolean => {
  const extension = filename.toLowerCase().split('.').pop();
  return extension ? allowedExtensions.includes(extension) : false;
};

// Validate MIME type for images
const isValidMimeType = (mimeType: string): boolean => {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/svg'
  ];
  return validTypes.includes(mimeType);
};

// Generate file key for R2 storage
const generateFileKey = (shortCode: string, extension: string): string => {
  const timestamp = Date.now();
  return `${shortCode}/${timestamp}.${extension}`;
};

// Handle CORS preflight requests
function handleCORS(origin: string): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

// Handle file upload
async function handleUpload(request: Request, env: Env): Promise<Response> {
  const origin = env.CORS_ORIGIN;

  try {
    // Validate content type
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      const error: ErrorResponse = {
        success: false,
        message: 'Invalid content type',
        error: 'Content-Type must be multipart/form-data'
      };
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
      });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const shortCode = formData.get('shortCode') as string;
    const fileExtension = formData.get('fileExtension') as string;

    // Validate required fields
    if (!file || !shortCode || !fileExtension) {
      const error: ErrorResponse = {
        success: false,
        message: 'Missing required fields',
        error: 'file, shortCode, and fileExtension are required'
      };
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
      });
    }

    // Validate file size
    const maxSize = parseInt(env.MAX_FILE_SIZE);
    if (file.size > maxSize) {
      const error: ErrorResponse = {
        success: false,
        message: 'File too large',
        error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`
      };
      return new Response(JSON.stringify(error), {
        status: 413,
        headers: {
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
      });
    }

    // Validate file extension
    const allowedExtensions = env.ALLOWED_EXTENSIONS.split(',');
    if (!isValidExtension(file.name, allowedExtensions)) {
      const error: ErrorResponse = {
        success: false,
        message: 'Invalid file type',
        error: `Only ${allowedExtensions.join(', ')} files are allowed`
      };
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
      });
    }

    // Validate MIME type
    if (!isValidMimeType(file.type)) {
      const error: ErrorResponse = {
        success: false,
        message: 'Invalid file type',
        error: 'Only image files are allowed'
      };
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
      });
    }

    // Generate unique key
    const key = generateFileKey(shortCode, fileExtension);

    // Prepare metadata
    const metadata = {
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      shortCode: shortCode,
      uploadTime: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await env.LOGOS_BUCKET.put(key, arrayBuffer, {
      customMetadata: metadata,
      httpMetadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000', // 1 year cache
      },
    });

    // Generate URLs
    const baseUrl = `https://${request.headers.get('host')}`;
    const url = `${baseUrl}/download/${key}`;
    const downloadUrl = `${baseUrl}/download/${key}`;

    // Success response
    const response: UploadResponse = {
      success: true,
      message: 'File uploaded successfully',
      data: {
        key,
        url,
        downloadUrl,
        size: file.size,
        type: file.type,
        shortCode,
      },
    };

    console.log(`File uploaded: ${key} (${file.size} bytes) for shortCode: ${shortCode}`);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...getCorsHeaders(origin),
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Upload error:', error);

    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        ...getCorsHeaders(origin),
        'Content-Type': 'application/json',
      },
    });
  }
}

// Handle file download
async function handleDownload(request: Request, env: Env, key: string): Promise<Response> {
  const origin = env.CORS_ORIGIN;

  try {
    // Get file from R2
    const object = await env.LOGOS_BUCKET.get(key);

    if (!object) {
      const error: ErrorResponse = {
        success: false,
        message: 'File not found',
        error: `The file with key ${key} does not exist`
      };
      return new Response(JSON.stringify(error), {
        status: 404,
        headers: {
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        },
      });
    }

    // Get metadata
    const metadata = object.customMetadata || {};
    const contentType = object.httpMetadata?.contentType || 'application/octet-stream';
    const originalName = metadata.originalName || `logo.${key.split('.').pop()}`;

    // Set security headers
    const headers = {
      ...getCorsHeaders(origin),
      'Content-Type': contentType,
      'Content-Length': object.size.toString(),
      'Cache-Control': 'public, max-age=31536000', // 1 year cache
      'Content-Disposition': `inline; filename="${originalName}"`,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };

    console.log(`File downloaded: ${key} (${object.size} bytes)`);

    return new Response(object.body, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Download error:', error);

    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Download failed',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        ...getCorsHeaders(origin),
        'Content-Type': 'application/json',
      },
    });
  }
}

// Main request handler
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const origin = env.CORS_ORIGIN;

    // Log request details
    console.log(`${request.method} ${url.pathname} - Origin: ${request.headers.get('origin')}`);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(origin);
    }

    // Route requests
    switch (request.method) {
      case 'POST':
        if (url.pathname === '/upload') {
          return handleUpload(request, env);
        }
        break;

      case 'GET':
        if (url.pathname.startsWith('/download/')) {
          const key = url.pathname.replace('/download/', '');
          if (key) {
            return handleDownload(request, env, key);
          }
        }
        break;

      default:
        break;
    }

    // 404 for unknown routes
    const error: ErrorResponse = {
      success: false,
      message: 'Not found',
      error: 'The requested endpoint does not exist',
    };

    return new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        ...getCorsHeaders(origin),
        'Content-Type': 'application/json',
      },
    });
  },
};