# GitHub Pages Deployment Guide

This project is configured to deploy to GitHub Pages using the `gh-pages` package.

## Prerequisites

1. Make sure your project is pushed to the GitHub repository: `https://github.com/taro8383/latente-estrategia-rentable/`
2. Install dependencies: `npm install`

## Deployment Steps

### First Time Setup

1. Install the gh-pages package (already added to devDependencies):
   ```bash
   npm install
   ```

2. Deploy your site:
   ```bash
   npm run deploy
   ```

### Troubleshooting

If you encounter issues with the deployment:

1. **Make sure gh-pages is installed**:
   ```bash
   npm install gh-pages --save-dev
   ```

2. **Check if you have git remote configured**:
   ```bash
   git remote -v
   ```
   If no remote is configured, add it:
   ```bash
   git remote add origin https://github.com/taro8383/latente-estrategia-rentable.git
   ```

3. **Ensure you're on the main branch and it's up to date**:
   ```bash
   git checkout main
   git pull origin main
   ```

4. **Try manual deployment** (if npm script doesn't work):
   ```bash
   npm run build
   npx gh-pages -d dist --force
   ```

### Current Status

Your gh-pages branch already exists, which is normal. The `--add` flag in deploy script ensures that new deployments will update the existing branch rather than trying to create a new one.

If you see error "fatal: a branch named 'gh-pages' already exists", this is actually expected behavior and indicates the branch was successfully created during a previous deployment attempt.

### Subsequent Deployments

Simply run the deploy command:
```bash
npm run deploy
```

This will:
1. Build your project for production
2. Create a `gh-pages` branch
3. Push the built files from the `dist` folder to the `gh-pages` branch

## GitHub Pages Configuration

After your first deployment:

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Build and deployment", select "Deploy from a branch"
4. Choose the `gh-pages` branch as the source
5. Your site will be available at: `https://taro8383.github.io/latente-estrategia-rentable/`

### Important Note About Jekyll

GitHub Pages by default tries to process sites using Jekyll (a Ruby static site generator). Since this is a React/Vite application, we've included a `.nojekyll` file in the public folder to prevent this processing. This file tells GitHub Pages to serve the files as-is without any Jekyll processing.

If you still encounter Jekyll-related errors:
1. Ensure the `.nojekyll` file is present in your built files
2. Make sure GitHub Pages is configured to use the `gh-pages` branch (not the main branch)
3. The `.nojekyll` file should be at the root of your gh-pages branch after deployment

## Configuration Details

### Vite Configuration

The `vite.config.ts` is configured with:
- Base path: `/latente-estrategia-rentable/` for production builds
- Base path: `/` for development builds

This ensures all assets and routes work correctly when deployed to GitHub Pages.

### Package Scripts

- `predeploy`: Runs `npm run build` to create the production build
- `deploy`: Force pushes to remote gh-pages branch and creates a fresh one with new files
- `deploy:init`: Creates empty gh-pages branch on remote, then deploys to it
- `deploy:safe`: Removes all files from gh-pages branch before deploying new ones

## Troubleshooting

### 404 Errors on Refresh

If you encounter 404 errors when refreshing pages, ensure:
1. The base path in `vite.config.ts` matches your repository name
2. GitHub Pages is configured to use the `gh-pages` branch

### Build Issues

If the build fails:
1. Check for any build errors with `npm run build`
2. Ensure all dependencies are installed with `npm install`
3. Verify your React Router configuration works with the base path

### Deployment Fails

If deployment fails:
1. Ensure you have push access to the repository
2. Check your Git configuration: `git remote -v`
3. Make sure your main branch is up to date: `git push origin main`

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure the custom domain in GitHub Pages settings
3. Update the base path in `vite.config.ts` if needed

## Local Development

For local development, continue using:
```bash
npm run dev
```

This will run the development server with the correct configuration for local testing.