## Pure HTML / CSS / JavaScript (Vite)

### What this is

A minimal **HTML + CSS + JS** demo served by **Vite** for fast dev reload.

Entry files:

- `index.html`
- `style.css`
- `script.js` (ES module; uses `import.meta.env`)

### What it demonstrates

- **DOM** todo UI
- **`fetch`** calls to the Express API
- Shared styling via `@repo/ui` (imported from `style.css`)

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Create `apps/pure_web_app/.env` (optional):

```bash
VITE_API_URL=http://localhost:3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/pure-web-app dev
```

Or from this folder:

```bash
pnpm dev
```

### URLs / ports

- Dev server: `http://localhost:5181`
- API: `VITE_API_URL` (defaults to `http://localhost:3000`)

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
