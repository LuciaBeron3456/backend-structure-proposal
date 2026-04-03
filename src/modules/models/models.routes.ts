import { Router } from "express";
import { getModelByIdController, listModelsController } from "./models.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import { listModelsQuerySchema, modelParamsSchema } from "./models.schemas";

export const modelsRouter = Router();

modelsRouter.get(
  "/",
  validate({ query: listModelsQuerySchema }),
  asyncHandler(listModelsController)
);
modelsRouter.get(
  "/:id",
  validate({ params: modelParamsSchema }),
  asyncHandler(getModelByIdController)
);
