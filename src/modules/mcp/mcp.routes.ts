import { Router } from "express";
import {
  createMcpController,
  deleteMcpController,
  getMcpByKeyController,
  listMcpController,
  toggleMcpController,
  updateMcpController,
} from "./mcp.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  createMcpBodySchema,
  listMcpQuerySchema,
  mcpParamsSchema,
  updateMcpBodySchema,
} from "./mcp.schemas";

export const mcpRouter = Router();

mcpRouter.get(
  "/",
  validate({ query: listMcpQuerySchema }),
  asyncHandler(listMcpController)
);

mcpRouter.post(
  "/",
  validate({ body: createMcpBodySchema }),
  asyncHandler(createMcpController)
);

mcpRouter.get(
  "/:key",
  validate({ params: mcpParamsSchema }),
  asyncHandler(getMcpByKeyController)
);

mcpRouter.put(
  "/:key",
  validate({ params: mcpParamsSchema, body: updateMcpBodySchema }),
  asyncHandler(updateMcpController)
);

mcpRouter.delete(
  "/:key",
  validate({ params: mcpParamsSchema }),
  asyncHandler(deleteMcpController)
);

mcpRouter.post(
  "/:key/toggle",
  validate({ params: mcpParamsSchema }),
  asyncHandler(toggleMcpController)
);
