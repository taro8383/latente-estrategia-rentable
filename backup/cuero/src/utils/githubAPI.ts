/**
 * GitHub API Utilities for Auto-Commit URL Mappings
 * Enables cross-computer URL sharing via GitHub Pages
 */

interface GitHubMapping {
    shortCode: string;
    longUrl: string;
    createdAt: number;
    expiresAt: number;
    metadata?: {
        generatorVersion: string;
        variableCount: number;
        complexity: number;
        hasCustomContent: boolean;
    };
}

interface GitHubMappingsFile {
    mappings: { [shortCode: string]: GitHubMapping };
    lastUpdated: number;
    version: string;
    statistics?: {
        totalMappings: number;
        activeMappings: number;
        expiredMappings: number;
    };
}

export class GitHubAPI {
    private static readonly MAPPINGS_FILE = 'public/url-mappings.json';
    private static readonly DEFAULT_BRANCH = 'main';
    private static readonly BASE_URL = 'https://api.github.com';

    // Get GitHub token from environment or localStorage (for development)
    private static getGitHubToken(): string {
        // Check environment variables first (for production)
        if (typeof process !== 'undefined' && process.env?.GITHUB_TOKEN) {
            return process.env.GITHUB_TOKEN;
        }

        // Fallback to localStorage for development (user must set manually)
        try {
            const token = localStorage.getItem('github_token');
            if (token) return token;

            // Prompt user for token if not found
            const userToken = prompt('Enter GitHub Personal Access Token (with repo permissions):');
            if (userToken) {
                localStorage.setItem('github_token', userToken);
                return userToken;
            }
        } catch (error) {
            console.warn('Could not access localStorage for GitHub token:', error);
        }

        throw new Error('GitHub token required. Please set GITHUB_TOKEN environment variable or configure in localStorage.');
    }

    private static getRepoInfo(): { owner: string; repo: string } {
        // Extract repo info from current hostname or environment
        const hostname = window.location.hostname;

        if (hostname.includes('github.io')) {
            // Extract from username.github.io/repo format
            const pathname = window.location.pathname;
            const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
            const username = hostname.replace('.github.io', '');
            const repo = pathSegments.length > 0 ? pathSegments[0] : username;

            return { owner: username, repo };
        }

        // Fallback to environment variables
        if (typeof process !== 'undefined' && process.env?.GITHUB_OWNER && process.env?.GITHUB_REPO) {
            return {
                owner: process.env.GITHUB_OWNER,
                repo: process.env.GITHUB_REPO
            };
        }

        // Default for local development - user should override
        return { owner: 'your-username', repo: 'your-repo' };
    }

    /**
     * Fetch current mappings file from GitHub
     */
    private static async fetchMappingsFile(): Promise<GitHubMappingsFile> {
        const { owner, repo } = this.getRepoInfo();
        const token = this.getGitHubToken();

        const response = await fetch(
            `${this.BASE_URL}/repos/${owner}/${repo}/contents/${this.MAPPINGS_FILE}`,
            {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                // File doesn't exist yet, return default structure
                return {
                    mappings: {},
                    lastUpdated: Date.now(),
                    version: '1.0',
                    statistics: {
                        totalMappings: 0,
                        activeMappings: 0,
                        expiredMappings: 0
                    }
                };
            }
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = atob(data.content);
        return JSON.parse(content);
    }

    /**
     * Commit updated mappings to GitHub
     */
    private static async commitMappingsFile(
        updatedFile: GitHubMappingsFile,
        commitMessage: string
    ): Promise<void> {
        const { owner, repo } = this.getRepoInfo();
        const token = this.getGitHubToken();

        // Get current file info (including SHA for updates)
        let sha: string | undefined;
        try {
            const response = await fetch(
                `${this.BASE_URL}/repos/${owner}/${repo}/contents/${this.MAPPINGS_FILE}`,
                {
                    headers: {
                        'Authorization': `token ${token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                sha = data.sha;
            }
        } catch (error) {
            console.log('File does not exist yet, will create new');
        }

        // Commit the updated file
        const content = btoa(JSON.stringify(updatedFile, null, 2));

        const body: any = {
            message: commitMessage,
            content: content
        };

        if (sha) {
            body.sha = sha;
        }

        const commitResponse = await fetch(
            `${this.BASE_URL}/repos/${owner}/${repo}/contents/${this.MAPPINGS_FILE}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );

        if (!commitResponse.ok) {
            const errorData = await commitResponse.json();
            throw new Error(`Failed to commit mappings: ${errorData.message}`);
        }

        console.log('✅ Successfully committed URL mappings to GitHub');
    }

    /**
     * Store a new URL mapping
     */
    static async storeMapping(mapping: GitHubMapping): Promise<void> {
        try {
            console.log('🔗 Storing URL mapping via GitHub API:', mapping.shortCode);

            // Fetch current mappings
            const currentFile = await this.fetchMappingsFile();

            // Add new mapping
            currentFile.mappings[mapping.shortCode] = mapping;
            currentFile.lastUpdated = Date.now();

            // Update statistics
            if (currentFile.statistics) {
                currentFile.statistics.totalMappings = Object.keys(currentFile.mappings).length;

                // Count active vs expired
                const now = Date.now();
                let activeCount = 0;
                let expiredCount = 0;

                Object.values(currentFile.mappings).forEach(m => {
                    if (now > m.expiresAt) {
                        expiredCount++;
                    } else {
                        activeCount++;
                    }
                });

                currentFile.statistics.activeMappings = activeCount;
                currentFile.statistics.expiredMappings = expiredCount;
            }

            // Commit to GitHub
            await this.commitMappingsFile(
                currentFile,
                `Add URL mapping: ${mapping.shortCode}`
            );

            console.log('✅ URL mapping stored successfully');

        } catch (error) {
            console.error('❌ Failed to store URL mapping:', error);
            throw new Error(`Failed to store URL mapping: ${error.message}`);
        }
    }

    /**
     * Clean up expired mappings
     */
    static async cleanupExpired(): Promise<void> {
        try {
            console.log('🧹 Cleaning up expired URL mappings');

            const currentFile = await this.fetchMappingsFile();
            const now = Date.now();
            let hasChanges = false;

            // Remove expired mappings
            Object.keys(currentFile.mappings).forEach(shortCode => {
                if (now > currentFile.mappings[shortCode].expiresAt) {
                    delete currentFile.mappings[shortCode];
                    hasChanges = true;
                }
            });

            if (hasChanges) {
                currentFile.lastUpdated = Date.now();

                // Update statistics
                if (currentFile.statistics) {
                    currentFile.statistics.totalMappings = Object.keys(currentFile.mappings).length;
                    currentFile.statistics.activeMappings = Object.keys(currentFile.mappings).length;
                    currentFile.statistics.expiredMappings = 0;
                }

                await this.commitMappingsFile(
                    currentFile,
                    'Cleanup expired URL mappings'
                );

                console.log('✅ Cleaned up expired mappings');
            } else {
                console.log('ℹ️ No expired mappings to clean up');
            }

        } catch (error) {
            console.error('❌ Failed to cleanup expired mappings:', error);
        }
    }

    /**
     * Get repository info for debugging
     */
    static getRepoInfoForDebugging(): { owner: string; repo: string; baseUrl: string } {
        const { owner, repo } = this.getRepoInfo();
        return {
            owner,
            repo,
            baseUrl: `${this.BASE_URL}/repos/${owner}/${repo}`
        };
    }

    /**
     * Check if GitHub token is configured
     */
    static isConfigured(): boolean {
        try {
            const token = this.getGitHubToken();
            return !!token;
        } catch (error) {
            return false;
        }
    }
}