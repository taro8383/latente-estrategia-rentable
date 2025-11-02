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
    private static readonly STORAGE_KEY = 'url_mappings';
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
     * Get all stored mappings from localStorage
     */
    private static getMappings(): StoredMappings {
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

    /**
     * Save mappings to localStorage
     */
    private static saveMappings(mappings: StoredMappings): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mappings));
        } catch (error) {
            console.error('Failed to save URL mappings:', error);
            // Handle quota exceeded error
            this.cleanupExpired();
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mappings));
            } catch (retryError) {
                console.error('Failed to save mappings even after cleanup:', retryError);
            }
        }
    }

    /**
     * Clean up expired mappings
     */
    static cleanupExpired(): void {
        const mappings = this.getMappings();
        const now = Date.now();
        let hasChanges = false;

        Object.keys(mappings).forEach(shortCode => {
            if (now > mappings[shortCode].expiresAt) {
                delete mappings[shortCode];
                hasChanges = true;
            }
        });

        if (hasChanges) {
            this.saveMappings(mappings);
        }
    }

    /**
     * Store a mapping between short code and long URL
     */
    static storeMapping(shortCode: string, longUrl: string, expirationHours: number = 72): void {
        const mapping: URLMapping = {
            shortCode,
            longUrl,
            createdAt: Date.now(),
            expiresAt: Date.now() + (expirationHours * 60 * 60 * 1000)
        };

        const mappings = this.getMappings();
        mappings[shortCode] = mapping;
        this.saveMappings(mappings);
    }

    /**
     * Retrieve long URL by short code
     */
    static getLongUrl(shortCode: string): string | null {
        const mappings = this.getMappings();
        const mapping = mappings[shortCode];

        if (!mapping) {
            return null;
        }

        // Check if mapping has expired
        if (Date.now() > mapping.expiresAt) {
            delete mappings[shortCode];
            this.saveMappings(mappings);
            return null;
        }

        return mapping.longUrl;
    }

    /**
     * Generate a short URL for a given long URL
     */
    static generateShortUrl(longUrl: string, expirationHours: number = 72): string {
        // Clean up expired mappings first
        this.cleanupExpired();

        // Generate unique short code
        let shortCode: string;
        const mappings = this.getMappings();
        
        do {
            shortCode = this.generateShortCode();
        } while (mappings[shortCode]); // Ensure uniqueness

        // Store the mapping
        this.storeMapping(shortCode, longUrl, expirationHours);

        // Generate the short URL
        const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        const baseUrl = window.location.origin + (isProduction ? '/' : '/');
        return `${baseUrl}#/r/${shortCode}`;
    }

    /**
     * Get statistics about stored mappings
     */
    static getStats(): { count: number; expiredCount: number; totalSize: number } {
        const mappings = this.getMappings();
        const now = Date.now();
        let expiredCount = 0;
        let totalSize = 0;

        Object.values(mappings).forEach(mapping => {
            if (now > mapping.expiresAt) {
                expiredCount++;
            }
            totalSize += mapping.longUrl.length;
        });

        return {
            count: Object.keys(mappings).length,
            expiredCount,
            totalSize
        };
    }

    /**
     * Remove a specific mapping
     */
    static removeMapping(shortCode: string): boolean {
        const mappings = this.getMappings();
        if (mappings[shortCode]) {
            delete mappings[shortCode];
            this.saveMappings(mappings);
            return true;
        }
        return false;
    }

    /**
     * Clear all mappings
     */
    static clearAll(): void {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear URL mappings:', error);
        }
    }

    /**
     * Initialize cleanup on page load
     */
    static initialize(): void {
        // Clean up expired mappings on initialization
        this.cleanupExpired();
        
        // Set up periodic cleanup every hour
        setInterval(() => {
            this.cleanupExpired();
        }, 60 * 60 * 1000);
    }
}

// Auto-initialize when module is imported
if (typeof window !== 'undefined') {
    URLShortener.initialize();
}