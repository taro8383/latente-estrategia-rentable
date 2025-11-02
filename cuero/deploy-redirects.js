#!/usr/bin/env node

/**
 * GitHub Pages Redirect File Deployment Script
 *
 * This script deploys generated redirect HTML files to GitHub Pages.
 * It reads the redirect files from the local public directory and uploads them to the GitHub Pages site.
 *
 * Usage:
 * 1. Generate URLs using the URL generator
 * 2. Run: node deploy-redirects.js
 * 3. The script will upload all *.html files in the public directory to GitHub Pages
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
    // GitHub repository details
    owner: 'your-github-username', // Replace with your GitHub username
    repo: 'latente-estrategia-rentable', // Replace with your repository name
    branch: 'gh-pages', // Branch for GitHub Pages

    // Local paths
    publicDir: path.join(__dirname, 'public'),
    redirectsDir: path.join(__dirname, 'public'),

    // GitHub token (set as environment variable)
    token: process.env.GITHUB_TOKEN
};

class GitHubPagesDeployer {
    constructor(config) {
        this.config = config;
        this.apiBase = 'https://api.github.com';
    }

    /**
     * Main deployment function
     */
    async deploy() {
        console.log('🚀 Starting GitHub Pages redirect deployment...');

        try {
            // Check if GitHub token is available
            if (!this.config.token) {
                throw new Error('GITHUB_TOKEN environment variable is required');
            }

            // Find all redirect HTML files
            const redirectFiles = this.findRedirectFiles();
            console.log(`📁 Found ${redirectFiles.length} redirect files to deploy`);

            if (redirectFiles.length === 0) {
                console.log('⚠️ No redirect files found. Generate some URLs first.');
                return;
            }

            // Deploy each file
            for (const filePath of redirectFiles) {
                await this.deployFile(filePath);
            }

            console.log('✅ Deployment completed successfully!');
            console.log('🔗 Redirect URLs are now live on GitHub Pages');

        } catch (error) {
            console.error('❌ Deployment failed:', error.message);
            process.exit(1);
        }
    }

    /**
     * Find all redirect HTML files in the public directory
     */
    findRedirectFiles() {
        const files = fs.readdirSync(this.config.redirectsDir);
        return files
            .filter(file => file.endsWith('.html') && file !== 'index.html' && file !== '404.html')
            .map(file => path.join(this.config.redirectsDir, file));
    }

    /**
     * Deploy a single file to GitHub Pages
     */
    async deployFile(filePath) {
        const fileName = path.basename(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        console.log(`📤 Deploying ${fileName}...`);

        // Get current file from GitHub (if exists)
        let sha = null;
        try {
            const currentFile = await this.getFile(fileName);
            sha = currentFile.sha;
        } catch (error) {
            // File doesn't exist, that's fine
        }

        // Upload/update file
        await this.updateFile(fileName, fileContent, sha);

        console.log(`✅ ${fileName} deployed successfully`);
    }

    /**
     * Get file information from GitHub
     */
    async getFile(fileName) {
        const url = `${this.apiBase}/repos/${this.config.owner}/${this.config.repo}/contents/${fileName}?ref=${this.config.branch}`;

        return new Promise((resolve, reject) => {
            const options = {
                headers: {
                    'Authorization': `token ${this.config.token}`,
                    'User-Agent': 'GitHub-Pages-Deployer',
                    'Accept': 'application/vnd.github.v3+json'
                }
            };

            https.get(url, options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(JSON.parse(data));
                    } else if (res.statusCode === 404) {
                        reject(new Error('File not found'));
                    } else {
                        reject(new Error(`GitHub API error: ${res.statusCode}`));
                    }
                });
            }).on('error', reject);
        });
    }

    /**
     * Update/create file on GitHub
     */
    async updateFile(fileName, content, sha = null) {
        const url = `${this.apiBase}/repos/${this.config.owner}/${this.config.repo}/contents/${fileName}`;

        const data = {
            message: `Deploy redirect file: ${fileName}`,
            content: Buffer.from(content).toString('base64'),
            branch: this.config.branch
        };

        if (sha) {
            data.sha = sha;
        }

        return new Promise((resolve, reject) => {
            const options = {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.config.token}`,
                    'User-Agent': 'GitHub-Pages-Deployer',
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                }
            };

            const req = https.request(url, options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        resolve(JSON.parse(responseData));
                    } else {
                        reject(new Error(`GitHub API error: ${res.statusCode} - ${responseData}`));
                    }
                });
            });

            req.on('error', reject);
            req.write(JSON.stringify(data));
            req.end();
        });
    }

    /**
     * Alternative deployment using Git commands
     */
    deployWithGit() {
        console.log('🔄 Deploying using Git commands...');

        try {
            // Check if gh-pages branch exists
            const branches = execSync('git branch -a', { encoding: 'utf8' });
            const hasGhPages = branches.includes('gh-pages') || branches.includes('origin/gh-pages');

            if (!hasGhPages) {
                console.log('📝 Creating gh-pages branch...');
                execSync('git checkout --orphan gh-pages');
                execSync('git rm -rf .');
                execSync('git commit --allow-empty -m "Initial gh-pages commit"');
                execSync('git checkout main'); // or master
            }

            // Switch to gh-pages branch
            execSync('git checkout gh-pages');

            // Copy redirect files
            const redirectFiles = this.findRedirectFiles();
            for (const filePath of redirectFiles) {
                const fileName = path.basename(filePath);
                const destPath = path.join('.', fileName);
                fs.copyFileSync(filePath, destPath);
                console.log(`📋 Copied ${fileName}`);
            }

            // Commit and push
            execSync('git add .');
            execSync('git commit -m "Deploy redirect files"');
            execSync('git push origin gh-pages');

            // Switch back
            execSync('git checkout main'); // or master

            console.log('✅ Git deployment completed!');

        } catch (error) {
            console.error('❌ Git deployment failed:', error.message);
            throw error;
        }
    }
}

// CLI interface
function main() {
    const args = process.argv.slice(2);
    const useGit = args.includes('--git');

    const deployer = new GitHubPagesDeployer(CONFIG);

    if (useGit) {
        deployer.deployWithGit();
    } else {
        deployer.deploy();
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = GitHubPagesDeployer;