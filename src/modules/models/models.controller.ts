/**
 * MOCK: provider list + active model slots are in-memory (ModelsService); no DB.
 */
import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { ModelsService } from "./models.service";
import { ok } from "../../shared/utils/response";
import type {
  ActiveModelsQuery,
  ListModelsQuery,
  ModelParams,
  SetActiveModelBody,
} from "./models.schemas";

const modelsService = new ModelsService();

export async function listModelsController(
  req: ValidatedRequest<unknown, ListModelsQuery>,
  res: Response
) {
  const data = await modelsService.listProviders();
  return ok(res, data);
}

export async function getActiveModelsController(
  req: ValidatedRequest<unknown, ActiveModelsQuery>,
  res: Response,
) {
  const data = await modelsService.getActiveModels(req.query.scope, req.query.agent_id);
  return ok(res, data);
}

export async function setActiveModelsController(
  req: ValidatedRequest<SetActiveModelBody>,
  res: Response,
) {
  const data = await modelsService.setActiveModels(req.body);
  return ok(res, data);
}

export async function getModelByIdController(
  req: ValidatedRequest<unknown, Record<string, never>, ModelParams>,
  res: Response
) {
  const data = await modelsService.getModelById(req.params.id);
  return ok(res, data);
}
