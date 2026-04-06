## Express server

### What this is

A small **Express** REST API with **in-memory** todos and users.

### Routes

- `GET /health`
- `GET /todos`
- `POST /todos` (JSON: `{ "title": string }`)
- `PATCH /todos/:id` (JSON: `{ "completed"?: boolean, "title"?: string }`)
- `GET /users`

### Environment

Copy `servers/express_server/.env.example` to `.env` (optional):

```bash
PORT=3000
```

### Commands

From repo root:

```bash
pnpm --filter @repo/express-server dev
```

### URLs / ports

- Default: `http://localhost:3000`

### Notes

- Shared types/helpers come from `@repo/shared` (build `packages/shared` first if you’re working outside the normal `pnpm install` flow).
