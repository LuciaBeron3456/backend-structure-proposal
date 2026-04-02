# Backend Modular Mockup

This folder is a scaffold for a domain-driven backend structure.
It is intentionally minimal and non-production, used for architecture review.

## Goals

- Show module boundaries (`auth`, `agents`, `skills`, `mcp`).
- Separate app bootstrap from feature logic.
- Keep shared concerns (`errors`, `middleware`, `logger`) centralized.
- Make future extraction to microservices easier.
- Demonstrate runtime request validation with Zod middleware.

## High-level layout

- `src/main.ts`: process entrypoint.
- `src/app.ts`: express app wiring.
- `src/config`: runtime configuration.
- `src/shared`: cross-domain concerns.
- `src/infrastructure`: adapters for DB/cache/storage.
- `src/modules`: domain feature modules.
- `src/api/router.ts`: API composition point.
- `src/tests`: placeholder test structure.
# backend-structure-proposal
