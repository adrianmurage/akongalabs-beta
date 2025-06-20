# Contributing to SaaS Panda

Welcome to SaaS Panda! We're glad you want to contribute. This guide will help you get started and understand how we work.

## Philosophy

Before you dive in, understand what we're building:

- **Products that ship** - We prioritize working features over perfect code
- **Simple solutions** - Boring code that works beats clever code that impresses
- **Real problems** - We solve actual user problems, not theoretical ones
- **Practical over perfect** - Done is better than perfect

## Quick Start

1. **Fork and clone** the repository
2. **Run setup**: `./setup.sh`
3. **Start developing**: `bun run dev`
4. **Make your changes**
5. **Test locally**: Make sure everything still works
6. **Submit a pull request**

## Development Setup

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- **PostgreSQL** (local or Fly.io)
- **Git**

### First-time setup

```bash
# Clone your fork
git clone https://github.com/yourusername/saas-panda.git
cd saas-panda

# Run the setup script
./setup.sh

# Configure your database
cd server-panda
cp .env.example .env
# Edit .env with your database details

# Start development
bun run dev
```

### Development workflow

```bash
# Start all servers
bun run dev

# Run tests (when we have them)
bun run test

# Check TypeScript
bun run tsc

# Lint code
bun run lint

# Build for production
bun run build
```

## Code Style

### TypeScript everywhere

- Use TypeScript for all new code
- Enable strict mode
- Add types for external APIs
- Don't use `any` unless absolutely necessary

### File organization

```
saas-panda/
├── client-panda/          # React app
│   ├── src/components/    # Reusable components
│   ├── src/lib/          # Utility functions
│   └── src/styles/       # Global styles
├── landing-panda/         # Astro landing pages
│   └── src/pages/        # Landing pages
├── server-panda/          # Express API
│   ├── src/routes/       # API endpoints
│   ├── src/middleware/   # Express middleware
│   └── src/db/           # Database schema
└── docs/                 # Documentation
```

### Naming conventions

- **Files**: `kebab-case.ts` for most files, `PascalCase.tsx` for React components
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Components**: `PascalCase`
- **Database**: `snake_case` for tables and columns

### Code patterns we like

```typescript
// Good: Clear, explicit error handling
try {
  const user = await getUser(id);
  return { success: true, user };
} catch (error) {
  console.error('Failed to get user:', error);
  return { success: false, error: 'User not found' };
}

// Good: Simple, readable functions
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// Good: Descriptive component props
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}
```

### Code patterns we avoid

```typescript
// Bad: Unclear error handling
const user = await getUser(id).catch(() => null);

// Bad: Overly clever one-liners
const formatPrice = (c: number) => `$${(c/100).toFixed(2)}`;

// Bad: Vague props
interface ButtonProps {
  children: any;
  type?: string;
  handler?: Function;
}
```

## Making Changes

### Before you start

1. **Check existing issues** - Someone might already be working on it
2. **Open an issue** - Discuss your idea first for big changes
3. **Keep it simple** - Smaller changes are easier to review

### Types of contributions

**Bug fixes**
- Fix broken functionality
- Add missing error handling
- Improve edge cases

**New features**
- Add user-requested functionality
- Improve developer experience
- Add helpful documentation

**Performance improvements**
- Optimize slow queries
- Reduce bundle size
- Improve loading times

**Documentation**
- Fix outdated information
- Add missing examples
- Improve clarity

### Branch naming

- `fix/description-of-fix`
- `feat/description-of-feature`
- `docs/description-of-update`
- `refactor/description-of-change`

## Testing

### Manual testing

Always test your changes manually:

1. **Start the dev environment**: `bun run dev`
2. **Test in browser**: Visit `http://localhost:3001`
3. **Test all affected features**
4. **Test error cases**
5. **Test on mobile** (if UI changes)

### What to test

- **API endpoints**: Use curl or Postman
- **React components**: Interact with them in browser
- **Database changes**: Verify migrations work
- **Build process**: Run `bun run build`

### Future: Automated testing

We'll add automated tests as the project grows. For now, thorough manual testing is expected.

## Pull Request Process

### Before submitting

- [ ] Code works locally
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Tested in development environment
- [ ] Updated documentation if needed

### PR template

```markdown
## What does this PR do?

Brief description of changes.

## How to test

1. Step one
2. Step two
3. Expected result

## Checklist

- [ ] Tested locally
- [ ] No TypeScript errors
- [ ] Documentation updated
- [ ] Breaking changes documented
```

### Review process

1. **Automated checks** - TypeScript, linting
2. **Manual review** - Code quality, approach
3. **Testing** - Reviewer tests changes
4. **Approval** - Merge when ready

## Database Changes

### Schema changes

1. **Create migration** in `server-panda/drizzle/`
2. **Test locally** with fresh database
3. **Document breaking changes**
4. **Consider rollback plan**

### Best practices

- Use meaningful column names
- Add indexes for queries
- Include foreign key constraints
- Document complex queries

## Documentation

### When to update docs

- New features
- Changed behavior
- New setup steps
- New dependencies

### Documentation style

- **Be practical** - Focus on what helps users
- **Use examples** - Show real code, not theory
- **Be honest** - Admit when things are hard
- **Keep it current** - Update when code changes

## Getting Help

### Stuck on something?

1. **Check existing issues** - Someone might have solved it
2. **Read the docs** - Start with `docs/development.md`
3. **Ask questions** - Open an issue with `question` label
4. **Debug systematically** - Check logs, test isolation

### Common issues

**Development server won't start**
- Check if ports are in use
- Verify .env file exists
- Run `./dev-simple.sh` for automatic cleanup

**Database connection fails**
- Check database is running
- Verify connection string in .env
- For Fly.io, ensure proxy is running

**Build fails**
- Clear `node_modules` and reinstall
- Check for TypeScript errors
- Verify all dependencies are installed

## Release Process

### How releases work

1. **Features merged** to main branch
2. **Version bumped** in package.json
3. **Deployed** to staging for testing
4. **Deployed** to production
5. **Tagged** with version number

### What gets released

- Bug fixes
- New features
- Performance improvements
- Security updates

## Community

### Code of conduct

- **Be respectful** - Everyone is learning
- **Be helpful** - Share knowledge freely
- **Be constructive** - Critique ideas, not people
- **Be inclusive** - Welcome newcomers

### Communication

- **Issues** - Bug reports, feature requests
- **Pull requests** - Code discussions
- **Discussions** - General questions, ideas

## Recognition

Contributors are recognized in:
- README.md
- Release notes
- GitHub contributors list

Thank you for contributing to SaaS Panda! 🐼

---

*This guide will evolve as the project grows. Suggest improvements via pull request.*