# Logo Upload System Architecture

## Problem Statement
- URLs with embedded logo data exceed GitHub Actions input size limits (~64KB)
- localStorage is device-specific and unreliable for cross-device sharing
- Need to store logos as files and reference them in URLs
- Base64 processing causes performance issues and DOMExceptions

## Solution Architecture

### 1. URL Generation Flow
```
User uploads logo → URL generator creates logoId → Sends logoFile + logoExtension to GitHub Actions
```

### 2. GitHub Actions Flow
```
Receive logoFile + logoExtension → Upload to repository as /assets/logos/{shortCode}.{ext} → Store file path in metadata
```

### 3. Redirect Flow
```
Short URL clicked → Get metadata from API → Recreate URL with logo file path → Personalization works
```

## Technical Implementation

### URL Generator (url-generator.html)
- Generate logoId: `logo_${timestamp}_${random}`
- Get file extension from file object
- Send logo file directly to GitHub Actions workflow
- NO base64 conversion anywhere in the process
- NO localStorage usage
- NO sending large data to URLs (avoids size limits)

### GitHub Actions Workflow (url-shortener.yml)
- Inputs: `shortCode`, `longUrl`, `expirationHours`, `logoFile`, `logoExtension`, `metadata`
- Steps:
  1. Process logo file from workflow input
  2. Upload logo file to repository as /assets/logos/{shortCode}.{ext}
  3. Store metadata with logo file path reference
  4. Build and deploy

### Data Flow
- **Before**: URL contains embedded data (50KB+) → Size limit error
- **After**: URL contains metadata reference → Logo uploaded as file → Normal size
- **NO base64 processing at any stage**

### Cross-Device Compatibility
- Metadata stored in GitHub API → Available to all devices
- Logo files stored in repository → Accessible via URLs
- No localStorage dependency

## Key Principles
1. NO localStorage usage
2. NO base64 conversion for logos at any stage
3. GitHub Actions handles file uploads
4. Metadata provides cross-device access
5. File references in URLs instead of embedded data
6. All personalization fields preserved
7. Direct file upload without encoding