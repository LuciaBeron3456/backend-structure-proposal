import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { WorkspaceService } from "./workspace.service";
import { ok } from "../../shared/utils/response";
import type {
  ListWorkspaceFilesQuery,
  WorkspaceFileParams
} from "./workspace.schemas";

const workspaceService = new WorkspaceService();

export async function listWorkspaceFilesController(
  req: ValidatedRequest<unknown, ListWorkspaceFilesQuery>,
  res: Response
) {
  const data = await workspaceService.listWorkspaceFiles(req.query.extension);
  return ok(res, data, {
    filters: { extension: req.query.extension ?? "all" }
  });
}

export async function getWorkspaceFileController(
  req: ValidatedRequest<unknown, Record<string, never>, WorkspaceFileParams>,
  res: Response
) {
  const data = await workspaceService.getWorkspaceFile(req.params.filename);
  return ok(res, data);
}
