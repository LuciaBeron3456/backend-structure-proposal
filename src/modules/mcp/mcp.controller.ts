import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { McpService } from "./mcp.service";
import { ok } from "../../shared/utils/response";
import type { ListMcpQuery, McpParams } from "./mcp.schemas";

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
