## Bootstrap demo (Vite)

### What this is

A small **Bootstrap 5** layout (navbar + cards) with a todo list and API calls to Express.

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Create `apps/bootstrap_web_app/.env` (optional):

```bash
VITE_API_URL=http://localhost:3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/bootstrap-web-app dev
```

### URLs / ports

- Dev server: `http://localhost:5182`
- API: `VITE_API_URL` (defaults to `http://localhost:3000`)

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
