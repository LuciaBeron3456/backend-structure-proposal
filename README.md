# Backend Modular Mockup

This folder is a practical mockup of a modular backend structure.  
It is intentionally lightweight, but it already shows the patterns we want to keep: module boundaries, validated inputs, consistent API responses, and centralized middleware/logging.

## Middlewares

Inside `src/shared/middleware`:

- `validateMiddleware.ts`: validates body/query/params (and headers when needed) with Zod.
- `requestLoggerMiddleware.ts`: request/response logging hook.
- `notFoundMiddleware.ts`: standard 404 response.
- `errorMiddleware.ts`: centralized error mapping and API error envelope.

Together, these middlewares enforce a clean request lifecycle at the edge of the app.

## Database layer note

The DB layer is designed to be swappable depending on what we choose in production.  
In this mockup, we use **Prisma + PostgreSQL** as the concrete example:

- Prisma schema: `prisma/schema.prisma`
- DB client: `src/infrastructure/db/client.ts`
- Repository integration: `src/modules/*/*.repository.ts` (all module repositories are Prisma-backed in this mockup)

## Models module walkthrough

To make the structure concrete, here is how `src/modules/models` is split:

- `index.ts`  
  Public entrypoint for the module (exports router).

- `models.routes.ts`  
  Defines HTTP routes and applies middleware in order:
  validation -> async handler -> controller.

- `models.schemas.ts`  
  Zod schemas for request input (`query` and `params`) plus inferred TS types.

- `models.controller.ts`  
  HTTP layer only. Reads validated input, calls the service, returns standardized responses.

- `models.service.ts`  
  Business rules and filtering logic. Handles domain errors (for example "model not found").

- `models.repository.ts`  
  Data access boundary. Today it uses an in-memory source for the mockup, but this is where DB-backed logic lives.

- `models.types.ts`  
  Domain data shape used by the module.

This same pattern is repeated across the rest of the modules so the codebase stays predictable as it grows.
