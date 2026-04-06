## `@repo/ui`

### What this is

Shared **CSS** for consistent styling across demos:

- `src/tokens.css` — CSS variables (colors, radius, etc.)
- `src/components.css` — utility classes (`.repo-…`)

### How apps use it

Import CSS from the package:

```css
@import '@repo/ui/tokens.css';
@import '@repo/ui/components.css';
```

### Notes

- This package is intentionally **CSS-only** (no React/Vue/Angular components).
