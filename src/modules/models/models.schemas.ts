import { z } from "zod";

export const listModelsQuerySchema = z.object({
  provider: z.string().trim().min(1).optional(),
  enabled: z.union([z.literal("true"), z.literal("false")]).optional()
});

export const modelParamsSchema = z.object({
  id: z.string().trim().min(1)
});

export type ListModelsQuery = z.infer<typeof listModelsQuerySchema>;
export type ModelParams = z.infer<typeof modelParamsSchema>;
