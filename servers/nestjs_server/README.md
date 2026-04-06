## NestJS server

### What this is

A modular **NestJS** API that mirrors the Express routes so you can compare frameworks side-by-side.

### Modules / structure (high level)

- `HealthController` (`GET /health`)
- `TodoModule` (`/todos`)
- `UserModule` (`/users`)

### Environment

Copy `servers/nestjs_server/.env.example` to `.env` (optional):

```bash
PORT=3001
```

### Commands

From repo root:

```bash
pnpm --filter @repo/nestjs-server dev
```

### URLs / ports

- Default: `http://localhost:3001`

### Notes

- Shared types/helpers come from `@repo/shared`.
