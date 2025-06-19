# CI/CD Pipeline 🚀

How your code gets from laptop to production without breaking everything.

## What happens when you push

We use GitHub Actions because it's free, works, and everyone knows it. The workflow is simple:

1. **Push to main** → Tests run → If they pass, deploy to Fly.io
2. **Push to any other branch** → Tests run → That's it

## The pipeline

**File**: `.github/workflows/consolidated-deploy.yml`

**What it does:**
- Installs dependencies (all three projects)
- Runs linting (with some tolerance for real-world code)
- Builds everything to make sure it compiles
- If on main branch: deploys to Fly.io

**How long it takes:** ~3-5 minutes if everything goes well

## The deployment process

When you push to main:

1. **Build step** runs `bun run build:ui` which:
   - Builds the React app (client-panda)
   - Builds the Astro landing pages (landing-panda)
   - Copies both into the Express server directory
   - Creates one unified application

2. **Deploy step** runs `fly deploy` which:
   - Uploads everything to Fly.io
   - Builds the Docker container
   - Deploys the new version
   - Switches traffic over

## Environment setup

**Secrets you need in GitHub:**
- `FLY_API_TOKEN` - Get this from `fly auth token`

**Secrets you need in Fly.io:**
- `DATABASE_URL` - Your PostgreSQL connection string
- Any other environment variables your app needs

Set GitHub secrets at: `Settings → Secrets and variables → Actions`

Set Fly secrets with: `fly secrets set KEY=value`

## When deployments fail

**Common issues:**

**"fly: not found"**
- The Fly CLI isn't installed properly in the action
- Check if the Fly CLI setup step is working

**"Build failed"**
- TypeScript errors in your code
- Run `bun run build:ui` locally to see what's broken

**"Database connection failed"**
- Check your DATABASE_URL secret in Fly.io
- Make sure your database is running

**"Deploy timeout"**
- Fly.io might be having issues
- Try again in 10 minutes

## Useful commands

```bash
# Test the build process locally
bun run build:ui

# Check what will be deployed
ls -la server-panda/public/

# See deploy logs
fly logs

# Check app status
fly status

# See current secrets
fly secrets list
```

## The workflow file

Located at `.github/workflows/consolidated-deploy.yml`. Here's what it does:

**On every push:**
- Installs dependencies
- Runs linting (ESLint)
- Tests builds

**On push to main:**
- Everything above, plus:
- Builds the unified application
- Deploys to Fly.io

## Branch protection

**Recommended setup:**
- Require status checks to pass before merging
- Require up-to-date branches before merging
- Don't allow direct pushes to main

Set this up at: `Settings → Branches → Add rule`

## Deploy notifications

**Want to know when deploys happen?**

Add this to your workflow to get Slack/Discord notifications:
```yaml
- name: Notify on deploy
  if: success()
  run: |
    curl -X POST -H 'Content-type: application/json' \
      --data '{"text":"🚀 Deploy successful!"}' \
      ${{ secrets.SLACK_WEBHOOK_URL }}
```

## The philosophy

- **Keep it simple** - Complex CI/CD setups break more than they help
- **Fail fast** - If something's wrong, know immediately
- **Deploy often** - Small, frequent deploys are safer than big ones
- **Monitor everything** - Use Fly.io's built-in monitoring

## Troubleshooting

**Pipeline stuck?**
- Cancel it and push again
- Check GitHub Actions status page

**Deploy successful but app not working?**
- Check `fly logs` for runtime errors
- Verify environment variables are set
- Test the build locally first

**Want to skip CI?**
- Add `[skip ci]` to your commit message
- Don't do this for main branch pushes

## Manual deployment

If GitHub Actions is down or you need to deploy urgently:

```bash
# Build everything
bun run build:ui

# Deploy manually
fly deploy

# Or use the deploy script
./server-panda/deploy.sh
```

## Performance tips

**Make builds faster:**
- Use Bun instead of npm (we already do this)
- Cache node_modules between runs (GitHub Actions does this)
- Only install production dependencies for deploy

**Make deploys faster:**
- Use `fly deploy --strategy immediate` for urgent fixes
- Keep Docker images small (our Dockerfile is already optimized)

The goal is to ship code confidently and quickly. If the pipeline is getting in your way, fix it.