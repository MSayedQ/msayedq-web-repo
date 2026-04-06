## Next.js (App Router)

### What this is

A **Next.js App Router** demo:

- The page UI uses a client component (`TodoClient`) that calls **Express** (not Next) for todos/health/users.
- There is also a sample route handler at `src/app/api/todos` to demonstrate a Next API route using `@repo/shared`.

### Prereqs

- **Express** running (default `http://localhost:3000`) if you want the UI to talk to Express

### Environment

Create `apps/nextjs_app/.env.local` (optional):

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/nextjs-app dev
```

### URLs / ports

- Dev server: `http://localhost:3002`
- API used by the browser: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:3000`)

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
