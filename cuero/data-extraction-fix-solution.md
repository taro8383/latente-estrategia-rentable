# Data Extraction Fix Solution

## Problem Analysis

The URL redirection system has a **critical data extraction failure**:

1. **URL Generator** correctly creates URLs with `data` parameter:
   ```javascript
   const longUrl = `${baseUrl}#/invite/${uniqueCode}?data=${encodeURIComponent(encodedData)}`;
   const shortUrl = this.urlShortener.generateShortUrl(longUrl, hoursValid);
   ```

2. **Users access short URL**: `/#/r/jVIbPI`

3. **RedirectHandler should**:
   - Lookup long URL from short code
   - Extract `data` parameter from long URL
   - Store data in localStorage as `incoming_personalization_payload`
   - Redirect to clean invite URL

4. **Current Issue**: Short URL lookup is failing, so data extraction never happens

## Root Cause

The issue is in the **URL mapping storage/retrieval** between the HTML generator and React app:

1. **Generator stores mapping** in localStorage under key `url_mappings`
2. **React app cannot retrieve** the mapping (possibly due to localStorage context)
3. **Data extraction logic** is correct but never executed

## Solution Strategy

### 1. Fix URL Mapping Storage Issue

**File: `src/utils/urlShortener.ts`**

The issue is likely in the `getMappings()` method. The HTML generator and React app might have different localStorage contexts.

**Fix**: Add debugging and ensure consistent localStorage access:

```typescript
static getMappings(): StoredMappings {
    try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        console.log('🔍 URL SHORTENER DEBUG: Raw localStorage data:', stored);
        console.log('🔍 URL SHORTENER DEBUG: Storage key:', this.STORAGE_KEY);
        console.log('🔍 URL SHORTENER DEBUG: localStorage available:', typeof localStorage !== 'undefined');
        
        const parsed = stored ? JSON.parse(stored) : {};
        console.log('🔍 URL SHORTENER DEBUG: Parsed mappings:', parsed);
        return parsed;
    } catch (error) {
        console.error('Failed to parse URL mappings:', error);
        return {};
    }
}
```

### 2. Fix RedirectHandler Data Extraction

**File: `src/components/RedirectHandler.tsx`**

The data extraction logic is correct, but we need to ensure it's actually executed:

```typescript
// Add this after line 118 (before the if (longUrl) check)
console.log('🔍 REDIRECT DEBUG: About to check if longUrl exists:', !!longUrl);
console.log('🔍 REDIRECT DEBUG: longUrl value:', longUrl);
console.log('🔍 REDIRECT DEBUG: longUrl type:', typeof longUrl);

if (!longUrl) {
    console.error('🔍 REDIRECT DEBUG: CRITICAL - No longUrl found for shortCode:', shortCode);
    console.error('🔍 REDIRECT DEBUG: This means data extraction will NOT happen');
    
    // Show all available mappings for debugging
    const allMappings = (URLShortener as any).getMappings();
    console.error('🔍 REDIRECT DEBUG: Available mappings:', allMappings);
    console.error('🔍 REDIRECT DEBUG: Available shortCodes:', Object.keys(allMappings));
}
```

### 3. Add Fallback Data Storage

**File: `src/components/RedirectHandler.tsx`**

If URL mapping fails, we need a fallback to ensure personalization still works:

```typescript
// Add this after the existing data extraction (around line 238)
else {
    console.debug('No query string found in hashPart; checking for direct data access');
    
    // Fallback: Check if data was passed directly in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const directData = urlParams.get('data');
    
    if (directData) {
        console.log('🔍 REDIRECT DEBUG: Found direct data in URL parameters');
        try {
            localStorage.setItem('incoming_personalization_payload', directData);
            const timestamp = String(Date.now());
            localStorage.setItem('incoming_personalization_payload_ts', timestamp);
            console.log('🔍 REDIRECT DEBUG: Stored direct data successfully');
        } catch (err) {
            console.error('🔍 REDIRECT DEBUG: Failed to store direct data:', err);
        }
    }
}
```

### 4. Test URL Mapping Storage

**File: `public/test-url-mapping.html`**

Create a test to verify URL mappings are stored and retrieved correctly:

```html
<!DOCTYPE html>
<html>
<head>
    <title>URL Mapping Test</title>
</head>
<body>
    <h1>URL Mapping Storage Test</h1>
    <button onclick="testStorage()">Test URL Mapping Storage</button>
    <button onclick="testRetrieval()">Test URL Mapping Retrieval</button>
    <button onclick="clearMappings()">Clear All Mappings</button>
    <div id="results"></div>
    
    <script>
        // Copy the URLShortener class from url-generator.html
        class URLShortener {
            static STORAGE_KEY = 'url_mappings';
            static DEFAULT_LENGTH = 6;
            static ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            static generateShortCode(length = this.DEFAULT_LENGTH) {
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += this.ALPHABET.charAt(Math.floor(Math.random() * this.ALPHABET.length));
                }
                return result;
            }

            static getMappings() {
                try {
                    const stored = localStorage.getItem(this.STORAGE_KEY);
                    console.log('Raw localStorage data:', stored);
                    const parsed = stored ? JSON.parse(stored) : {};
                    console.log('Parsed mappings:', parsed);
                    return parsed;
                } catch (error) {
                    console.error('Failed to parse URL mappings:', error);
                    return {};
                }
            }

            static saveMappings(mappings) {
                try {
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mappings));
                    console.log('Saved mappings:', mappings);
                } catch (error) {
                    console.error('Failed to save URL mappings:', error);
                }
            }

            static generateShortUrl(longUrl, expirationHours = 72) {
                let shortCode = this.generateShortCode();
                const mappings = this.getMappings();
                
                do {
                    shortCode = this.generateShortCode();
                } while (mappings[shortCode]);
    
                this.storeMapping(shortCode, longUrl, expirationHours);
    
                const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
                const baseUrl = window.location.origin + (isProduction ? '/' : '/');
                const shortUrl = `${baseUrl}#/r/${shortCode}`;
                
                console.log('Generated short URL:', shortUrl);
                return shortUrl;
            }

            static storeMapping(shortCode, longUrl, expirationHours = 72) {
                const mapping = {
                    shortCode,
                    longUrl,
                    createdAt: Date.now(),
                    expiresAt: Date.now() + (expirationHours * 60 * 60 * 1000)
                };

                const mappings = this.getMappings();
                mappings[shortCode] = mapping;
                this.saveMappings(mappings);
            }

            static getLongUrl(shortCode) {
                const mappings = this.getMappings();
                const mapping = mappings[shortCode];
                console.log('Looking up shortCode:', shortCode, 'found mapping:', mapping);
                return mapping ? mapping.longUrl : null;
            }
        }

        function testStorage() {
            const testLongUrl = 'https://example.com/#/invite/test123?data=eyJ0ZXN0IjoidGVzdCJ9';
            const shortUrl = URLShortener.generateShortUrl(testLongUrl);
            
            document.getElementById('results').innerHTML += `
                <p><strong>Stored:</strong></p>
                <p>Long URL: ${testLongUrl}</p>
                <p>Short URL: ${shortUrl}</p>
                <hr>
            `;
        }

        function testRetrieval() {
            const mappings = URLShortener.getMappings();
            const shortCodes = Object.keys(mappings);
            
            document.getElementById('results').innerHTML += `
                <p><strong>Current Mappings:</strong></p>
                <pre>${JSON.stringify(mappings, null, 2)}</pre>
                <hr>
            `;
            
            shortCodes.forEach(code => {
                const retrieved = URLShortener.getLongUrl(code);
                document.getElementById('results').innerHTML += `
                    <p><strong>Lookup ${code}:</strong> ${retrieved || 'NOT FOUND'}</p>
                `;
            });
        }

        function clearMappings() {
            localStorage.removeItem('url_mappings');
            document.getElementById('results').innerHTML += '<p><strong>Cleared all mappings</strong></p><hr>';
        }
    </script>
</body>
</html>
```

## Implementation Steps

1. **Add debugging to URLShortener.getMappings()** to see what's happening
2. **Add debugging to RedirectHandler** to confirm if longUrl is found
3. **Test URL mapping storage** with the test HTML file
4. **Fix localStorage context issues** if found
5. **Add fallback data storage** for robustness

## Expected Outcome

After implementing these fixes:

1. **URL mappings will be stored correctly** by the generator
2. **RedirectHandler will find the long URL** from the short code
3. **Data extraction will work** and store personalization data
4. **Personalization will work** when users access short URLs
5. **Fallback mechanisms** ensure robustness

The key insight is that the data extraction logic is correct - the issue is in the URL mapping lookup that prevents it from being executed.