import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { ModelsService } from "./models.service";
import { ok } from "../../shared/utils/response";
import type { ListModelsQuery, ModelParams } from "./models.schemas";

const modelsService = new ModelsService();

export async function listModelsController(
  req: ValidatedRequest<unknown, ListModelsQuery>,
  res: Response
) {
  const enabled =
    req.query.enabled === undefined ? undefined : req.query.enabled === "true";
  const data = await modelsService.listModels({
    provider: req.query.provider,
    enabled
  });
  return ok(res, data, {
    filters: {
      provider: req.query.provider ?? "all",
      enabled: enabled ?? "all"
    }
  });
}

export async function getModelByIdController(
  req: ValidatedRequest<unknown, Record<string, never>, ModelParams>,
  res: Response
) {
  const data = await modelsService.getModelById(req.params.id);
  return ok(res, data);
}
