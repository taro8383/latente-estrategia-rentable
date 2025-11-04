# Logo Upload System Architecture v2.0

## Problem Statement
- URLs with embedded logo data exceed GitHub Actions input size limits (~65KB)
- localStorage is device-specific and unreliable for cross-device sharing
- Need to store logos as files and reference them in URLs
- Base64 processing causes performance issues, DOMExceptions, and file size limitations
- GitHub Actions workflow inputs cannot handle binary files or large data

## Solution Architecture

### 1. URL Generation Flow (Two-Stage Artifact Approach)
```
User uploads logo → URL generator uploads logo as GitHub release asset → Gets artifact download URL → Triggers workflow with artifact URL
```

### 2. GitHub Actions Flow
```
Receive logoArtifactUrl + logoExtension → Download logo file from artifact URL → Save as /assets/logos/{shortCode}.{ext} → Store metadata with file reference
```

### 3. Redirect & Personalization Flow
```
Short URL clicked → Get metadata from API → PersonalizationProvider constructs logo file URL → Logo loads from /assets/logos/{shortCode}.{ext}
```

## Technical Implementation

### URL Generator (url-generator.html)
- **Two-stage upload process** using GitHub REST API
- **Stage 1**: Create draft release and upload logo file as release asset via FormData
- **Stage 2**: Trigger workflow with `logoArtifactUrl` (download URL from release asset)
- Generate logoId for backward compatibility: `logo_${timestamp}_${random}`
- Extract file extension from file object
- **NO base64 conversion anywhere in the process** ✅
- **NO localStorage usage** ✅
- **NO sending large data to workflow inputs** (uses artifact URLs instead)

**Key Implementation Details:**
```javascript
// Upload logo as GitHub release asset
const formData = new FormData();
formData.append('file', logoFile);
const response = await fetch(`https://uploads.github.com/repos/${owner}/${repo}/releases/${releaseId}/assets`, {
  method: 'POST',
  headers: {
    'Authorization': `token ${githubToken}`,
    'Content-Type': 'application/octet-stream',
  },
  body: logoFile  // Direct binary upload, NO base64
});

// Get download URL and trigger workflow
const logoArtifactUrl = uploadResponse.browser_download_url;
// Workflow receives: logoArtifactUrl + logoExtension + metadata
```

### GitHub Actions Workflow (url-shortener.yml)
- **Inputs**: `shortCode`, `longUrl`, `expirationHours`, `logoArtifactUrl`, `logoExtension`, `metadata`
- **Steps**:
  1. Create logo directory structure (`public/assets/logos`)
  2. **Download logo file from artifact URL** using `curl -L`
  3. Save logo file as `public/assets/logos/{shortCode}.{logoExtension}`
  4. Store metadata with `logoFileExtension` for PersonalizationProvider
  5. Build and deploy React application

**Key Implementation Details:**
```bash
# Download logo from artifact URL (no base64 processing)
LOGO_ARTIFACT_URL="${{ github.event.inputs.logoArtifactUrl }}"
LOGO_EXTENSION="${{ github.event.inputs.logoExtension }}"
SHORT_CODE="${{ github.event.inputs.shortCode }}"
LOGO_FILE_PATH="public/assets/logos/${SHORT_CODE}.${LOGO_EXTENSION}"

curl -L -o "$LOGO_FILE_PATH" "$LOGO_ARTIFACT_URL"
```

### PersonalizationProvider.tsx
- **Logo loading logic updated for file-based architecture**
- Check metadata for `logoFileExtension` first
- Construct logo file URL: `/assets/logos/{shortCode}.{ext}`
- Fallback to LogoStorage for backward compatibility
- Cross-device compatible through metadata references

**Key Implementation Details:**
```typescript
// New file-based logo loading
const logoFileExtension = (parsedData as any).logoFileExtension;
const shortCodeMatch = currentUrl.match(/\/r\/([a-zA-Z0-9]+)/);

if (shortCodeMatch && logoFileExtension) {
    const shortCode = shortCodeMatch[1];
    logoUrl = `/assets/logos/${shortCode}.${logoFileExtension}`;
    setData(prev => ({ ...prev, companyLogo: logoUrl }));
}
```

## Data Flow Comparison

### Before (Base64 Approach - PROBLEMATIC):
```
User uploads logo → Convert to base64 → Embed in workflow input → Size limit error (65KB max)
```

### After (Artifact Approach - SOLVED):
```
User uploads logo → Upload as release asset (2GB limit) → Get download URL → Download in workflow → Store as file
```

## Capacity & Performance Improvements

| Aspect | Before | After |
|--------|--------|-------|
| **File Size Limit** | 65KB (workflow input) | 2GB (GitHub release asset) |
| **Processing** | Base64 encoding/decoding | Direct binary file transfer |
| **Memory Usage** | High (base64 bloat) | Low (direct file operations) |
| **Cross-Device** | localStorage dependent | Metadata-based (reliable) |
| **Error Rate** | High (size limits, encoding) | Low (robust file transfer) |

## Cross-Device Compatibility
- ✅ **Metadata stored in GitHub API** → Available to all devices
- ✅ **Logo files stored in repository** → Accessible via static URLs
- ✅ **No localStorage dependency** → Works across devices/browsers
- ✅ **File references in metadata** → `logoFileExtension` enables URL construction

## Key Principles (Updated)
1. ✅ **NO localStorage usage** - Uses metadata instead
2. ✅ **NO base64 conversion for logos at any stage** - Direct binary transfer
3. ✅ **Two-stage artifact approach** - Upload as release asset, then download
4. ✅ **GitHub Release Assets API** - Handles large files up to 2GB
5. ✅ **Metadata provides cross-device access** - Contains `logoFileExtension`
6. ✅ **File references in URLs** - `/assets/logos/{shortCode}.{ext}` pattern
7. ✅ **All personalization fields preserved** - No data loss
8. ✅ **Shell script safety** - Uses `printf` and `toJSON()` for JSON handling
9. ✅ **Error handling and validation** - Robust file download and verification

## Security & Reliability Features
- **GitHub token authentication** for release asset uploads
- **CORS-safe** file downloads via GitHub's CDN
- **File existence verification** in workflow before proceeding
- **Graceful fallbacks** for missing logo data
- **Error logging and debugging** throughout the process

## Files Modified
- `public/tools/url-generator.html` - Two-stage artifact upload implementation
- `.github/workflows/url-shortener.yml` - Artifact download and file storage
- `src/context/PersonalizationProvider.tsx` - File-based logo loading logic

This architecture successfully resolves all size limitations and base64 issues while maintaining cross-device compatibility and system reliability.