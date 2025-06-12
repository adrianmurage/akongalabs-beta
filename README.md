# Working Panda 🐼 - Consolidated Repository

A unified development environment containing three interconnected projects: a modern React application, an Astro landing site, and a production-ready Express.js server.

## 🏗️ Repository Structure

This consolidated repository contains three distinct but related projects:

```
working-panda/
├── a-working-panda/     # React Application (Frontend)
├── landing-panda/       # Astro Landing Site
├── server-panda/        # Express.js Server (Backend)
├── .cursor/             # Development tools and planning
└── .backups/            # Repository consolidation backups
```

## 📋 Projects Overview

### 🎨 A Working Panda - React Application
**Location**: `./a-working-panda/`

A modern React application built with Vite, featuring Radix UI components and dynamic theme switching capabilities.

**Features**:
- ⚡ Fast development with Vite and Hot Module Replacement
- 🎨 Modern UI built with Radix UI Themes
- 🌙 Light/dark mode theme switching
- 📱 Responsive, mobile-first design
- 🔧 Full TypeScript support
- 🧹 ESLint configuration with React-specific rules

**Tech Stack**: React 19, Vite 6, Radix UI Themes, next-themes, TypeScript

### 🚀 Landing Panda - Astro Site
**Location**: `./landing-panda/`

A fast, content-focused landing site built with Astro for optimal performance and SEO.

**Features**:
- ⚡ Lightning-fast static site generation
- 🎯 Multi-page navigation structure
- 📱 Responsive design
- 🔧 TypeScript support
- 🎨 Minimal, clean aesthetic

**Tech Stack**: Astro, TypeScript, Static Site Generation

### 🛠️ Server Panda - Express.js Backend
**Location**: `./server-panda/`

A production-ready Express.js server built with TypeScript, PostgreSQL, and Docker deployment capabilities.

**Features**:
- 🚀 Express.js 5 with TypeScript
- 🗄️ PostgreSQL database integration
- 🐳 Docker containerization
- ☁️ Fly.io deployment ready
- 📊 Health monitoring and caching
- 🔧 Modular architecture

**Tech Stack**: Express.js, TypeScript, PostgreSQL, Docker, Fly.io

## 🚀 Quick Start

### Prerequisites

- Node.js 22.16.0 or higher
- PostgreSQL (for server-panda)
- Docker (optional, for containerized deployment)
- Yarn or npm package manager

### Installation

1. **Clone and setup the repository**:
```bash
git clone <your-repo-url>
cd working-panda
```

2. **Install dependencies for each project**:
```bash
# React Application
cd a-working-panda
yarn install
cd ..

# Astro Landing Site
cd landing-panda
yarn install
cd ..

# Express Server
cd server-panda
yarn install
cd ..
```

### Development

Each project can be developed independently:

#### React Application (a-working-panda)
```bash
cd a-working-panda
yarn dev          # Start development server (http://localhost:5173)
yarn build        # Build for production
yarn preview      # Preview production build
```

#### Astro Landing Site (landing-panda)
```bash
cd landing-panda
yarn dev          # Start development server (http://localhost:4321)
yarn build        # Build for production
yarn preview      # Preview production build
```

#### Express Server (server-panda)
```bash
cd server-panda
yarn dev          # Start development server with hot reload
yarn build        # Build TypeScript to JavaScript
yarn start        # Start production server
```

## 🏛️ Architecture

### Project Relationships

```mermaid
graph TD
    U[Users/Browser] --> S[Server Panda - Express]
    S --> L[Landing Panda - Static Files]
    S --> R[React App - Static Files]
    S --> A[API Routes]
    A --> D[PostgreSQL Database]
    
    style S fill:#45b7d1
    style L fill:#ff6b6b
    style R fill:#4ecdc4
    style A fill:#96ceb4
    style D fill:#f7d794
```

- **Server Panda**: Express server that serves everything - static files AND API
- **Landing Panda**: Astro site served as static files by Express server
- **A Working Panda**: React app served as static files by Express server
- **Unified Architecture**: Single server deployment contains all three applications

### Deployment Strategy

- **Unified Deployment**: All applications deployed together to Fly.io
- **Development**: Each project runs independently with proxy middleware
- **Production**: Express server serves React app and Astro site as static files
- **Single Entry Point**: All traffic goes through Express server on Fly.io

## 🔧 Configuration

### Environment Variables

Each project requires its own environment configuration:

#### server-panda/.env
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database
PORT=3000
NODE_ENV=development
```

#### a-working-panda/.env
```env
VITE_API_URL=http://localhost:3000
```

### Docker Support

The server project includes Docker configuration:

```bash
cd server-panda
docker build -t server-panda .
docker run -p 3000:3000 server-panda
```

## 📚 Documentation

Detailed documentation for each project can be found in their respective directories:

- [React App Documentation](./a-working-panda/README.md)
- [Astro Site Documentation](./landing-panda/README.md)
- [Express Server Documentation](./server-panda/README.md)

## 🤝 Development Workflow

### Git Workflow

This consolidated repository allows you to:

- Track changes across all projects in a single commit
- Maintain unified versioning and release management
- Coordinate feature development across frontend and backend
- Simplify CI/CD pipeline management

### Recommended Development Process

1. **Feature Development**: Create feature branches for cross-project changes
2. **Testing**: Test each project individually and integration points
3. **Deployment**: Single unified deployment to Fly.io containing all applications

## 🚀 Deployment

### Unified Deployment Process

All applications are deployed together as a single unit to Fly.io:

```bash
# Build and deploy everything together
cd server-panda
yarn build:ui    # Builds React app and Astro site, copies to server directory
fly deploy       # Deploys Express server with integrated frontend apps
```

The `build:ui` script automatically:
1. Builds the React application (`a-working-panda`)
2. Builds the Astro landing site (`landing-panda`) 
3. Copies both built applications into the server directory
4. Everything deploys together to Fly.io as one application

### CI/CD Pipeline

The GitHub Actions workflow:
- Builds and tests all projects
- Runs the unified build process (`yarn build:ui`)
- Deploys everything to Fly.io in a single deployment
- No separate hosting providers needed

## 🔄 Repository History

This repository was consolidated from three separate repositories:
- `a-working-panda` (React app)
- `landing-panda` (Astro site)
- `server-panda` (Express server)

All commit history from the original repositories has been preserved and is accessible via `git log`.

## 📄 License

Each project maintains its individual licensing. See respective project directories for license information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes across relevant projects
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📞 Support

For project-specific issues, refer to the individual project documentation. For repository structure or consolidation questions, please open an issue in this repository.

---

**Built with 🐼 by the Working Panda team**