## Nuxt 3

### What this is

A **Nuxt 3** demo page that calls Express using `runtimeConfig.public.apiUrl`.

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Create `apps/nuxt_app/.env` (optional):

```bash
NUXT_PUBLIC_API_URL=http://localhost:3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/nuxt-app dev
```

### URLs / ports

- Dev server: `http://localhost:3003`
- API: `NUXT_PUBLIC_API_URL` (defaults to `http://localhost:3000`)

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
