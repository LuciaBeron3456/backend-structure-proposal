import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { McpService } from "./mcp.service";
import { ok } from "../../shared/utils/response";
import type {
  CreateMcpBody,
  ListMcpQuery,
  McpParams,
  UpdateMcpBody,
} from "./mcp.schemas";

const mcpService = new McpService();

export async function listMcpController(
  req: ValidatedRequest<unknown, ListMcpQuery>,
  res: Response
) {
  const enabled =
    req.query.enabled === undefined ? undefined : req.query.enabled === "true";
  const data = await mcpService.listClients(enabled);
  return ok(res, data, {
    filters: { enabled: enabled ?? "all" }
  });
}

export async function getMcpByKeyController(
  req: ValidatedRequest<unknown, Record<string, never>, McpParams>,
  res: Response
) {
  const data = await mcpService.getClientByKey(req.params.key);
  return ok(res, data);
}

export async function createMcpController(
  req: ValidatedRequest<CreateMcpBody>,
  res: Response
) {
  const data = await mcpService.createClient(req.body);
  return ok(res, data);
}

export async function updateMcpController(
  req: ValidatedRequest<UpdateMcpBody, Record<string, never>, McpParams>,
  res: Response
) {
  const data = await mcpService.updateClient(req.params.key, req.body);
  return ok(res, data);
}

export async function deleteMcpController(
  req: ValidatedRequest<unknown, Record<string, never>, McpParams>,
  res: Response
) {
  const data = await mcpService.deleteClient(req.params.key);
  return ok(res, data);
}

export async function toggleMcpController(
  req: ValidatedRequest<unknown, Record<string, never>, McpParams>,
  res: Response
) {
  const data = await mcpService.toggleClient(req.params.key);
  return ok(res, data);
}
