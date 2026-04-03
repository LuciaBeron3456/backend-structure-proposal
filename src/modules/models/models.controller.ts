/**
 * MOCK: provider list + active model slots are in-memory (ModelsService); no DB.
 */
import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { ModelsService } from "./models.service";
import { ok } from "../../shared/utils/response";
import type {
  ActiveModelsQuery,
  AddModelBody,
  ConfigureProviderBody,
  CreateCustomProviderBody,
  DeleteCustomProviderParams,
  ListModelsQuery,
  ModelParams,
  ProviderModelParams,
  SetActiveModelBody,
  TestModelBody,
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

export async function configureProviderController(
  req: ValidatedRequest<ConfigureProviderBody, Record<string, never>, ModelParams>,
  res: Response
) {
  const data = await modelsService.configureProvider(req.params.id, req.body);
  return ok(res, data);
}

export async function createCustomProviderController(
  req: ValidatedRequest<CreateCustomProviderBody>,
  res: Response
) {
  const data = await modelsService.createCustomProvider(req.body);
  return ok(res, data);
}

export async function deleteCustomProviderController(
  req: ValidatedRequest<unknown, Record<string, never>, DeleteCustomProviderParams>,
  res: Response
) {
  const data = await modelsService.deleteCustomProvider(req.params.providerId);
  return ok(res, data);
}

export async function addModelController(
  req: ValidatedRequest<AddModelBody, Record<string, never>, ModelParams>,
  res: Response
) {
  const data = await modelsService.addModel(req.params.id, req.body);
  return ok(res, data);
}

export async function removeModelController(
  req: ValidatedRequest<unknown, Record<string, never>, ProviderModelParams>,
  res: Response
) {
  const data = await modelsService.removeModel(req.params.id, req.params.modelId);
  return ok(res, data);
}

export async function testProviderController(
  req: ValidatedRequest<unknown, Record<string, never>, ModelParams>,
  res: Response
) {
  const data = await modelsService.testProviderConnection(req.params.id);
  return ok(res, data);
}

export async function testModelController(
  req: ValidatedRequest<TestModelBody, Record<string, never>, ModelParams>,
  res: Response
) {
  const data = await modelsService.testModelConnection(req.params.id, req.body);
  return ok(res, data);
}

export async function discoverModelsController(
  req: ValidatedRequest<unknown, Record<string, never>, ModelParams>,
  res: Response
) {
  const data = await modelsService.discoverModels(req.params.id);
  return ok(res, data);
}

export async function probeMultimodalController(
  req: ValidatedRequest<unknown, Record<string, never>, ProviderModelParams>,
  res: Response
) {
  const data = await modelsService.probeMultimodal(req.params.id, req.params.modelId);
  return ok(res, data);
}
