# File Upload System Architecture v3.0 - Cloudflare Workers + R2 Solution

## Problem Statement
- GitHub Actions workflow inputs have 65KB size limitation
- Browser uploads to `uploads.github.com` blocked by CORS
- Base64 conversion causes performance issues and file size bloat
- Need reliable large file upload system without size limits
- Cross-device compatibility required

## Solution Architecture

### 1. Browser → Cloudflare Worker → R2 Storage Flow
```
User uploads logo → Cloudflare Worker receives FormData → Store file in R2 → Return file URL → Trigger GitHub Actions with URL
```

### 2. GitHub Actions Integration Flow
```
Receive file URL from R2 → Download file from R2 URL → Store as /assets/logos/{shortCode}.{ext} → Update repo and deploy
```

## Technical Implementation

### Phase 1: Cloudflare Worker Setup

#### 1.1 Worker Configuration (wrangler.jsonc)
```jsonc
{
  "name": "logo-upload-worker",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "r2_buckets": [
    {
      "binding": "LOGO_BUCKET",
      "bucket_name": "logos-storage"
    }
  ],
  "vars": {
    "ALLOWED_ORIGINS": "https://latente.net"
  }
}
```

#### 1.2 Worker Code Structure (src/index.ts)
```typescript
interface Env {
  LOGO_BUCKET: R2Bucket;
  ALLOWED_ORIGINS: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight handling
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    // Upload endpoint
    if (url.pathname === '/upload' && request.method === 'POST') {
      return handleUpload(request, env);
    }

    // Download endpoint (for GitHub Actions)
    if (url.pathname.startsWith('/download/') && request.method === 'GET') {
      return handleDownload(request, env);
    }

    return new Response('Not found', { status: 404 });
  }
}

function handleCORS(): Response {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://latente.net',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

async function handleUpload(request: Request, env: Env): Promise<Response> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const shortCode = formData.get('shortCode') as string;
    const fileExtension = formData.get('fileExtension') as string;

    if (!file || !shortCode || !fileExtension) {
      return Response.json(
        { error: 'Missing required parameters: file, shortCode, fileExtension' },
        { status: 400, headers: getCORSHeaders() }
      );
    }

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      return Response.json(
        { error: 'Only image files are allowed' },
        { status: 400, headers: getCORSHeaders() }
      );
    }

    // Generate unique filename
    const fileName = `${shortCode}.${fileExtension}`;
    const key = `logos/${fileName}`;

    // Store file in R2
    await env.LOGO_BUCKET.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type,
        contentDisposition: `inline; filename="${fileName}"`
      },
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        shortCode: shortCode,
        fileExtension: fileExtension
      }
    });

    // Return file URL for GitHub Actions
    const fileUrl = `https://logo-upload-worker.latente.workers.dev/download/${key}`;

    return Response.json({
      success: true,
      fileUrl: fileUrl,
      fileName: fileName,
      fileSize: file.size,
      contentType: file.type
    }, {
      headers: getCORSHeaders()
    });

  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: 'Upload failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: getCORSHeaders() }
    );
  }
}

async function handleDownload(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const key = url.pathname.slice(10); // Remove '/download/' prefix

  const object = await env.LOGO_BUCKET.get(key);

  if (!object) {
    return new Response('File not found', { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      'Content-Length': object.size.toString(),
      'Cache-Control': 'public, max-age=31536000', // 1 year cache
      'ETag': object.etag,
    }
  });
}

function getCORSHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': 'https://latente.net',
    'Access-Control-Allow-Credentials': 'true',
  };
}
```

### Phase 2: URL Generator Integration

#### 2.1 Update uploadLogoAsArtifact Function (url-generator.html)
```javascript
// Upload logo to Cloudflare Worker + R2 (no base64, no size limits)
static async uploadLogoAsArtifact(file, shortCode, fileExtension) {
    try {
        console.log('📤 Uploading logo to Cloudflare Worker + R2');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('shortCode', shortCode);
        formData.append('fileExtension', fileExtension);

        const response = await fetch('https://logo-upload-worker.latente.workers.dev/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Upload failed: ${errorData.error || response.statusText}`);
        }

        const result = await response.json();
        console.log('✅ Logo uploaded to R2:', result.fileUrl);

        // Return the R2 file URL for GitHub Actions to download
        return result.fileUrl;

    } catch (error) {
        console.error('❌ Failed to upload logo to Cloudflare Worker:', error);
        throw error;
    }
}
```

#### 2.2 Update Workflow Trigger Payload
```javascript
// In triggerGitHubAction function
const payload = {
    ref: 'main',
    inputs: {
        shortCode: shortCode,
        longUrl: baseUrlForGitHub,
        expirationHours: expirationHours.toString(),
        metadata: metadataPayload,
        logoFileUrl: artifactUrl, // R2 file URL (not base64)
        logoExtension: logoFileExtension
    }
};
```

### Phase 3: GitHub Actions Workflow Update

#### 3.1 Add New Workflow Input (.github/workflows/url-shortener.yml)
```yaml
on:
  workflow_dispatch:
    inputs:
      shortCode:
        description: 'Short code'
        required: true
        type: string
      longUrl:
        description: 'Long URL to redirect to'
        required: true
        type: string
      expirationHours:
        description: 'Expiration in hours (default: 72)'
        required: false
        type: string
        default: '72'
      logoFileUrl:  # NEW: R2 file URL instead of base64 data
        description: 'R2 file URL for logo download'
        required: false
        type: string
      logoExtension:
        description: 'Logo file extension (png, jpg, gif, webp)'
        required: false
        type: string
      metadata:
        description: 'Personalization metadata for cross-device use'
        required: false
        type: string
        default: '{}'
```

#### 3.2 Add Logo Download Step
```yaml
- name: Download logo file from R2
  if: ${{ github.event.inputs.logoFileUrl != '' }}
  run: |
    echo "DEBUG: Downloading logo from R2"
    LOGO_FILE_URL="${{ github.event.inputs.logoFileUrl }}"
    LOGO_EXTENSION="${{ github.event.inputs.logoExtension }}"
    SHORT_CODE="${{ github.event.inputs.shortCode }}"

    if [ -n "$LOGO_FILE_URL" ] && [ -n "$LOGO_EXTENSION" ] && [ -n "$SHORT_CODE" ]; then
      echo "DEBUG: Logo file URL: $LOGO_FILE_URL"
      echo "DEBUG: Logo extension: $LOGO_EXTENSION"
      echo "DEBUG: Short code: $SHORT_CODE"

      # Create logo directory
      mkdir -p public/assets/logos

      # Download file from R2
      LOGO_FILE_PATH="public/assets/logos/${SHORT_CODE}.${LOGO_EXTENSION}"

      curl -L -o "$LOGO_FILE_PATH" "$LOGO_FILE_URL"

      if [ -f "$LOGO_FILE_PATH" ]; then
        FILE_SIZE=$(stat -c%s "$LOGO_FILE_PATH" 2>/dev/null || stat -f%z "$LOGO_FILE_PATH" 2>/dev/null || echo "unknown")
        echo "DEBUG: Logo file downloaded successfully: $LOGO_FILE_PATH"
        echo "DEBUG: File size: $FILE_SIZE bytes"
      else
        echo "ERROR: Failed to download logo file"
        exit 1
      fi
    else
      echo "DEBUG: No logo file URL provided, skipping logo download"
    fi
```

### Phase 4: Deployment Plan

#### 4.1 Cloudflare Worker Deployment
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create R2 bucket
wrangler r2 bucket create logos-storage

# Deploy worker
wrangler deploy
```

#### 4.2 Custom Domain Setup
```bash
# Set up custom domain (optional but recommended)
wrangler custom-domains create logo-upload-worker.latente.workers.dev
```

## File Structure

### Cloudflare Worker Project Structure
```
logo-upload-worker/
├── wrangler.jsonc
├── src/
│   └── index.ts
├── package.json
└── README.md
```

### Updated URL Generator Integration Points
```
public/tools/url-generator.html
├── uploadLogoAsArtifact() - Updated to use Cloudflare Worker
├── triggerGitHubAction() - Updated payload structure
└── CORS handling for cross-origin requests
```

### GitHub Actions Updates
```
.github/workflows/url-shortener.yml
├── New input: logoFileUrl (R2 URL instead of base64)
├── New step: Download logo from R2
└── Existing logo processing steps remain unchanged
```

## Security Considerations

### 1. CORS Configuration
- Restrict to specific origins: `https://latente.net`
- Validate file types: Only image files allowed
- Implement rate limiting if needed

### 2. File Validation
- File type validation in Cloudflare Worker
- File size limits (if desired)
- Malicious file detection

### 3. Access Control
- Optional: Add authentication tokens for upload
- Optional: Rate limiting per IP address
- Optional: Temporary URL expiration

## Performance Benefits

### Before (GitHub Actions + Base64)
- ❌ 65KB input size limit
- ❌ Base64 conversion overhead (33% size increase)
- ❌ Browser memory issues with large files
- ❌ CORS restrictions on uploads.github.com

### After (Cloudflare Workers + R2)
- ✅ No practical file size limits
- ✅ Direct binary upload (no base64)
- ✅ Edge-optimized performance
- ✅ CORS-compliant
- ✅ Global CDN distribution
- ✅ Simple URL-based integration

## Testing Plan

### 1. Unit Tests
- Cloudflare Worker upload endpoint
- File validation logic
- CORS handling

### 2. Integration Tests
- End-to-end upload from browser to R2
- GitHub Actions download from R2
- URL generation with logo files

### 3. Performance Tests
- Large file upload performance
- Concurrent upload handling
- Edge response times

## Monitoring & Analytics

### 1. Cloudflare Workers Analytics
- Request counts and response times
- Error rates and types
- Geographic distribution

### 2. R2 Storage Metrics
- Storage usage
- Request counts
- Download performance

### 3. Custom Metrics
- Upload success/failure rates
- File size distribution
- Popular file types

## Cost Analysis

### Cloudflare Workers (Free Tier)
- 100,000 requests/day free
- 10ms CPU time per request free
- Beyond: $0.50 per million requests

### R2 Storage (Free Tier)
- 10GB storage free
- 1 million Class A operations free
- Beyond: $0.015 per GB-month storage

### Estimated Monthly Cost (moderate usage)
- Workers: $0-5/month
- R2 Storage: $0-2/month
- **Total: $0-7/month** (vs unlimited complexity with base64 issues)

## Migration Strategy

### Phase 1: Setup (Week 1)
- Create Cloudflare Worker project
- Set up R2 bucket
- Implement basic upload functionality

### Phase 2: Integration (Week 2)
- Update URL generator to use Cloudflare Worker
- Modify GitHub Actions workflow
- Test end-to-end functionality

### Phase 3: Deployment (Week 3)
- Deploy Cloudflare Worker
- Update production URL generator
- Monitor and optimize

### Phase 4: Cleanup (Week 4)
- Remove old base64 upload code
- Update documentation
- Performance tuning

## Success Metrics

### Technical Metrics
- ✅ Upload success rate > 99%
- ✅ Average upload time < 5 seconds
- ✅ Zero CORS errors
- ✅ Support for files up to 10MB

### Business Metrics
- ✅ Improved user experience
- ✅ Reduced support requests for upload issues
- ✅ Faster page loading (no base64 bloat)
- ✅ Cross-device functionality working

## Rollback Plan

### If Cloudflare Worker Approach Fails
1. **Immediate**: Disable logo upload feature
2. **Fallback**: Use placeholder logos from workflow
3. **Long-term**: Revert to server-side upload approach

### Rollback Steps
1. Comment out Cloudflare Worker upload code
2. Revert GitHub Actions workflow to previous version
3. Deploy fallback implementation
4. Monitor for functionality restoration

## Documentation Updates

### 1. API Documentation
- Cloudflare Worker endpoint documentation
- Request/response formats
- Error handling guidelines

### 2. User Documentation
- Updated upload instructions
- Troubleshooting guide
- Supported file formats and sizes

### 3. Developer Documentation
- Architecture overview
- Integration guide
- Maintenance procedures

---

## Implementation Checklist

- [ ] Create Cloudflare Worker project
- [ ] Set up R2 bucket
- [ ] Implement upload endpoint with CORS
- [ ] Add file validation and security
- [ ] Update URL generator upload function
- [ ] Modify GitHub Actions workflow inputs
- [ ] Add R2 download step to workflow
- [ ] Test end-to-end upload flow
- [ ] Deploy Cloudflare Worker
- [ ] Update production URL generator
- [ ] Monitor performance and errors
- [ ] Update documentation
- [ ] Conduct security review
- [ ] Performance optimization
- [ ] User acceptance testing

This architecture completely eliminates the base64 and CORS limitations while providing a scalable, performant solution for large file uploads.