# A Working Panda 🐼

A modern React application built with Vite, featuring Radix UI components and dynamic theme switching capabilities.

## Features

- ⚡ **Fast Development** - Powered by Vite with Hot Module Replacement
- 🎨 **Modern UI** - Built with Radix UI Themes for accessible, customizable components
- 🌙 **Theme Support** - Light/dark mode switching with next-themes
- 📱 **Responsive Design** - Mobile-first approach with flexible layouts
- 🔧 **TypeScript** - Full type safety throughout the application
- 🧹 **Code Quality** - ESLint configuration with React-specific rules

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **UI Library**: Radix UI Themes
- **Theme Management**: next-themes
- **Language**: TypeScript
- **Styling**: CSS Modules + Radix UI
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- Bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd client-panda
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build the application for production
- `bun run preview` - Preview the production build locally
- `bun run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/         # Custom button component
│   └── theme-changer/  # Theme toggle component
├── assets/             # Static assets
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
├── index.css          # Global styles
└── vite-env.d.ts      # Vite type definitions
```

## Components

### ThemeChanger
A toggle component that allows users to switch between light and dark themes. Uses next-themes for persistence and smooth transitions.

### Button
A custom button component that extends Radix UI's design system with additional styling and functionality.

## Theme Configuration

The application uses Radix UI Themes with the following configuration:
- **Accent Color**: Tomato
- **Panel Background**: Solid
- **Border Radius**: Small

Themes are managed by next-themes and persist across browser sessions.

## Development Guidelines

This project follows a **bias toward simplicity** approach:

- Prefer explicit over clever code
- Choose the simpler solution when possible
- Avoid unnecessary dependencies and abstractions
- Keep configurations minimal and focused
- Write code that others can easily understand and maintain

