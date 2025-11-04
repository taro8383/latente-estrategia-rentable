# Cloudflare Worker Deployment Guide

## 🚀 Quick Deployment Instructions

### Prerequisites
- Cloudflare account (free tier is sufficient)
- Node.js 18+ installed
- Wrangler CLI installed

### Step 1: Install Wrangler CLI
```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare
```bash
cd logo-upload-worker
wrangler login
```

### Step 3: Create R2 Bucket
```bash
wrangler r2 bucket create logos-storage
```

### Step 4: Deploy Worker
```bash
npm run deploy
```

### Step 5: Verify Deployment
Visit: `https://logo-upload-worker.your-subdomain.workers.dev`

## 📋 Deployment Checklist

### ✅ Pre-Deployment
- [ ] Cloudflare account created
- [ ] Wrangler CLI installed globally
- [ ] Node.js 18+ available
- [ ] logo-upload-worker directory exists
- [ ] All dependencies installed (`npm install`)

### ✅ Deployment Steps
- [ ] Login to Cloudflare with `wrangler login`
- [ ] Create R2 bucket: `wrangler r2 bucket create logos-storage`
- [ ] Deploy worker: `npm run deploy`
- [ ] Test upload endpoint
- [ ] Test download endpoint
- [ ] Verify CORS headers for https://latente.net

### ✅ Post-Deployment
- [ ] Update URL generator if worker URL differs
- [ ] Test end-to-end upload flow
- [ ] Monitor Cloudflare Workers analytics
- [ ] Set up custom domain (optional)

## 🔧 Configuration Options

### Environment Variables
The worker uses these configurable variables in `wrangler.jsonc`:
- `CORS_ORIGIN`: Allowed origin for CORS (default: https://latente.net)
- `MAX_FILE_SIZE`: Maximum file size in bytes (default: 10485760 = 10MB)
- `ALLOWED_EXTENSIONS`: Comma-separated file extensions (default: jpg,jpeg,png,gif,webp,svg)

### Custom Domain (Optional)
```bash
# Set up custom domain
wrangler custom-domains create logo-upload-worker.latente.net

# Or use your own domain
wrangler custom-domains create upload.yourdomain.com
```

## 🧪 Testing

### Test Upload Endpoint
```bash
# Test file upload
curl -X POST https://logo-upload-worker.your-subdomain.workers.dev/upload \
  -F "file=@test-image.png" \
  -F "shortCode=test123" \
  -F "fileExtension=png"
```

### Test Download Endpoint
```bash
# Test file download (use key from upload response)
curl https://logo-upload-worker.your-subdomain.workers.dev/download/logos/test123.png
```

### Test CORS Headers
```bash
# Test CORS preflight
curl -X OPTIONS https://logo-upload-worker.your-subdomain.workers.dev/upload \
  -H "Origin: https://latente.net" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
```

## 📊 Monitoring

### Cloudflare Workers Analytics
1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages
3. Select logo-upload-worker
4. View analytics under Analytics tab

### Key Metrics to Monitor
- Request count and response times
- Error rates (4xx, 5xx responses)
- Geographic distribution
- R2 storage usage

### R2 Storage Monitoring
```bash
# List bucket contents
wrangler r2 object list logos-storage

# Get bucket usage
wrangler r2 bucket info logos-storage
```

## 🔒 Security Considerations

### CORS Configuration
- Origin is restricted to https://latente.net
- Modify `CORS_ORIGIN` environment variable if needed
- Test CORS headers before production deployment

### File Validation
- File extensions are validated against allowed list
- MIME types are checked
- File size limits are enforced
- Consider adding virus scanning for production

### Rate Limiting (Optional)
Add rate limiting in the worker if needed:
```typescript
// Add to worker code
const RATE_LIMIT = new Map<string, { count: number; resetTime: number }>();

// Check rate limit before processing upload
```

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Browser shows CORS error
**Solution**:
- Check CORS_ORIGIN environment variable
- Ensure origin matches exactly (including protocol)
- Verify worker is deployed correctly

#### 2. R2 Bucket Not Found
**Problem**: Worker fails to store files
**Solution**:
- Create R2 bucket: `wrangler r2 bucket create logos-storage`
- Check bucket name matches configuration
- Verify R2 permissions

#### 3. File Upload Fails
**Problem**: Upload returns error
**Solution**:
- Check file size (max 10MB by default)
- Verify file extension is allowed
- Check worker logs in Cloudflare dashboard

#### 4. Large File Timeouts
**Problem**: Large files timeout during upload
**Solution**:
- Increase CPU limit in wrangler.jsonc
- Optimize file compression
- Consider chunked upload for very large files

### Debug Mode
Enable detailed logging by setting environment variable:
```bash
wrangler secret put DEBUG_MODE
# Enter "true" when prompted
```

## 📈 Performance Optimization

### Worker Optimization
- Use edge caching for static responses
- Implement compression for large files
- Consider Durable Objects for complex state management

### R2 Optimization
- Use appropriate storage classes
- Implement lifecycle policies for old files
- Monitor storage usage and costs

## 💰 Cost Estimation

### Cloudflare Workers (Free Tier)
- 100,000 requests/day free
- 10ms CPU time per request free
- Estimated cost for moderate usage: $0-5/month

### R2 Storage (Free Tier)
- 10GB storage free
- 1 million Class A operations free
- Estimated cost for moderate usage: $0-2/month

### Total Estimated Cost
**Free tier usage**: $0/month
**Moderate usage**: $5-7/month
**High usage**: $10-20/month

## 🔄 Updates and Maintenance

### Updating Worker
```bash
# Make changes to code
npm run deploy
```

### Updating Configuration
```bash
# Edit wrangler.jsonc
npm run deploy
```

### Backup R2 Data
```bash
# Sync R2 bucket to local
wrangler r2 object get logos-storage backup/
```

## 📞 Support

### Documentation
- Complete implementation guide: `fileupload.md`
- Worker code documentation: `logo-upload-worker/README.md`
- Architecture overview: `fileupload.md`

### Cloudflare Resources
- [Workers Documentation](https://developers.cloudflare.com/workers/)
- [R2 Storage Documentation](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

### Troubleshooting Help
- Check Cloudflare dashboard logs
- Review worker analytics
- Test with curl commands first
- Enable debug mode for detailed logging

---

## 🎯 Success Criteria

### ✅ Deployment Success
- Worker responds to HTTP requests
- R2 bucket is accessible
- CORS headers are correct
- File upload/download works

### ✅ Integration Success
- URL generator can upload files
- GitHub Actions can download files
- End-to-end flow works without errors
- No base64 conversion occurs

### ✅ Performance Success
- Uploads complete within 5 seconds
- No CORS errors in browser console
- Files are accessible via download URLs
- Cross-device functionality works

Once all these criteria are met, the implementation is complete and ready for production use!