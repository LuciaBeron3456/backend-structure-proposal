import { z } from "zod";

export const listWorkspaceFilesQuerySchema = z.object({
  extension: z.string().trim().min(1).optional()
});

export const workspaceFileParamsSchema = z.object({
  filename: z.string().trim().min(1)
});

export type ListWorkspaceFilesQuery = z.infer<typeof listWorkspaceFilesQuerySchema>;
export type WorkspaceFileParams = z.infer<typeof workspaceFileParamsSchema>;
