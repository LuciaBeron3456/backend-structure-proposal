import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { AgentsService } from "./agents.service";
import { ok } from "../../shared/utils/response";
import type { AgentParams, ListAgentsQuery } from "./agents.schemas";

const agentsService = new AgentsService();

export async function listAgentsController(
  req: ValidatedRequest<unknown, ListAgentsQuery>,
  res: Response
) {
  const enabled =
    req.query.enabled === undefined ? undefined : req.query.enabled === "true";
  const data = await agentsService.listAgents(enabled);
  return ok(res, data, {
    filters: { enabled: enabled ?? "all" }
  });
}

export async function getAgentByIdController(
  req: ValidatedRequest<unknown, Record<string, never>, AgentParams>,
  res: Response
) {
  const data = await agentsService.getAgentById(req.params.id);
  return ok(res, data);
}
