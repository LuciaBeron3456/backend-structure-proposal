import { Router } from "express";
import {
  createAgentController,
  deleteAgentController,
  getAgentByIdController,
  getAgentScopedFileController,
  listAgentScopedFilesController,
  listAgentScopedMemoryController,
  listAgentsController,
  putAgentScopedFileController,
  toggleAgentController,
  updateAgentController,
} from "./agents.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  agentFileParamsSchema,
  agentParamsSchema,
  createAgentBodySchema,
  listAgentsQuerySchema,
} from "./agents.schemas";
import { z } from "zod";

export const agentsRouter = Router();

const agentProfileBodySchema = z.record(z.string(), z.unknown());

agentsRouter.get(
  "/",
  validate({ query: listAgentsQuerySchema }),
  asyncHandler(listAgentsController)
);

agentsRouter.post(
  "/",
  validate({ body: createAgentBodySchema }),
  asyncHandler(createAgentController)
);

agentsRouter.get(
  "/:id/files",
  validate({ params: agentParamsSchema }),
  asyncHandler(listAgentScopedFilesController)
);

agentsRouter.get(
  "/:id/files/:filename",
  validate({ params: agentFileParamsSchema }),
  asyncHandler(getAgentScopedFileController)
);

agentsRouter.put(
  "/:id/files/:filename",
  validate({ params: agentFileParamsSchema }),
  asyncHandler(putAgentScopedFileController)
);

agentsRouter.get(
  "/:id/memory",
  validate({ params: agentParamsSchema }),
  asyncHandler(listAgentScopedMemoryController)
);

agentsRouter.post(
  "/:id/toggle",
  validate({ params: agentParamsSchema }),
  asyncHandler(toggleAgentController)
);

agentsRouter.get(
  "/:id",
  validate({ params: agentParamsSchema }),
  asyncHandler(getAgentByIdController)
);

agentsRouter.put(
  "/:id",
  validate({ params: agentParamsSchema, body: agentProfileBodySchema }),
  asyncHandler(updateAgentController)
);

agentsRouter.delete(
  "/:id",
  validate({ params: agentParamsSchema }),
  asyncHandler(deleteAgentController)
);
