import { z } from "zod";

export const listAgentsQuerySchema = z.object({
  enabled: z.union([z.literal("true"), z.literal("false")]).optional()
});

export const agentParamsSchema = z.object({
  id: z.string().trim().min(1)
});

export type ListAgentsQuery = z.infer<typeof listAgentsQuerySchema>;
export type AgentParams = z.infer<typeof agentParamsSchema>;
