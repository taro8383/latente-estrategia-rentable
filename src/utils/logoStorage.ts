/**
 * Logo Storage Utility
 * Manages company logos in localStorage with expiration and cleanup.
 * Avoid persisting blob: object URLs across sessions; provide fast base64 render and async object-url upgrade.
 */

interface LogoData {
  data: string;
  timestamp: number;
  expiresAt: number;
  // objectUrl removed from persistent storage; only stored in-memory cache
}

interface StoredLogos {
  [id: string]: LogoData;
}

export class LogoStorage {
  private static readonly STORAGE_KEY = 'personalized_logos';
  private static readonly DEFAULT_EXPIRY_HOURS = 72;
  private static readonly objectUrlCache = new Map<string, string>();

  /**
   * Store a logo with automatic expiration
   */
  static storeLogo(id: string, base64Data: string, hoursValid: number = this.DEFAULT_EXPIRY_HOURS): void {
    try {
      const logos = this.getLogos();
      logos[id] = {
        data: base64Data,
        timestamp: Date.now(),
        expiresAt: Date.now() + hoursValid * 60 * 60 * 1000
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logos));
    } catch (error) {
      console.warn('Failed to store logo:', error);
      this.cleanupExpired();
      try {
        const logos = this.getLogos();
        logos[id] = {
          data: base64Data,
          timestamp: Date.now(),
          expiresAt: Date.now() + hoursValid * 60 * 60 * 1000
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logos));
      } catch (retryError) {
        console.error('Failed to store logo even after cleanup:', retryError);
      }
    }
  }

  /**
   * Retrieve a logo by ID.
   * Returns a string that can be used as image src immediately (base64 or blob).
   * If only base64 is available, it returns base64 synchronously and starts an async conversion
   * that will populate the in-memory objectUrl cache and dispatch a window event when ready.
   */
  static getLogo(id: string): string | null {
    try {
      if (this.objectUrlCache.has(id)) {
        const cached = this.objectUrlCache.get(id)!;
        console.debug('[LogoStorage] objectUrlCache hit for', id);
        return cached;
      }

      const logos = this.getLogos();
      const logo = logos[id];
      if (!logo) {
        console.debug('[LogoStorage] no logo found for', id);
        return null;
      }

      if (Date.now() > logo.expiresAt) {
        console.debug('[LogoStorage] logo expired for', id);
        delete logos[id];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logos));
        return null;
      }

      // Immediately return base64 to avoid blocking initial render.
      // Then schedule conversion to object URL asynchronously.
      const immediate = logo.data;
      console.debug('[LogoStorage] returning immediate base64 for', id, 'scheduling async object-url conversion');

      // If async conversion already in progress (objectUrlCache miss but conversion scheduled), we still return base64.
      setTimeout(() => {
        try {
          // If cached now, skip
          if (this.objectUrlCache.has(id)) {
            return;
          }

          const start = performance.now();
          const objectUrl = this.base64ToObjectUrl(logo.data);
          const elapsed = Math.round(performance.now() - start);

          if (objectUrl) {
            this.objectUrlCache.set(id, objectUrl);
            console.debug('[LogoStorage] async conversion done for', id, 'elapsed_ms=', elapsed);
            // Do NOT persist blob: URLs to localStorage. They are invalid across sessions.
            // Notify listeners that object URL is ready
            try {
              window.dispatchEvent(new CustomEvent('logoObjectUrlReady', { detail: { id, objectUrl } }));
            } catch (e) {
              console.debug('[LogoStorage] failed to dispatch logoObjectUrlReady event', e);
            }
          } else {
            console.warn('[LogoStorage] async conversion returned null for', id);
          }
        } catch (error) {
          console.error('[LogoStorage] async conversion error for', id, error);
        }
      }, 0);

      return immediate;
    } catch (error) {
      console.error('Failed to retrieve logo:', error);
      return null;
    }
  }

  /**
   * Convert base64 string to object URL (synchronous).
   */
  private static base64ToObjectUrl(base64Data: string): string | null {
    try {
      const mimeMatch = base64Data.match(/^data:(.+?);base64,(.+)$/);
      if (!mimeMatch) return null;
      const mimeType = mimeMatch[1];
      const base64Content = mimeMatch[2];

      // Decode base64 to binary
      const binaryString = atob(base64Content);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mimeType });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error converting base64 to object URL:', error);
      return null;
    }
  }

  /**
   * Revoke an object URL to free memory
   */
  static revokeLogo(id: string): void {
    const objectUrl = this.objectUrlCache.get(id);
    if (objectUrl) {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch (e) {
        console.debug('[LogoStorage] revokeObjectURL failed', e);
      }
      this.objectUrlCache.delete(id);
    }
  }

  /**
   * Get all stored logos
   */
  static getLogos(): StoredLogos {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to parse stored logos:', error);
      return {};
    }
  }

  /**
   * Clear object URL cache
   */
  static clearObjectUrlCache(): void {
    this.objectUrlCache.forEach((url, id) => {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
        console.debug('[LogoStorage] revoke failed during clear', e);
      }
    });
    this.objectUrlCache.clear();
  }

  /**
   * Remove expired logos from storage
   */
  static cleanupExpired(): void {
    try {
      const logos = this.getLogos();
      const now = Date.now();
      let hasChanges = false;
      Object.keys(logos).forEach(id => {
        if (now > logos[id].expiresAt) {
          delete logos[id];
          hasChanges = true;
        }
      });
      if (hasChanges) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logos));
      }
    } catch (error) {
      console.error('Failed to cleanup expired logos:', error);
    }
  }

  static removeLogo(id: string): void {
    try {
      const logos = this.getLogos();
      delete logos[id];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logos));
    } catch (error) {
      console.error('Failed to remove logo:', error);
    }
  }

  static clearAll(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear logos:', error);
    }
  }

  static getStorageInfo(): { count: number; totalSize: number; expiredCount: number } {
    try {
      const logos = this.getLogos();
      const now = Date.now();
      let totalSize = 0;
      let expiredCount = 0;
      Object.values(logos).forEach(logo => {
        totalSize += logo.data.length;
        if (now > logo.expiresAt) expiredCount++;
      });
      return { count: Object.keys(logos).length, totalSize, expiredCount };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { count: 0, totalSize: 0, expiredCount: 0 };
    }
  }

  static generateLogoId(): string {
    return `logo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  static initialize(): void {
    this.cleanupExpired();
    setInterval(() => {
      this.cleanupExpired();
    }, 60 * 60 * 1000);
  }
}

if (typeof window !== 'undefined') {
  LogoStorage.initialize();
  (window as any).LogoStorage = LogoStorage;
}