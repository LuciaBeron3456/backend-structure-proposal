import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { AgentsService } from "./agents.service";
import { ok } from "../../shared/utils/response";
import type {
  AgentFileParams,
  AgentParams,
  CreateAgentBody,
  ListAgentsQuery,
} from "./agents.schemas";

const agentsService = new AgentsService();

export async function listAgentsController(
  req: ValidatedRequest<unknown, ListAgentsQuery>,
  res: Response,
) {
  const enabled =
    req.query.enabled === undefined ? undefined : req.query.enabled === "true";
  const data = await agentsService.listAgents(enabled);
  /** Frontend expects `AgentListResponse`: `{ agents: [...] }`. */
  return ok(res, { agents: data });
}

export async function getAgentByIdController(
  req: ValidatedRequest<unknown, Record<string, never>, AgentParams>,
  res: Response,
) {
  const data = await agentsService.getAgentProfile(req.params.id);
  return ok(res, data);
}

export async function createAgentController(
  req: ValidatedRequest<CreateAgentBody>,
  res: Response,
) {
  const data = await agentsService.createAgent(req.body);
  return ok(res, data);
}

export async function updateAgentController(
  req: ValidatedRequest<Record<string, unknown>, Record<string, never>, AgentParams>,
  res: Response,
) {
  const data = await agentsService.updateAgent(req.params.id, req.body);
  return ok(res, data);
}

export async function deleteAgentController(
  req: ValidatedRequest<unknown, Record<string, never>, AgentParams>,
  res: Response,
) {
  const data = await agentsService.deleteAgent(req.params.id);
  return ok(res, data);
}

export async function toggleAgentController(
  req: ValidatedRequest<unknown, Record<string, never>, AgentParams>,
  res: Response,
) {
  const data = await agentsService.toggleAgent(req.params.id);
  return ok(res, data);
}

export async function listAgentScopedFilesController(
  req: ValidatedRequest<unknown, Record<string, never>, AgentParams>,
  res: Response,
) {
  const data = await agentsService.listAgentFiles(req.params.id);
  return ok(res, data);
}

export async function getAgentScopedFileController(
  req: ValidatedRequest<unknown, Record<string, never>, AgentFileParams>,
  res: Response,
) {
  const data = await agentsService.getAgentFile(req.params.id, req.params.filename);
  return ok(res, data);
}

export async function putAgentScopedFileController(
  req: ValidatedRequest<unknown, Record<string, never>, AgentFileParams>,
  res: Response,
) {
  const data = await agentsService.putAgentFile(req.params.id, req.params.filename);
  return ok(res, data);
}

export async function listAgentScopedMemoryController(
  req: ValidatedRequest<unknown, Record<string, never>, AgentParams>,
  res: Response,
) {
  const data = await agentsService.listAgentMemory(req.params.id);
  return ok(res, data);
}
