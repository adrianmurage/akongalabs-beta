# Client Panda 🐼

The React app where your users actually get stuff done.

## What is this?

A React app that doesn't suck. Built with Vite because waiting for Webpack to compile is a waste of life, and Base UI because building accessible components from scratch is a full-time job.

## The stack (and why)

- **React 19** - The new hotness, but stable
- **Vite** - Fast builds, fast reloads, fast everything
- **Base UI** - Accessible components that actually work
- **TypeScript** - Because debugging runtime errors is for masochists
- **CSS Modules** - Scoped styles without the styled-components bloat

## Get it running

```bash
cd client-panda
bun install
bun run dev
```

Boom. React app running on `localhost:5173`.

## What's in the box

```
src/
├── components/     # Reusable stuff
├── App.tsx        # Main app component
├── main.tsx       # Entry point
└── index.css      # Global styles
```

That's it. No `/utils`, no `/hooks`, no `/contexts` until you actually need them.

## The components

**ThemeChanger** - Light/dark mode toggle that actually remembers your choice.

**Button** - A button that looks good and works everywhere. Revolutionary, I know.

## Theme setup

Uses Base UI components with sensible defaults:
- Clean, minimal styling
- CSS modules for scoped styles
- Dark/light theme support

## Philosophy

- Write boring code that works
- Don't abstract until you have to
- Keep it simple, stupid
- If you need a comment to explain it, rewrite it

Built for people who want to ship features, not win architecture debates.