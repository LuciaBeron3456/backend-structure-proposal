import { z } from "zod";

export const listMcpQuerySchema = z.object({
  enabled: z.union([z.literal("true"), z.literal("false")]).optional()
});

export const mcpParamsSchema = z.object({
  key: z.string().trim().min(1)
});

export const createMcpBodySchema = z.object({
  key: z.string().trim().min(1),
  name: z.string().trim().min(1),
  enabled: z.boolean().optional()
});

export const updateMcpBodySchema = z
  .object({
    name: z.string().optional(),
    enabled: z.boolean().optional()
  })
  .passthrough();

export type ListMcpQuery = z.infer<typeof listMcpQuerySchema>;
export type McpParams = z.infer<typeof mcpParamsSchema>;
export type CreateMcpBody = z.infer<typeof createMcpBodySchema>;
export type UpdateMcpBody = z.infer<typeof updateMcpBodySchema>;
