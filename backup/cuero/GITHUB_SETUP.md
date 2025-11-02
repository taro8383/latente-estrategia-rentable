# GitHub API Setup for URL Shortener

## 🚀 Overview
This system uses GitHub API to auto-commit URL mappings to your repository, enabling cross-computer URL sharing without external services.

## 📋 Prerequisites
- GitHub Personal Access Token
- Repository with GitHub Pages enabled
- Admin access to the repository

## 🔑 Step 1: Create GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Configure the token:
   - **Note**: `URL Shortener - Your Project Name`
   - **Expiration**: Choose appropriate period (recommended: 90 days)
   - **Scopes**: ✅ **repo** (Full control of private repositories)
4. Click **"Generate token"**
5. **IMPORTANT**: Copy the token immediately - you won't see it again!

## ⚙️ Step 2: Configure Token

### Option A: Browser Configuration (Easiest)
The system will automatically prompt for the token when you first generate a URL.

1. Open `url-generator.html` in your browser
2. Fill out the form and click "Generate URL"
3. When prompted, paste your GitHub token
4. The token will be saved in browser localStorage

### Option B: Manual Configuration
Set the token in browser console:
```javascript
localStorage.setItem('github_token', 'YOUR_TOKEN_HERE');
localStorage.setItem('github_owner', 'YOUR_GITHUB_USERNAME');
localStorage.setItem('github_repo', 'YOUR_REPOSITORY_NAME');
```

## 🏗️ Step 3: Repository Setup

### Ensure GitHub Pages is Enabled:
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** (or your default branch) → **/ (root)**
5. Click **Save**

### Verify Required Files:
Your repository should have:
```
your-repo/
├── public/
│   ├── url-mappings.json    # Auto-created by the system
│   └── url-generator.html   # Your URL generator
├── src/
│   └── components/
│       └── RedirectHandler.tsx  # Updated to read from JSON
```

## 🧪 Step 4: Test the System

1. Open `url-generator.html` in your browser
2. Fill out the form with test data
3. Click "Generate URL"
4. System will:
   - Prompt for GitHub token (first time only)
   - Generate short URL
   - Auto-commit mapping to your repository
   - GitHub Pages will rebuild automatically (1-2 minutes)

5. Test the short URL:
   - Wait 2-3 minutes for GitHub Pages to rebuild
   - Open the short URL in a **different browser** or **incognito window**
   - Should redirect to your personalized landing page

## 🔍 Debugging

### Check Token Configuration:
```javascript
// In browser console
console.log('Token:', localStorage.getItem('github_token'));
console.log('Owner:', localStorage.getItem('github_owner'));
console.log('Repo:', localStorage.getItem('github_repo'));
```

### Check Mappings File:
Visit: `https://yourusername.github.io/your-repo/url-mappings.json`

### Common Issues:

1. **"GitHub token required" error**
   - Token not set or expired
   - Token doesn't have 'repo' scope

2. **"Failed to fetch mappings" error**
   - GitHub Pages hasn't rebuilt yet (wait 2-3 minutes)
   - URL mappings file not committed

3. **"Mapping expired" error**
   - URL has expired (default 72 hours)
   - Clock sync issues

## 📊 How It Works

1. **URL Generation**: Browser → GitHub API → Commit mappings.json
2. **GitHub Pages**: Auto-rebuild → Serve updated mappings.json
3. **Redirection**: User clicks short URL → Fetch mappings.json → Redirect

## 🔒 Security Notes

- **Token Storage**: Token is stored in browser localStorage only
- **Repository Access**: Token needs 'repo' scope for commits
- **Public Data**: URL mappings are stored in public repository
- **Token Sharing**: Never share your token or commit it to repository

## 🚨 Important Reminders

- Tokens expire and need renewal
- GitHub API has rate limits (5,000 requests/hour for authenticated requests)
- URL mappings are public in your repository
- Consider using a separate repository for production use

## 📈 Volume Considerations

- ✅ **Low Volume** (< 100 URLs/day): Perfect for this system
- ⚠️ **Medium Volume** (100-1000 URLs/day): Monitor rate limits
- ❌ **High Volume** (> 1000 URLs/day): Consider dedicated backend

## 🛠️ Maintenance

- **Cleanup**: Expired URLs are automatically removed when new ones are created
- **Monitoring**: Check repository commits for URL generation activity
- **Backup**: Repository serves as automatic backup of all mappings