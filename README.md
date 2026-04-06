## Web technology comparison monorepo

This repo is a **pnpm + Turborepo** workspace for learning and comparing multiple front-end stacks plus two Node servers.

### What you get

- **Many small demo apps** (`apps/*`) that all implement the same idea: a simple todo list + an API snapshot panel.
- **Two comparable APIs** (`servers/*`): Express and NestJS expose the same JSON routes.
- **Shared packages** (`packages/*`):
  - `@repo/shared`: shared TypeScript types + small helpers
  - `@repo/ui`: shared CSS tokens + utility classes
  - `@repo/config`: shared ESLint / Prettier / TS bases

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **pnpm 9.x**

### Install

```bash
pnpm install
```

### Run (recommended workflow)

Most front-end demos call the **Express** API at `http://localhost:3000` by default.

**Terminal A — API**

```bash
pnpm --filter @repo/express-server dev
```

**Terminal B — pick one UI**

```bash
pnpm --filter @repo/react-app dev
```

**Optional — run many dev servers at once**

```bash
pnpm dev
```

This runs `turbo run dev` across the workspace. It starts a lot of processes; this repo sets Turbo `concurrency` high enough to avoid the default limit.

### Environment variables (quick reference)

Copy the root template:

```bash
cp .env.example .env
```

Common variables:

- **Vite apps**: `VITE_API_URL` (default `http://localhost:3000`)
- **Next.js (browser)**: `NEXT_PUBLIC_API_URL`
- **Nuxt**: `NUXT_PUBLIC_API_URL`
- **SvelteKit (public env)**: `PUBLIC_API_URL`

### Ports (so you don’t collide)

| Service | Port |
| --- | ---: |
| Express | 3000 |
| NestJS | 3001 |
| Next.js | 3002 |
| Nuxt | 3003 |
| Angular | 4200 |
| SvelteKit | 5177 |
| React (Vite) | 5178 |
| Vue (Vite) | 5179 |
| Svelte (Vite) | 5180 |
| Pure web | 5181 |
| Bootstrap | 5182 |
| jQuery | 5183 |

### Workspace layout

- `apps/`: front-end demos
- `servers/`: `express_server`, `nestjs_server`
- `packages/`: `shared`, `ui`, `config`

### Root scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | `turbo run dev` |
| `pnpm build` | `turbo run build` |
| `pnpm lint` | `turbo run lint` |
| `pnpm test` | placeholder test scripts |
| `pnpm format` | Prettier write |

### API contract (Express + NestJS)

Both servers expose:

- `GET /health`
- `GET /todos`
- `POST /todos` (JSON: `{ "title": string }`)
- `PATCH /todos/:id` (JSON: `{ "completed"?: boolean, "title"?: string }`)
- `GET /users`

### Troubleshooting

- **`pnpm turbo run dev` complains about concurrency**: this repo sets Turbo concurrency; if you still hit limits, run `pnpm exec turbo run dev --concurrency 25`.
- **UI shows API errors**: start Express first (`pnpm --filter @repo/express-server dev`) and confirm `http://localhost:3000/health` works in the browser.
- **Svelte tooling can’t resolve `@sveltejs/*` from the monorepo root**: this repo hoists `@sveltejs/*` via `.npmrc` (`public-hoist-pattern`). Re-run `pnpm install` after changing `.npmrc`.

### License

MIT (educational use).
