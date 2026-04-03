import { Router } from "express";
import {
  getActiveModelsController,
  getModelByIdController,
  listModelsController,
  setActiveModelsController,
} from "./models.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  activeModelsQuerySchema,
  listModelsQuerySchema,
  modelParamsSchema,
  setActiveModelBodySchema,
} from "./models.schemas";

export const modelsRouter = Router();

modelsRouter.get(
  "/",
  validate({ query: listModelsQuerySchema }),
  asyncHandler(listModelsController)
);
modelsRouter.get(
  "/active",
  validate({ query: activeModelsQuerySchema }),
  asyncHandler(getActiveModelsController)
);
modelsRouter.put(
  "/active",
  validate({ body: setActiveModelBodySchema }),
  asyncHandler(setActiveModelsController)
);
modelsRouter.get(
  "/:id",
  validate({ params: modelParamsSchema }),
  asyncHandler(getModelByIdController)
);
