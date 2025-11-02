/**
 * URL Shortener Utility
 * Provides two-step URL shortening functionality for personalized landing pages
 */

interface URLMapping {
    shortCode: string;
    longUrl: string;
    createdAt: number;
    expiresAt: number;
}

interface StoredMappings {
    [shortCode: string]: URLMapping;
}

export class URLShortener {
    private static readonly DEFAULT_LENGTH = 6;
    private static readonly ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    /**
     * Generate a random short code
     */
    static generateShortCode(length: number = this.DEFAULT_LENGTH): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += this.ALPHABET.charAt(Math.floor(Math.random() * this.ALPHABET.length));
        }
        return result;
    }

    /**
     * Retrieve long URL by short code from server-side storage
     * This now fetches from GitHub-hosted JSON file only
     */
    static async getLongUrl(shortCode: string): Promise<string | null> {
        try {
            // Try to get mapping from GitHub-hosted JSON file
            let mappingsUrl;
            if (window.location.hostname.includes('github.io')) {
                const pathname = window.location.pathname;
                const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
                const repoName = pathSegments.length > 0 ? pathSegments[0] : '';
                mappingsUrl = `https://${window.location.hostname}/${repoName}/url-mappings.json`;
            } else {
                // Local development or other hosting
                mappingsUrl = `${window.location.origin}/url-mappings.json`;
            }

            const response = await fetch(mappingsUrl);
            if (response.ok) {
                const mappingsData = await response.json();
                if (mappingsData.mappings && mappingsData.mappings[shortCode]) {
                    const mapping = mappingsData.mappings[shortCode];
                    // Check if mapping has expired
                    if (Date.now() <= mapping.expiresAt) {
                        return mapping.longUrl;
                    }
                }
            }
        } catch (error) {
            console.error('Failed to fetch mapping from server:', error);
        }

        return null; // Not found or expired
    }

    /**
     * Generate a short URL for a given long URL
     * NOTE: This method is deprecated for cross-device compatibility
     * Use the URL generator HTML tool which stores data server-side via GitHub Actions
     */
    static generateShortUrl(longUrl: string, expirationHours: number = 72): string {
        // DEPRECATED: This method stores data locally and breaks cross-device functionality
        // Use the URL generator tool instead for server-side storage
        throw new Error('generateShortUrl is deprecated for cross-device compatibility. Use the URL generator HTML tool which stores data server-side via GitHub Actions.');
    }

    /**
     * Get statistics about URL mappings
     */
    static async getStats(): Promise<{ count: number; serverOnly: boolean }> {
        try {
            let mappingsUrl;
            if (window.location.hostname.includes('github.io')) {
                const pathname = window.location.pathname;
                const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
                const repoName = pathSegments.length > 0 ? pathSegments[0] : '';
                mappingsUrl = `https://${window.location.hostname}/${repoName}/url-mappings.json`;
            } else {
                mappingsUrl = `${window.location.origin}/url-mappings.json`;
            }

            const response = await fetch(mappingsUrl);
            if (response.ok) {
                const mappingsData = await response.json();
                const now = Date.now();
                let activeCount = 0;

                if (mappingsData.mappings) {
                    Object.values(mappingsData.mappings).forEach((mapping: any) => {
                        if (now <= mapping.expiresAt) {
                            activeCount++;
                        }
                    });
                }

                return {
                    count: activeCount,
                    serverOnly: true
                };
            }
        } catch (error) {
            console.error('Failed to fetch server stats:', error);
        }

        return { count: 0, serverOnly: true };
    }

    /**
     * Clear all mappings - no-op for server-side storage
     */
    static clearAll(): void {
        // No-op for server-side storage
        console.warn('clearAll is no-op for server-side storage. Use GitHub repository management to clear mappings.');
    }

    /**
     * Initialize - no cleanup needed for server-side storage
     */
    static initialize(): void {
        // No cleanup needed for server-side storage
        console.info('URLShortener initialized in server-side mode for cross-device compatibility.');
    }
}

// Auto-initialize when module is imported
if (typeof window !== 'undefined') {
    URLShortener.initialize();
}