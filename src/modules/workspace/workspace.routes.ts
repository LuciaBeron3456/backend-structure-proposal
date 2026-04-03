import { Router } from "express";
import {
  getWorkspaceFileController,
  listWorkspaceFilesController
} from "./workspace.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  listWorkspaceFilesQuerySchema,
  workspaceFileParamsSchema
} from "./workspace.schemas";

export const workspaceRouter = Router();

workspaceRouter.get(
  "/files",
  validate({ query: listWorkspaceFilesQuerySchema }),
  asyncHandler(listWorkspaceFilesController)
);
workspaceRouter.get(
  "/files/:filename",
  validate({ params: workspaceFileParamsSchema }),
  asyncHandler(getWorkspaceFileController)
);
