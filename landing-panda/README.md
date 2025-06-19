# Landing Panda 🐼

The static site that converts visitors into customers.

## What is this?

Your landing pages built with Astro. Fast, SEO-friendly, and without unnecessary JavaScript bloat. Because your landing page shouldn't take 3 seconds to load just to show some text and a signup button.

## Why Astro?

- **Actually fast** - Ships zero JavaScript by default
- **SEO friendly** - Static generation means search engines can actually read your content
- **Simple** - Write components like React but get static HTML
- **No hydration drama** - Your page works even if JavaScript fails

## Get it running

```bash
cd landing-panda
bun install
bun run dev
```

Your landing pages are now at `localhost:4321`.

## What's inside

```
src/
├── pages/          # Your actual pages (index.astro, about.astro, etc.)
├── components/     # Reusable Astro components
└── layouts/        # Page layouts and structure
```

Each `.astro` file in `pages/` becomes a route. `index.astro` becomes your homepage, `about.astro` becomes `/about`, etc.

## The philosophy

- **Content first** - Your landing page exists to communicate value, not show off your JavaScript skills
- **Performance matters** - Every millisecond counts for conversion
- **Keep it static** - Dynamic stuff belongs in the React app, not the landing page
- **Mobile first** - Most of your traffic is on mobile anyway

## Common tasks

**Add a new page:**
1. Create `src/pages/pricing.astro`
2. That's it. Now you have `/pricing`

**Add a component:**
1. Create `src/components/Hero.astro`
2. Import it: `import Hero from '../components/Hero.astro'`
3. Use it: `<Hero />`

**Style things:**
- Put CSS in the `<style>` tag at the bottom of your `.astro` files
- Styles are automatically scoped to that component
- No CSS-in-JS nonsense needed

Built for people who want fast websites that actually convert visitors.