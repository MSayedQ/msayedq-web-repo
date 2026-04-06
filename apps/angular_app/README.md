## Angular (standalone)

### What this is

An **Angular** standalone app with:

- routing (`src/app/app.routes.ts`)
- a `TodoComponent` UI
- a `TodoService` using `HttpClient` to call Express

### Prereqs

- **Express** running (default `http://localhost:3000`)

### Environment

Edit `src/environments/environment.ts`:

- `apiUrl` defaults to `http://localhost:3000`

### Commands

From repo root:

```bash
pnpm --filter @repo/angular-app dev
```

### URLs / ports

- Dev server: `http://localhost:4200`
- API: `environment.apiUrl`

### Notes

- This repo uses **Angular’s application builder** (`@angular/build:application`). Build output is configured in `angular.json` (`outputPath: dist/angular_app`).

### Troubleshooting

- If the UI shows **API errors**, confirm Express is running and `GET /health` works.
