# Logo Upload System Architecture

## Problem Statement
- URLs with embedded base64 logo data exceed GitHub Actions input size limits (~64KB)
- localStorage is device-specific and unreliable for cross-device sharing
- Need to store logos as files and reference them in URLs

## Solution Architecture

### 1. URL Generation Flow
```
User uploads logo → URL generator creates logoId → Sends logoBase64 + logoExtension to GitHub Actions
```

### 2. GitHub Actions Flow
```
Receive logoBase64 + logoExtension → Upload to repository as /assets/logos/{shortCode}.{ext} → Store file path in metadata
```

### 3. Redirect Flow
```
Short URL clicked → Get metadata from API → Recreate URL with logo file path → Personalization works
```

## Technical Implementation

### URL Generator (url-generator.html)
- Generate logoId: `logo_${timestamp}_${random}`
- Get file extension from base64 data
- Upload logo file directly to GitHub repository via Contents API: `uploadLogoToGitHub(owner, repo, token, logoId, ext, base64Data)`
- NO localStorage usage
- NO sending large base64 to GitHub Actions (avoids size limits)

### GitHub Actions Workflow (url-shortener.yml)
- Inputs: `shortCode`, `longUrl`, `expirationHours`, `metadata`
- Steps:
  1. Process metadata (logo already uploaded by URL generator)
  2. Store metadata with logo file path reference
  3. Build and deploy

### Data Flow
- **Before**: URL contains embedded base64 (50KB+) → Size limit error
- **After**: URL contains metadata reference → Logo uploaded as file → Normal size

### Cross-Device Compatibility
- Metadata stored in GitHub API → Available to all devices
- Logo files stored in repository → Accessible via URLs
- No localStorage dependency

## Key Principles
1. NO localStorage usage
2. GitHub Actions handles file uploads
3. Metadata provides cross-device access
4. File references in URLs instead of embedded data
5. All personalization fields preserved