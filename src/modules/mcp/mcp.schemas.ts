import { z } from "zod";

export const listMcpQuerySchema = z.object({
  enabled: z.union([z.literal("true"), z.literal("false")]).optional()
});

export const mcpParamsSchema = z.object({
  key: z.string().trim().min(1)
});

export type ListMcpQuery = z.infer<typeof listMcpQuerySchema>;
export type McpParams = z.infer<typeof mcpParamsSchema>;
