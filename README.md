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
    A[Landing Panda - Astro Site] --> B[A Working Panda - React App]
    B --> C[Server Panda - Express API]
    C --> D[PostgreSQL Database]
    
    style A fill:#ff6b6b
    style B fill:#4ecdc4
    style C fill:#45b7d1
    style D fill:#96ceb4
```

- **Landing Panda**: Marketing/landing pages that drive traffic to the main application
- **A Working Panda**: Main React application providing the core user experience
- **Server Panda**: Backend API serving data and handling business logic

### Deployment Strategy

- **Landing Site**: Static deployment (Netlify, Vercel, etc.)
- **React App**: Static/SPA deployment with API integration
- **Express Server**: Containerized deployment on Fly.io

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
3. **Deployment**: Deploy projects in order: Server → React App → Landing Site

## 🚀 Deployment

### Individual Project Deployment

Each project can be deployed independently:

```bash
# Deploy server first
cd server-panda && fly deploy

# Build and deploy React app
cd a-working-panda && yarn build
# Deploy dist/ to your hosting provider

# Build and deploy landing site
cd landing-panda && yarn build
# Deploy dist/ to your static hosting provider
```

### Unified CI/CD

Consider setting up GitHub Actions or similar CI/CD to:
- Build all projects on push
- Run tests across all codebases
- Deploy in proper dependency order
- Manage environment-specific configurations

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