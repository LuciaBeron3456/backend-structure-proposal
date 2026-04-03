import { Router } from "express";
import {
  addModelController,
  configureProviderController,
  createCustomProviderController,
  deleteCustomProviderController,
  discoverModelsController,
  getActiveModelsController,
  getModelByIdController,
  listModelsController,
  probeMultimodalController,
  removeModelController,
  setActiveModelsController,
  testModelController,
  testProviderController,
} from "./models.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  activeModelsQuerySchema,
  addModelBodySchema,
  configureProviderBodySchema,
  createCustomProviderBodySchema,
  deleteCustomProviderParamsSchema,
  listModelsQuerySchema,
  modelParamsSchema,
  providerModelParamsSchema,
  setActiveModelBodySchema,
  testModelBodySchema,
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

modelsRouter.post(
  "/custom-providers",
  validate({ body: createCustomProviderBodySchema }),
  asyncHandler(createCustomProviderController)
);

modelsRouter.delete(
  "/custom-providers/:providerId",
  validate({ params: deleteCustomProviderParamsSchema }),
  asyncHandler(deleteCustomProviderController)
);

modelsRouter.get(
  "/:id",
  validate({ params: modelParamsSchema }),
  asyncHandler(getModelByIdController)
);

modelsRouter.put(
  "/:id/config",
  validate({ params: modelParamsSchema, body: configureProviderBodySchema }),
  asyncHandler(configureProviderController)
);

modelsRouter.post(
  "/:id/models",
  validate({ params: modelParamsSchema, body: addModelBodySchema }),
  asyncHandler(addModelController)
);

modelsRouter.delete(
  "/:id/models/:modelId",
  validate({ params: providerModelParamsSchema }),
  asyncHandler(removeModelController)
);

modelsRouter.post(
  "/:id/test",
  validate({ params: modelParamsSchema }),
  asyncHandler(testProviderController)
);

modelsRouter.post(
  "/:id/models/test",
  validate({ params: modelParamsSchema, body: testModelBodySchema }),
  asyncHandler(testModelController)
);

modelsRouter.post(
  "/:id/discover",
  validate({ params: modelParamsSchema }),
  asyncHandler(discoverModelsController)
);

modelsRouter.post(
  "/:id/models/:modelId/probe-multimodal",
  validate({ params: providerModelParamsSchema }),
  asyncHandler(probeMultimodalController)
);
