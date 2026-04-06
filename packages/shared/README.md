## `@repo/shared`

### What this is

Shared **TypeScript** types and small helpers used by:

- Node servers (Express/Nest)
- front-end apps (via bundlers)

It compiles to **`dist/`** as **CommonJS** for broad tooling compatibility.

### Build

```bash
pnpm --filter @repo/shared build
```

### Watch (optional)

```bash
pnpm --filter @repo/shared dev
```

### What’s inside (examples)

- `Todo`, `User`
- API response types (`ApiListResponse`, `ApiHealthResponse`)
- `createTodo(...)`

### Notes

- `pnpm install` runs `prepare` at the repo root which builds `@repo/shared` (so consumers don’t usually need to think about it).
