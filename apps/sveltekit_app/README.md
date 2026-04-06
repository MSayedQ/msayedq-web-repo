## SvelteKit

### What this is

A **SvelteKit** app with a todo page that calls **Express** (same pattern as the other demos).

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Create `apps/sveltekit_app/.env` (optional):

```bash
PUBLIC_API_URL=http://localhost:3000
```

SvelteKit uses the `PUBLIC_` prefix for browser-safe env vars.

### Commands

From repo root:

```bash
pnpm --filter @repo/sveltekit-app dev
```

### URLs / ports

- Dev server: `http://localhost:5177`
- API: `PUBLIC_API_URL` (defaults to `http://localhost:3000`)

### First-time / editor notes

- This package runs `svelte-kit sync` on `prepare` (after installs) to generate `.svelte-kit/*`.
- This repo hoists `@sveltejs/*` via `.npmrc` to help editors resolve Svelte packages when the workspace is opened at the monorepo root.

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
