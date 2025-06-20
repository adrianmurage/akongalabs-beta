#!/bin/bash

# SaaS Panda Setup Script
# Handles initial project setup for new developers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}🐼 SaaS Panda Setup${NC}"
    echo "================================"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if running from correct directory
check_directory() {
    if [[ ! -f "README.md" ]] || [[ ! -d "server-panda" ]]; then
        print_error "Please run this script from the saas-panda root directory"
        exit 1
    fi
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."

    # Check if bun is installed
    if ! command -v bun &> /dev/null; then
        print_error "Bun is not installed. Please install from https://bun.sh"
        exit 1
    fi
    print_success "Bun is installed"

    # Check if Node.js is available (for compatibility)
    if ! command -v node &> /dev/null; then
        print_warning "Node.js not found. Bun handles most things, but some tools might need Node.js"
    else
        print_success "Node.js is available"
    fi

    # Check if PostgreSQL is available (optional for local development)
    if command -v psql &> /dev/null; then
        print_success "PostgreSQL is available"
    else
        print_warning "PostgreSQL not found locally. You can use Fly.io database or install PostgreSQL later"
    fi
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."

    # Install server dependencies
    print_info "Installing server dependencies..."
    cd server-panda
    bun install
    cd ..
    print_success "Server dependencies installed"

    # Install client dependencies
    print_info "Installing client dependencies..."
    cd client-panda
    bun install
    cd ..
    print_success "Client dependencies installed"

    # Install landing page dependencies
    print_info "Installing landing page dependencies..."
    cd landing-panda
    bun install
    cd ..
    print_success "Landing page dependencies installed"
}

# Setup environment files
setup_environment() {
    print_info "Setting up environment files..."

    cd server-panda

    if [[ ! -f .env ]]; then
        if [[ -f .env.example ]]; then
            cp .env.example .env
            print_success "Created .env file from .env.example"
            print_warning "Please edit server-panda/.env with your database details"
        elif [[ -f .env.template ]]; then
            cp .env.template .env
            print_success "Created .env file from template"
            print_warning "Please edit server-panda/.env with your database details"
        else
            print_warning "No .env template found. You'll need to create .env manually"
        fi
    else
        print_success ".env file already exists"
    fi

    cd ..
}

# Create helpful aliases/shortcuts
create_shortcuts() {
    print_info "Creating helpful shortcuts..."

    # Create a simple dev script at root level
    cat > dev.sh << 'EOF'
#!/bin/bash
# Quick development starter
cd server-panda && ./dev-simple.sh
EOF
    chmod +x dev.sh
    print_success "Created dev.sh shortcut in root directory"
}

# Final instructions
show_final_instructions() {
    echo ""
    echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Edit server-panda/.env with your database configuration"
    echo "2. Start development with: ./dev.sh (or cd server-panda && ./dev-simple.sh)"
    echo "3. Open http://localhost:3001 in your browser"
    echo ""
    echo "Useful commands:"
    echo "- Start dev environment: ./dev.sh"
    echo "- Build for production: cd server-panda && bun run build:ui"
    echo "- Deploy: cd server-panda && fly deploy"
    echo ""
    echo "Need help? Check the docs/ directory or README.md"
}

# Main execution
main() {
    print_header
    check_directory
    check_prerequisites
    install_dependencies
    setup_environment
    create_shortcuts
    show_final_instructions
}

# Handle interrupts gracefully
trap 'print_error "Setup interrupted"; exit 1' INT TERM

# Run main function
main "$@"
