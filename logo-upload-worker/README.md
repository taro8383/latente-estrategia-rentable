# Logo Upload Worker

A Cloudflare Worker service for handling logo file uploads with R2 storage. This service provides secure file upload and download endpoints specifically designed for storing logos used in GitHub Actions workflows.

## Features

- 🚀 **High Performance**: Built on Cloudflare Workers for global edge deployment
- 📁 **R2 Storage**: Uses Cloudflare R2 for durable, cost-effective file storage
- 🔒 **Secure**: CORS protection, file validation, and security headers
- 📱 **Image Only**: Accepts only image files (jpg, png, gif, webp, svg)
- 📏 **Size Limits**: 10MB maximum file size
- 🏷️ **Metadata**: Stores comprehensive file metadata
- 🔍 **Logging**: Detailed logging for monitoring and debugging

## API Endpoints

### POST /upload
Upload a logo file to R2 storage.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with the following fields:
  - `file`: File (required) - The image file to upload
  - `shortCode`: string (required) - Short code identifier for organization
  - `fileExtension`: string (required) - File extension (e.g., "png", "jpg")

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "key": "example/1715123456789.png",
    "url": "https://worker-domain.com/download/example/1715123456789.png",
    "downloadUrl": "https://worker-domain.com/download/example/1715123456789.png",
    "size": 1234567,
    "type": "image/png",
    "shortCode": "example"
  }
}
```

### GET /download/{key}
Download a stored file by key.

**Request:**
- Method: `GET`
- URL Parameter: `key` - The R2 storage key

**Response:**
- Returns the file with appropriate headers
- Includes security headers and caching

## Setup Instructions

### Prerequisites

1. **Cloudflare Account**: Active Cloudflare account with Workers and R2 enabled
2. **Node.js**: Version 18.0.0 or higher
3. **Wrangler CLI**: Install globally with `npm install -g wrangler`

### Installation

1. **Clone or create the project:**
```bash
git clone <your-repo>
cd logo-upload-worker
```

2. **Install dependencies:**
```bash
npm install
```

3. **Authenticate with Cloudflare:**
```bash
wrangler auth login
```

4. **Create R2 bucket:**
```bash
wrangler r2 bucket create logos-storage
```

5. **Configure environment variables (optional):**
Edit `wrangler.jsonc` to customize:
- `CORS_ORIGIN`: Default is "https://latente.net"
- `MAX_FILE_SIZE`: Default is "10485760" (10MB)
- `ALLOWED_EXTENSIONS`: Default is "jpg,jpeg,png,gif,webp,svg"

### Development

1. **Start local development:**
```bash
npm run dev
```

2. **Test locally:**
The worker will be available at `http://localhost:8787`

### Deployment

1. **Deploy to production:**
```bash
npm run deploy
```

2. **Deploy to staging (if configured):**
```bash
npm run deploy:staging
```

## Usage Examples

### Upload a File

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('shortCode', 'my-company');
formData.append('fileExtension', 'png');

const response = await fetch('https://your-worker.workers.dev/upload', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log('Upload result:', result);
```

### Download a File

```javascript
// Use the downloadUrl from upload response
const downloadUrl = result.data.downloadUrl;

// Display image
const img = document.createElement('img');
img.src = downloadUrl;
document.body.appendChild(img);

// Or download with fetch
const response = await fetch(downloadUrl);
const blob = await response.blob();
```

## File Storage Structure

Files are stored in R2 using the following structure:
```
{shortCode}/{timestamp}.{extension}
```

Example:
```
apple/1715123456789.png
google/1715123456790.svg
microsoft/1715123456791.jpg
```

## Security Features

- **CORS Protection**: Only allows requests from configured origin
- **File Validation**: Validates file extensions and MIME types
- **Size Limits**: Enforces maximum file size
- **Security Headers**: Includes comprehensive security headers
- **Input Validation**: Validates all required fields

## Error Handling

The service returns detailed error responses:

```json
{
  "success": false,
  "message": "File too large",
  "error": "File size exceeds 10MB limit"
}
```

Common error codes:
- `400`: Bad Request (invalid input, missing fields)
- `404`: Not Found (file doesn't exist)
- `413`: Payload Too Large (file exceeds size limit)
- `500`: Internal Server Error

## Monitoring

- **Console Logs**: All operations are logged to Cloudflare Workers console
- **Request Tracking**: Each request logs method, path, and origin
- **Error Tracking**: Detailed error logging for debugging

## Configuration

### Environment Variables

Set these in `wrangler.jsonc`:

```json
{
  "vars": {
    "CORS_ORIGIN": "https://your-domain.com",
    "MAX_FILE_SIZE": "10485760",
    "ALLOWED_EXTENSIONS": "jpg,jpeg,png,gif,webp,svg"
  }
}
```

### R2 Bucket

The worker expects an R2 bucket named `logos-storage`. Update the binding in `wrangler.jsonc` if using a different name:

```json
{
  "r2_buckets": [
    {
      "binding": "LOGOS_BUCKET",
      "bucket_name": "your-bucket-name"
    }
  ]
}
```

## Integration with GitHub Actions

The upload response provides a `downloadUrl` that can be used in GitHub Actions workflows:

```yaml
- name: Upload logo
  run: |
    response=$(curl -X POST \
      -F "file=@logo.png" \
      -F "shortCode=org-name" \
      -F "fileExtension=png" \
      https://your-worker.workers.dev/upload)

    download_url=$(echo $response | jq -r '.data.downloadUrl')
    echo "DOWNLOAD_URL=$download_url" >> $GITHUB_ENV
```

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check Cloudflare Workers dashboard for logs
2. Review error responses for detailed information
3. Verify R2 bucket configuration and permissions