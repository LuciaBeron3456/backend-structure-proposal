import { Router } from "express";
import { getAgentByIdController, listAgentsController } from "./agents.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import { agentParamsSchema, listAgentsQuerySchema } from "./agents.schemas";

export const agentsRouter = Router();

agentsRouter.get(
  "/",
  validate({ query: listAgentsQuerySchema }),
  asyncHandler(listAgentsController)
);
agentsRouter.get(
  "/:id",
  validate({ params: agentParamsSchema }),
  asyncHandler(getAgentByIdController)
);
