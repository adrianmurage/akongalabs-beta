#!/bin/bash

# Deploy script with cache-busting options for server-panda
# Usage: ./deploy.sh [--no-cache|--cache-bust|--normal]

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --no-cache     Force rebuild without any Docker cache"
    echo "  --cache-bust   Use timestamp-based cache busting (recommended)"
    echo "  --normal       Normal deployment with cache (default)"
    echo "  --help         Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                    # Normal deployment"
    echo "  $0 --cache-bust      # Cache-busted deployment"
    echo "  $0 --no-cache        # Complete rebuild"
}

# Parse command line arguments
DEPLOY_MODE="normal"

case "${1:-}" in
    --no-cache)
        DEPLOY_MODE="no-cache"
        ;;
    --cache-bust)
        DEPLOY_MODE="cache-bust"
        ;;
    --normal)
        DEPLOY_MODE="normal"
        ;;
    --help|-h)
        show_usage
        exit 0
        ;;
    "")
        DEPLOY_MODE="normal"
        ;;
    *)
        print_error "Unknown option: $1"
        show_usage
        exit 1
        ;;
esac

# Verify we're in the right directory
if [ ! -f "fly.toml" ]; then
    print_error "fly.toml not found. Please run this script from the project root."
    exit 1
fi

# Check if fly CLI is installed
if ! command -v fly &> /dev/null; then
    print_error "fly CLI is not installed. Please install it first:"
    echo "  curl -L https://fly.io/install.sh | sh"
    exit 1
fi

print_status "Starting deployment in ${DEPLOY_MODE} mode..."

# Execute deployment based on mode
case "$DEPLOY_MODE" in
    "no-cache")
        print_warning "Deploying with --no-cache (complete rebuild)..."
        fly deploy --no-cache
        ;;
    "cache-bust")
        # Generate cache-busting value using current timestamp and git commit
        if command -v git &> /dev/null && git rev-parse --git-dir > /dev/null 2>&1; then
            GIT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
            CACHE_BUST="${GIT_COMMIT}-$(date +%s)"
        else
            CACHE_BUST="$(date +%s)"
        fi
        print_status "Using cache-bust value: ${CACHE_BUST}"
        fly deploy --build-arg CACHE_BUST="$CACHE_BUST"
        ;;
    "normal")
        print_status "Deploying with normal caching..."
        fly deploy
        ;;
esac

# Check deployment result
if [ $? -eq 0 ]; then
    print_status "✅ Deployment completed successfully!"
    print_status "🌐 Your app should be available at: https://server-panda-dev.fly.dev"
    echo ""
    print_status "Quick health check:"
    if command -v curl &> /dev/null; then
        echo "  Health endpoint: $(curl -s https://server-panda-dev.fly.dev/health | head -c 100)..."
    else
        echo "  Visit: https://server-panda-dev.fly.dev/health"
    fi
else
    print_error "❌ Deployment failed!"
    exit 1
fi