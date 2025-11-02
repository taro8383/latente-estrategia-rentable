# GitHub Actions URL Shortener Setup

## 🚀 Overview
This system uses GitHub Actions to store URL mappings automatically, eliminating CORS issues while maintaining cross-computer functionality.

## 📋 Prerequisites
- GitHub Personal Access Token with `repo` and `workflow` scopes
- Repository with GitHub Pages enabled
- GitHub Actions enabled in repository settings

## 🔑 Step 1: Create GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Configure the token:
   - **Note**: `URL Shortener - Your Project Name`
   - **Expiration**: Choose appropriate period (recommended: 90 days)
   - **Scopes**: ✅ **repo** (Full control) AND ✅ **workflow** (Update GitHub Action workflows)
4. Click **"Generate token"**
5. **IMPORTANT**: Copy the token immediately - you won't see it again!

## ⚙️ Step 2: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click **Settings** → **Actions** → **General**
3. Under **Actions permissions**, select **"Allow all actions and reusable workflows"**
4. Check ✅ **"Allow select actions"** and add GitHub's default actions
5. Click **"Save"**

## 🏗️ Step 3: Verify GitHub Pages Setup

1. Go to **Settings** → **Pages**
2. Source should be **"Deploy from a branch"**
3. Branch: **main** (or your default branch) → **/ (root)**
4. Click **Save**

## 📁 Step 4: Verify Required Files

Your repository should have:
```
your-repo/
├── .github/
│   └── workflows/
│       └── url-shortener.yml    # Auto-created by the system
├── public/
│   ├── url-mappings.json        # Auto-created by GitHub Actions
│   └── url-generator.html       # Your URL generator
├── src/
│   └── components/
│       └── RedirectHandler.tsx  # Updated to read from JSON
```

## 🧪 Step 5: Test the System

1. **Open URL Generator**: Open `url-generator.html` in your browser
2. **Fill Form**: Complete the form with test data
3. **Generate URL**: Click "Generate URL"
4. **Enter Token**: When prompted, paste your GitHub Personal Access Token
5. **GitHub Action Triggered**: System will trigger GitHub Action automatically
6. **Wait for Deployment**: GitHub Actions will run and deploy (1-3 minutes)
7. **Test Short URL**: Open the generated short URL in a different browser

## 🔍 How It Works

1. **URL Generation**: Browser → GitHub Actions API → Trigger workflow
2. **Workflow Execution**: GitHub Action → Updates url-mappings.json
3. **Auto-Deployment**: GitHub Pages → Serves updated mappings
4. **Redirection**: User clicks short URL → Reads mappings.json → Redirects

## 🛠️ GitHub Actions Workflow

The workflow (`url-shortener.yml`) does the following:
1. Receives short code, long URL, expiration, and metadata
2. Updates `public/url-mappings.json` with the new mapping
3. Commits changes to the repository
4. Automatically deploys to GitHub Pages

## 🔧 Configuration

### Browser Configuration (Automatic):
The system will automatically prompt for required information:
- GitHub token (first time only)
- Repository owner and username (if not auto-detected)

### Manual Configuration:
```javascript
// In browser console
localStorage.setItem('github_token', 'YOUR_TOKEN_HERE');
localStorage.setItem('github_owner', 'YOUR_GITHUB_USERNAME');
localStorage.setItem('github_repo', 'YOUR_REPOSITORY_NAME');
```

## 📊 Monitoring

### Check Workflow Status:
1. Go to **Actions** tab in your repository
2. Click on **"URL Shortener"** workflow
3. View recent runs and their status

### Check Mappings File:
Visit: `https://yourusername.github.io/your-repo/url-mappings.json`

### View Commits:
Check recent commits for mapping updates

## 🔒 Security Notes

- **Token Storage**: Token stored in browser localStorage only
- **Workflow Permissions**: Workflow runs with repository permissions
- **Public Data**: URL mappings are stored in public repository
- **Token Scopes**: Only requires `repo` and `workflow` scopes

## 🚨 Important Reminders

- **Token Security**: Never share or commit your token
- **Rate Limits**: GitHub Actions has generous limits for personal use
- **Public Mappings**: URL mappings are visible in your repository
- **Workflow Delays**: GitHub Actions may take 1-2 minutes to complete

## 🔧 Troubleshooting

### Common Issues:

1. **"GitHub Actions API error"**
   - Token missing `workflow` scope
   - Actions not enabled in repository settings

2. **"Failed to fetch mappings"**
   - GitHub Pages still building (wait 2-3 minutes)
   - Workflow failed (check Actions tab)

3. **"Workflow not found"**
   - url-shortener.yml not in .github/workflows/
   - Workflow file has syntax errors

4. **"Mapping not found"**
   - Workflow still running (check Actions tab)
   - Mapping expired
   - Wrong short code

## 📈 Performance & Limits

- **Rate Limits**: 1,000 workflow runs per month (free tier)
- **Storage**: URL mappings stored in repository (counts toward repo size)
- **Latency**: 1-3 minutes for GitHub Action completion
- **Volume**: Perfect for low-to-medium volume (< 100 URLs/day)

## 🔄 Fallback Behavior

If GitHub Actions fails:
1. System automatically falls back to localStorage storage
2. Short URLs work on the same computer/browser
3. Cross-computer functionality temporarily unavailable
4. GitHub Actions can be retried later

## 🚀 Advanced Usage

### Custom Expiration:
```javascript
// Set custom expiration (default: 72 hours)
const result = await urlGenerator.generatePersonalizedUrl(formData, 168); // 1 week
```

### Batch Operations:
The system supports concurrent URL generation for batch operations.

### Analytics:
Workflow logs provide basic analytics for URL generation tracking.