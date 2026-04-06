## React + Vite + TypeScript

### What this is

A **React 19** + **Vite** app using hooks + `fetch` to call the Express API.

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Create `apps/react_app/.env` (optional):

```bash
VITE_API_URL=http://localhost:3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/react-app dev
```

### URLs / ports

- Dev server: `http://localhost:5178`
- API: `VITE_API_URL` (defaults to `http://localhost:3000`)

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
