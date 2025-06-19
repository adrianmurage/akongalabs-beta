# clsx Usage Guide

## Overview

`clsx` is a utility library for constructing className strings conditionally. It's already installed in this project and should be used whenever you need dynamic or conditional CSS classes.

## When to Use clsx

### ✅ Use clsx when:

1. **Conditional Classes**: When you need to apply classes based on component state
   ```tsx
   className={clsx(
     styles.button,
     {
       [styles.active]: isActive,
       [styles.disabled]: isDisabled,
     }
   )}
   ```

2. **Multiple Dynamic Classes**: When combining multiple class sources
   ```tsx
   className={clsx(
     styles.base,
     variant && styles[variant],
     size && styles[size],
     customClassName
   )}
   ```

3. **Component Props**: When combining multiple class sources including props
   ```tsx
   className={clsx(
     styles.base,
     styles[variant],
     className // from props
   )}
   ```

### ❌ Don't use clsx when:

1. **Static Classes**: When you only have static class names
   ```tsx
   // Bad
   className={clsx(styles.container)}
   
   // Good
   className={styles.container}
   ```

2. **Single Conditional**: When you have a simple ternary
   ```tsx
   // Acceptable without clsx
   className={isActive ? styles.active : styles.inactive}
   
   // But clsx is cleaner for multiple conditions
   className={clsx({
     [styles.active]: isActive,
     [styles.inactive]: !isActive,
   })}
   ```

## Current Usage in Project

### Button Component
```tsx
className={clsx(
  styles.button,
  styles[`button--${variant}`],
  styles[`button--${size}`],
  {
    [styles["button--disabled"]]: disabled,
  },
  className,
)}
```

### ThemeSelect Component
Note: Base UI components in the current version use data attributes for styling rather than state render functions, so we use CSS selectors like `[data-selected]` instead of clsx for state-based styling.

### App Component
Currently uses simple className assignment for Dialog components as Base UI handles state styling through data attributes.

## Best Practices

1. **Import at the top**
   ```tsx
   import clsx from "clsx";
   ```

2. **Use object syntax for boolean conditions**
   ```tsx
   clsx({
     [styles.active]: isActive,
     [styles.error]: hasError,
   })
   ```

3. **Combine with CSS Modules**
   ```tsx
   clsx(
     styles.base,                    // Always applied
     condition && styles.conditional, // Conditionally applied
     {
       [styles.state]: hasState,     // Object syntax
     },
     className                       // External className prop
   )
   ```

4. **With arrays of classes**
   ```tsx
   className={clsx([
     styles.base,
     isLarge && styles.large,
     isSmall && styles.small
   ])}
   ```

## Benefits

- **Readable**: Clear intent for conditional classes
- **Performant**: Minimal runtime overhead
- **Type-safe**: Works well with TypeScript
- **Flexible**: Handles various input types (strings, objects, arrays)
- **Clean**: Avoids messy template literals or concatenation

## Migration Guide

When you see code like this:
```tsx
// Old approach
className={`${styles.button} ${isActive ? styles.active : ''} ${size ? styles[size] : ''}`}

// Convert to clsx
className={clsx(
  styles.button,
  isActive && styles.active,
  size && styles[size]
)}
```

Remember: Use clsx to make your conditional className logic cleaner and more maintainable!