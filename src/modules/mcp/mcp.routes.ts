import { Router } from "express";
import { getMcpByKeyController, listMcpController } from "./mcp.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import { listMcpQuerySchema, mcpParamsSchema } from "./mcp.schemas";

export const mcpRouter = Router();

mcpRouter.get(
  "/",
  validate({ query: listMcpQuerySchema }),
  asyncHandler(listMcpController)
);
mcpRouter.get(
  "/:key",
  validate({ params: mcpParamsSchema }),
  asyncHandler(getMcpByKeyController)
);
