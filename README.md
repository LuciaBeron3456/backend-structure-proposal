# Backend Modular Mockup

This server is a **mock API** for local development. **All responses use in-memory fake data** — there is no database connection and nothing is persisted across restarts (except what you hold in memory during a single process).

## Quick start

From this directory:

```bash
npm install
npm run dev
```

The HTTP server listens on **port 8090** by default (see `src/config/env.ts`: `PORT` defaults to `8090`).

### Set the port explicitly (8090)

Create a `.env` file next to `package.json` (you can copy `.env.example`):

```bash
cp .env.example .env
```

Ensure it contains:

```env
PORT=8090
FRONTEND_URL=http://localhost:5173
```

Or start with an environment variable:

```bash
PORT=8090 npm run dev
```

### Point the Mentonex frontend at this API

The Vite app calls `VITE_API_BASE_URL` + `/api/...`. In the **frontend** repo, set (for example in `frontend/.env` or `frontend/.env.local`):

```env
VITE_API_BASE_URL=http://localhost:8090
```

Restart the Vite dev server after changing env vars.

Health check: `GET http://localhost:8090/api/health` — the JSON includes `mock: true`.

## Architecture notes

- **Middlewares** (`src/shared/middleware`): validation (Zod), request logging, 404, error handling.
- **Modules** (`src/modules/*`): each feature exposes routes → controller → service → **in-memory** repository (see comments marked `MOCK` in repository and service files).
- **`src/infrastructure/db/client.ts`**: stub only; real Prisma usage is not active in this mock mode.

For a deeper tour of the models module layout (routes, schemas, controller, service, types), see the older sections below if still useful; treat the **database layer** description as superseded by the mock-only note above.

## Models module layout (reference)

- `index.ts` — public router export.
- `models.routes.ts` — HTTP routes and middleware chain.
- `models.schemas.ts` — Zod request schemas.
- `models.controller.ts` — HTTP layer.
- `models.service.ts` — business rules; provider/active LLM state is in-memory.
- `models.repository.ts` — legacy `ModelSummary` mock rows (no DB).
- `models.types.ts` — TypeScript types.
