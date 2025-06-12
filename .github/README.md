# CI/CD Configuration for Consolidated Repository

This directory contains GitHub Actions workflows for the consolidated Working Panda repository.

## 🚀 Workflow Overview

### `consolidated-deploy.yml`

A comprehensive CI/CD pipeline that handles building, testing, and deploying all three projects in the consolidated repository:

- **server-panda** (Express.js backend)
- **a-working-panda** (React frontend)
- **landing-panda** (Astro landing site)

## 📋 Workflow Jobs

### 1. `test-and-build`
**Purpose**: Builds and tests all projects, creates deployment artifacts

**Steps**:
- Installs dependencies for all three projects
- Runs linting (with error tolerance)
- Builds all projects
- Uploads build artifacts for deployment jobs

**Triggers**: All pushes and pull requests to `main`

### 2. `deploy-server`
**Purpose**: Deploys the Express.js server to Fly.io

**Steps**:
- Builds the React UI for server integration
- Deploys to Fly.io using existing configuration
- Uses cache-busting with commit SHA

**Triggers**: Only on pushes to `main` (production deployments)

### 3. `deploy-react-app`
**Purpose**: Deploys the React application to static hosting

**Current Status**: Placeholder - requires hosting provider configuration

**Triggers**: Only on pushes to `main` (production deployments)

### 4. `deploy-landing-site`
**Purpose**: Deploys the Astro landing site to static hosting

**Current Status**: Placeholder - requires hosting provider configuration

**Triggers**: Only on pushes to `main` (production deployments)

### 5. `notify-completion`
**Purpose**: Provides deployment status summary

**Triggers**: After all deployment jobs complete (success or failure)

## 🔧 Required Secrets

Add these secrets to your GitHub repository settings:

### Fly.io Deployment
- `FLY_API_TOKEN`: Your Fly.io API token for server deployment

### React App Deployment (when configured)
- `NETLIFY_AUTH_TOKEN`: Netlify authentication token (if using Netlify)
- `NETLIFY_SITE_ID`: Netlify site ID for React app
- Or equivalent secrets for your chosen hosting provider

### Landing Site Deployment (when configured)
- `NETLIFY_LANDING_SITE_ID`: Netlify site ID for landing site (if using Netlify)
- Or equivalent secrets for your chosen hosting provider

## 🏗️ Configuration Steps

### 1. Server Deployment (Already Configured)
The server deployment is ready to use with Fly.io. Ensure you have:
- `FLY_API_TOKEN` secret configured
- `fly.toml` file in the `server-panda/` directory
- Fly.io app created and configured

### 2. React App Deployment (Requires Setup)
Choose a hosting provider and update the `deploy-react-app` job:

#### For Netlify:
```yaml
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v2.1
  with:
    publish-dir: './a-working-panda/dist'
    production-branch: main
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

#### For Vercel:
```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
    working-directory: ./a-working-panda
```

### 3. Landing Site Deployment (Requires Setup)
Similar configuration needed for the Astro landing site deployment.

## 🔄 Migration from Separate Repositories

### Changes from Original CI/CD
The original `server-panda/.github/workflows/fly-deploy.yml` has been replaced with this consolidated approach that:

1. **Eliminates cross-repository dependencies**: No longer needs to checkout separate repositories
2. **Simplifies secret management**: All secrets in one place
3. **Provides unified build process**: All projects built in single workflow
4. **Enables coordinated deployments**: Deploy all projects together or separately

### Original vs New Workflow Comparison

| Aspect | Original | Consolidated |
|--------|----------|--------------|
| Repository Checkouts | 3 separate checkouts with PAT tokens | Single repository checkout |
| Secret Requirements | `PAT_TOKEN` + `FLY_API_TOKEN` | `FLY_API_TOKEN` + hosting secrets |
| Build Coordination | Server builds UI from external repos | All projects built together |
| Deployment Dependencies | Complex cross-repo dependencies | Clean, linear deployment flow |

## 🧪 Testing the Workflow

### Local Testing
You can test individual components locally:

```bash
# Test builds locally
cd server-panda && yarn build
cd ../a-working-panda && yarn build
cd ../landing-panda && yarn build

# Test linting
cd server-panda && yarn lint
cd ../a-working-panda && yarn lint
```

### Branch Testing
The workflow runs on all pull requests, allowing you to test changes before merging to main.

## 🚨 Important Notes

1. **First Run**: The deployment jobs for React app and landing site will show as "successful" but won't actually deploy until you configure the hosting providers.

2. **Server Dependencies**: The server deployment assumes the React app build is integrated into the server build process via `yarn build:ui`.

3. **Artifact Storage**: Build artifacts are stored for deployment jobs. GitHub has limits on artifact storage duration (default 90 days).

4. **Concurrency**: Server deployment uses concurrency groups to prevent simultaneous deployments.

## 🔧 Customization

### Adding New Projects
To add a new project to the consolidated workflow:

1. Add dependency installation step in `test-and-build`
2. Add build step in `test-and-build`
3. Add artifact upload step
4. Create new deployment job
5. Update `notify-completion` dependencies

### Environment-Specific Deployments
Consider creating separate workflows for different environments:
- `deploy-staging.yml` for staging deployments
- `deploy-production.yml` for production deployments

### Custom Build Scripts
Each project can define custom build scripts in their `package.json`:
```json
{
  "scripts": {
    "build": "your-build-command",
    "build:staging": "your-staging-build-command",
    "lint": "your-lint-command"
  }
}
```

## 📞 Troubleshooting

### Common Issues

1. **Build Failures**: Check that all projects have their dependencies properly defined in `package.json`
2. **Deployment Failures**: Verify all required secrets are configured
3. **Artifact Issues**: Ensure build outputs are in expected directories (`dist/` by default)

### Debug Steps

1. Check the Actions tab in your GitHub repository
2. Review individual job logs for specific error messages
3. Test builds locally to isolate issues
4. Verify secret configuration in repository settings

---

**Need Help?** Open an issue in the repository for CI/CD related questions.