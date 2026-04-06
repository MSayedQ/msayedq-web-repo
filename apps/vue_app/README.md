## Vue 3 + Vite

### What this is

A **Vue 3** + **Vite** demo using the Composition API + `fetch` to call Express.

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Create `apps/vue_app/.env` (optional):

```bash
VITE_API_URL=http://localhost:3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/vue-app dev
```

### URLs / ports

- Dev server: `http://localhost:5179`
- API: `VITE_API_URL` (defaults to `http://localhost:3000`)

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
