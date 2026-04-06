## jQuery demo (Vite + TypeScript)

### What this is

A **jQuery** todo UI using **AJAX** against Express. The entrypoint is `src/main.ts` (Vite compiles TS).

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Create `apps/jquery_web_app/.env` (optional):

```bash
VITE_API_URL=http://localhost:3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/jquery-web-app dev
```

### URLs / ports

- Dev server: `http://localhost:5183`
- API: `VITE_API_URL` (defaults to `http://localhost:3000`)

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
