import { z } from "zod";

export const listModelsQuerySchema = z.object({
  provider: z.string().trim().min(1).optional(),
  enabled: z.union([z.literal("true"), z.literal("false")]).optional()
});

export const activeModelsQuerySchema = z.object({
  scope: z.enum(["effective", "global", "agent"]).optional(),
  agent_id: z.string().trim().min(1).optional()
});

export const setActiveModelBodySchema = z.object({
  provider_id: z.string().trim().min(1),
  model: z.string().trim().min(1),
  scope: z.enum(["global", "agent"]),
  agent_id: z.string().trim().min(1).optional()
});

export const modelParamsSchema = z.object({
  id: z.string().trim().min(1)
});

export type ListModelsQuery = z.infer<typeof listModelsQuerySchema>;
export type ModelParams = z.infer<typeof modelParamsSchema>;
export type ActiveModelsQuery = z.infer<typeof activeModelsQuerySchema>;
export type SetActiveModelBody = z.infer<typeof setActiveModelBodySchema>;
