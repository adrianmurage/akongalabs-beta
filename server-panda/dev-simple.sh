#!/bin/bash

# dev-simple.sh - Simplified development environment with consolidated logging
# Starts all three servers (Astro, Vite, Express) with merged log output

set -e

# Colors for log prefixes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored messages
print_status() {
    echo -e "${CYAN}[DEV-SIMPLE]${NC} $1"
}

print_error() {
    echo -e "${RED}[DEV-SIMPLE ERROR]${NC} $1"
}

# Function to kill existing processes
cleanup_processes() {
    print_status "Cleaning up existing processes..."

    # Kill existing dev servers
    pkill -f "bun run dev" 2>/dev/null || true
    pkill -f "astro dev" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    pkill -f "tsx watch" 2>/dev/null || true

    # Kill processes on dev ports
    lsof -ti:3001 2>/dev/null | xargs kill -9 2>/dev/null || true
    lsof -ti:4321 2>/dev/null | xargs kill -9 2>/dev/null || true
    lsof -ti:5173 2>/dev/null | xargs kill -9 2>/dev/null || true

    print_status "Process cleanup completed"
}

# Function to handle graceful shutdown
graceful_shutdown() {
    print_status "Shutting down all services..."

    # Kill all background jobs
    jobs -p | xargs -r kill 2>/dev/null || true

    # Kill processes by port
    lsof -ti:3001 2>/dev/null | xargs kill -TERM 2>/dev/null || true
    lsof -ti:4321 2>/dev/null | xargs kill -TERM 2>/dev/null || true
    lsof -ti:5173 2>/dev/null | xargs kill -TERM 2>/dev/null || true

    # Wait for graceful shutdown
    sleep 2

    # Force kill if still running
    lsof -ti:3001 2>/dev/null | xargs kill -9 2>/dev/null || true
    lsof -ti:4321 2>/dev/null | xargs kill -9 2>/dev/null || true
    lsof -ti:5173 2>/dev/null | xargs kill -9 2>/dev/null || true

    print_status "All services stopped"
    exit 0
}

# Set up signal handlers for graceful shutdown
trap graceful_shutdown SIGINT SIGTERM

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

print_status "Starting SaaS Panda development environment..."
print_status "Project root: $PROJECT_ROOT"

# Clean up any existing processes
cleanup_processes

print_status "Starting all servers with consolidated logging..."
print_status "Use Ctrl+C to stop all servers."
print_status ""
print_status "Access URLs:"
print_status "  - Main application: http://localhost:3001"
print_status "  - React app: http://localhost:3001/app"
print_status "  - API endpoints: http://localhost:3001/api"
print_status "  - Direct Astro: http://localhost:4321"
print_status "  - Direct Vite: http://localhost:5173"
print_status ""

# Start all servers with process substitution for consolidated logging
{
    # Start Astro server
    cd "$PROJECT_ROOT/landing-panda"
    bun run dev 2>&1 | sed "s/^/$(echo -e "${YELLOW}[ASTRO]${NC}") /" &
    ASTRO_PID=$!

    # Start Vite server
    cd "$PROJECT_ROOT/client-panda"
    bun run dev 2>&1 | sed "s/^/$(echo -e "${BLUE}[VITE]${NC}") /" &
    VITE_PID=$!

    # Give background servers time to start
    sleep 3

    # Start Express server in foreground
    cd "$SCRIPT_DIR"
    bun run dev 2>&1 | sed "s/^/$(echo -e "${GREEN}[EXPRESS]${NC}") /"

} 2>&1

# This should not be reached unless Express server exits
print_error "Express server exited unexpectedly"
graceful_shutdown
