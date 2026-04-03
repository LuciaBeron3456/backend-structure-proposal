import { z } from "zod";

export const listAgentsQuerySchema = z.object({
  enabled: z.union([z.literal("true"), z.literal("false")]).optional()
});

export const agentParamsSchema = z.object({
  id: z.string().trim().min(1)
});

export const createAgentBodySchema = z
  .object({
    name: z.string().trim().min(1),
    description: z.string().optional(),
    workspace_dir: z.string().optional(),
    language: z.string().optional(),
    skill_names: z.array(z.string()).optional()
  })
  .passthrough();

export const agentFileParamsSchema = z.object({
  id: z.string().trim().min(1),
  filename: z.string().trim().min(1)
});

export type ListAgentsQuery = z.infer<typeof listAgentsQuerySchema>;
export type AgentParams = z.infer<typeof agentParamsSchema>;
export type CreateAgentBody = z.infer<typeof createAgentBodySchema>;
export type AgentFileParams = z.infer<typeof agentFileParamsSchema>;
