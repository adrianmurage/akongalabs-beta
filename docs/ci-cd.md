# CI/CD Configuration for Consolidated Repository

This directory contains GitHub Actions workflows for the consolidated Working Panda repository.

## 🚀 Workflow Overview

### `consolidated-deploy.yml`

A unified CI/CD pipeline that builds all projects and deploys them together as a single application to Fly.io:

- **server-panda** (Express.js server that serves everything)
- **client-panda** (React app integrated into server)
- **landing-panda** (Astro site integrated into server)

**Architecture**: All applications are served by the Express server in production, deployed as one unit to Fly.io.

## 📋 Workflow Jobs

### 1. `test-and-build`
**Purpose**: Tests and validates all projects before deployment

**Steps**:
- Installs dependencies for all three projects
- Runs linting (with error tolerance)
- Tests builds for all projects (validation only)
- No artifacts needed - unified build happens in deployment job

**Triggers**: All pushes and pull requests to `main`

### 2. `deploy-unified`
**Purpose**: Deploys all applications together to Fly.io as unified app

**Steps**:
- Installs dependencies for all projects
- Runs `bun run build:ui` to build and integrate frontend apps into server
- Deploys single unified application to Fly.io
- Uses cache-busting with commit SHA

**Triggers**: Only on pushes to `main` (production deployments)

**Key Feature**: Uses the existing `build:ui` script that builds React app and Astro site, then copies their dist folders into the server directory for unified deployment.

## 🔧 Required Secrets

Add these secrets to your GitHub repository settings:

### Fly.io Unified Deployment
- `FLY_API_TOKEN`: Your Fly.io API token for unified application deployment

**Note**: Only one secret required since all applications deploy together to Fly.io. No separate hosting providers needed.

## 🏗️ Configuration Steps

### 1. Unified Deployment (Ready to Use)
The unified deployment is ready to use with Fly.io. Ensure you have:
- `FLY_API_TOKEN` secret configured in GitHub repository settings
- `fly.toml` file in the `server-panda/` directory
- Fly.io app created and configured
- `build:ui` script working in `server-panda/package.json`

**No additional setup required** - the workflow automatically:
1. Builds React app and Astro site
2. Integrates them into the Express server
3. Deploys everything as one application to Fly.io

## 🔄 Migration from Separate Repositories

### Changes from Original CI/CD
The original `server-panda/.github/workflows/fly-deploy.yml` has been replaced with this unified approach that:

1. **Eliminates cross-repository dependencies**: No longer needs to checkout separate repositories
2. **Simplifies secret management**: Only requires `FLY_API_TOKEN`
3. **Matches actual architecture**: Unified deployment reflects how the app actually works
4. **Uses existing build process**: Leverages the proven `build:ui` script

### Original vs New Workflow Comparison

| Aspect | Original | Unified |
|--------|----------|---------|
| Repository Checkouts | 3 separate checkouts with PAT tokens | Single repository checkout |
| Secret Requirements | `PAT_TOKEN` + `FLY_API_TOKEN` | `FLY_API_TOKEN` only |
| Build Coordination | Server builds UI from external repos | Uses consolidated `build:ui` script |
| Deployment Model | Complex cross-repo dependencies | Single unified deployment to Fly.io |
| Architecture Match | Didn't reflect actual serving model | Matches Express server architecture |

## 🧪 Testing the Workflow

### Local Testing
You can test individual components locally:

```bash
# Test builds locally
cd server-panda && bun run build
cd ../client-panda && bun run build
cd ../landing-panda && bun run build

# Test linting
cd server-panda && bun run lint
cd ../client-panda && bun run lint
```

### Branch Testing
The workflow runs on all pull requests, allowing you to test changes before merging to main.

## 🚨 Important Notes

1. **Unified Architecture**: The deployment reflects the actual application architecture where Express serves all applications.

2. **Build Integration**: The workflow uses the existing `bun run build:ui` script that properly integrates frontend builds into the server.

3. **Single Deployment**: Only one deployment to Fly.io - no separate hosting providers needed.

4. **Concurrency**: Unified deployment uses concurrency groups to prevent simultaneous deployments.

## 🔧 Customization

### Adding New Projects
To add a new project to the unified workflow:

1. Add dependency installation step in `test-and-build`
2. Add build validation step in `test-and-build`
3. Update `build:ui` script in `server-panda/package.json` to include new project
4. Update `deploy-unified` job to install new project dependencies
5. Configure Express server to serve the new project's static files

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