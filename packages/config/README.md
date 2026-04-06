## `@repo/config`

### What this is

Shared tooling configuration for the monorepo:

- **ESLint** flat config (`eslint.config.js`)
- **Prettier** config (`prettier.config.cjs`)
- **TypeScript** bases (`typescript/*.json`)

### How to import

Use `exports` paths from `packages/config/package.json`, for example:

- `@repo/config/eslint`
- `@repo/config/prettier`
- `@repo/config/typescript/base`
- `@repo/config/typescript/node`
- `@repo/config/typescript/react`

### Notes

- The repo root `eslint.config.js` re-exports the shared ESLint config for convenience.
