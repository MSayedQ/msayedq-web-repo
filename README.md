# Web technology comparison monorepo

This repository is a **pnpm + Turborepo** workspace for learning, comparing, and demonstrating multiple front-end stacks and two Node servers. Apps share **`@repo/shared`** (types and helpers), **`@repo/ui`** (design tokens and CSS), and **`@repo/config`** (ESLint, Prettier, TypeScript bases).

## Prerequisites

- Node.js **20+** (LTS recommended)
- [pnpm](https://pnpm.io/) 9.x

## Quick start

```bash
pnpm install
pnpm turbo run dev
```

Start the **Express** API in a second terminal so client apps can load todos and users:

```bash
pnpm --filter @repo/express-server dev
```

Default API base URL: `http://localhost:3000`.

## Ports (avoid collisions when running everything)

| Service        | Port |
| -------------- | ---- |
| Express        | 3000 |
| NestJS         | 3001 |
| Next.js        | 3002 |
| Nuxt           | 3003 |
| Angular        | 4200 |
| SvelteKit      | 5177 |
| React (Vite)   | 5178 |
| Vue (Vite)     | 5179 |
| Svelte (Vite)  | 5180 |
| Pure web       | 5181 |
| Bootstrap      | 5182 |
| jQuery         | 5183 |

Override URLs with env files (see root `.env.example` and each app’s README).

## Workspace layout

- `apps/` — front-end demos (todo + counter + API panel calling Express)
- `servers/` — `express_server`, `nestjs_server`
- `packages/` — `shared`, `ui`, `config`

## Scripts

| Command              | Description                |
| -------------------- | -------------------------- |
| `pnpm dev`           | `turbo run dev` (parallel) |
| `pnpm build`         | Build all packages         |
| `pnpm lint`          | ESLint across workspaces   |
| `pnpm test`          | Placeholder test scripts   |
| `pnpm turbo run dev` | Same as `pnpm dev`         |

## Packages

- **`@repo/shared`** — `Todo`, `User`, API response types; `createTodo` helper (compiled to CommonJS for broad tooling compatibility).
- **`@repo/ui`** — CSS tokens (`tokens.css`) and utility classes (`components.css`).
- **`@repo/config`** — Shared Prettier config, ESLint flat config, and TypeScript bases.

## API contract (Express & NestJS)

Both servers expose:

- `GET /health` — `{ status, service, timestamp }`
- `GET /todos` — `{ data: Todo[] }`
- `POST /todos` — body `{ title }`
- `PATCH /todos/:id` — body `{ completed? , title? }`
- `GET /users` — `{ data: User[] }`

## Notes

- **Next.js** includes an App Router **`/api/todos`** route for demonstration; the home page still calls the **Express** URL from `NEXT_PUBLIC_API_URL`.
- **SvelteKit** uses `PUBLIC_API_URL` for the public env prefix.
- **Pure / Bootstrap / jQuery** apps use Vite for dev ergonomics while keeping the requested file names (`index.html`, `style.css`, `script.js` for pure; Bootstrap/jQuery use `src/` entrypoints).

## License

MIT (educational use).
