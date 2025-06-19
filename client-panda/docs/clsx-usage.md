# Using clsx

How to handle conditional CSS classes without losing your mind.

## What is clsx?

A tiny utility that builds CSS class strings. Think of it as a smarter way to do `className="foo bar baz"` when some of those classes are conditional.

## When to use it

**Dynamic classes based on state:**
```tsx
const Button = ({ isActive, isDisabled }) => (
  <button 
    className={clsx(
      styles.button,
      isActive && styles.active,
      isDisabled && styles.disabled
    )}
  >
    Click me
  </button>
)
```

**Combining base classes with variants:**
```tsx
const Card = ({ variant, size, className }) => (
  <div className={clsx(
    styles.card,           // Always applied
    styles[variant],       // 'primary', 'secondary', etc.
    styles[size],          // 'small', 'large', etc.
    className              // Custom classes from props
  )}>
    Content
  </div>
)
```

**Complex conditional logic:**
```tsx
const StatusBadge = ({ status, count }) => (
  <span className={clsx(
    styles.badge,
    {
      [styles.error]: status === 'error',
      [styles.warning]: status === 'warning' && count > 0,
      [styles.success]: status === 'success',
      [styles.empty]: count === 0
    }
  )}>
    {count}
  </span>
)
```

## When NOT to use it

**Static classes (don't be extra):**
```tsx
// Bad
className={clsx(styles.header)}

// Good
className={styles.header}
```

**Simple boolean toggle:**
```tsx
// Overkill
className={clsx(styles.modal, {[styles.open]: isOpen})}

// Better
className={`${styles.modal} ${isOpen ? styles.open : ''}`}
```

## Common patterns

**Base + modifier pattern:**
```tsx
// Good for button variants
className={clsx(
  styles.btn,                    // Base styles
  styles[`btn-${variant}`],      // Variant styles
  disabled && styles.disabled    // State modifier
)}
```

**Array syntax for readability:**
```tsx
className={clsx([
  styles.form,
  styles.large,
  {
    [styles.error]: hasError,
    [styles.loading]: isLoading
  }
])}
```

**With CSS modules and external classes:**
```tsx
className={clsx(
  styles.component,        // Local CSS module
  'external-lib-class',    // Third-party class
  props.className          // User-provided class
)}
```

## Real examples from this project

**Theme toggle button:**
```tsx
const ThemeToggle = ({ isDark }) => (
  <button className={clsx(
    styles.toggle,
    isDark ? styles.dark : styles.light
  )}>
    {isDark ? '🌙' : '☀️'}
  </button>
)
```

**Form input with validation:**
```tsx
const Input = ({ error, disabled, value }) => (
  <input 
    className={clsx(
      styles.input,
      error && styles.error,
      disabled && styles.disabled,
      value && styles.filled
    )}
  />
)
```

## The bottom line

Use `clsx` when you have conditional classes. Don't use it when you don't. Keep it simple and readable.

It's installed and ready to use:
```tsx
import { clsx } from 'clsx'
```
