# Backend Modular Mockup

Mock HTTP API for local development. Responses use **in-memory data only** — no database, and nothing survives a server restart.

## Quick start

```bash
npm install
npm run dev
```

Default listen port is **8090** (`src/config/env.ts`).

### Port and CORS

Copy `.env.example` to `.env` or set:

```env
PORT=8090
FRONTEND_URL=http://localhost:5173
```

Or: `PORT=8090 npm run dev`

### Mentonex frontend

Point the Vite app at this server (`/api` is prefixed automatically):

```env
VITE_API_BASE_URL=http://localhost:8090
```

Restart Vite after changing env vars.

Health: `GET http://localhost:8090/api/health` — response includes `mock: true`.

## Layout

- **`src/main.ts`** — process entry, `env.PORT`, `createApp()`.
- **`src/app.ts`** — Express: security middleware, JSON body, `/api` router, not-found and error handlers.
- **`src/api/router.ts`** — mounts feature routers under `/api`.
- **`src/shared/`** — middleware (validation, logging, errors), `asyncHandler`, `ok()` response helper.
- **`src/modules/*`** — feature modules (routes → controllers → services → in-memory stores where applicable).
- **`src/infrastructure/db/client.ts`** — unused stub (no Prisma at runtime).

### API surface (prefix `/api`)

| Prefix | Role |
|--------|------|
| `/auth` | Login, status, verify, register, update-profile |
| `/agents` | Agent list (`{ agents: [...] }`) and agent profile |
| `/agent` | Workspace APIs: `/agent/files`, `/agent/memory`, `/agent/system-prompt-files` |
| `/workspace` | `GET /download`, `POST /upload` (zip) |
| `/config` | Channels, heartbeat, user-timezone, security stub |
| `/chats` | Sessions: list, history, CRUD, batch-delete |
| `/console` | Streaming chat, stop, attachment upload |
| `/files` | `GET /preview/:filename` for attachment previews |
| `/models` | Providers and active LLM |
| `/skills`, `/mcp` | Skills and MCP list/detail |
| `/health`, `/version` | Health and version string |

### Models module (files)

- `models.routes.ts` — routes.
- `models.schemas.ts` — Zod inputs.
- `models.controller.ts` — HTTP handlers.
- `models.service.ts` — provider/active LLM state (in-memory).
- `models.repository.ts` — legacy `ModelSummary` rows for `GET /models/:id`.
- `models.types.ts` — types.
