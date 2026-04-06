## Svelte + Vite

### What this is

A **Svelte 5** + **Vite** app using a Svelte store for UI state and `fetch`/`PATCH` to Express.

### Notes

- Svelte preprocessing is configured in `vite.config.ts` (no separate `svelte.config.*` file).

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Create `apps/svelte_app/.env` (optional):

```bash
VITE_API_URL=http://localhost:3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/svelte-app dev
```

### URLs / ports

- Dev server: `http://localhost:5180`
- API: `VITE_API_URL` (defaults to `http://localhost:3000`)

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
