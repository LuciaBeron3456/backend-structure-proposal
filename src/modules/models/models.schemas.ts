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

export const providerModelParamsSchema = z.object({
  id: z.string().trim().min(1),
  modelId: z.string().trim().min(1)
});

export const deleteCustomProviderParamsSchema = z.object({
  providerId: z.string().trim().min(1)
});

export const configureProviderBodySchema = z
  .object({
    api_key: z.string().optional(),
    base_url: z.string().optional(),
    chat_model: z.string().optional(),
    generate_kwargs: z.record(z.string(), z.unknown()).optional()
  })
  .passthrough();

export const createCustomProviderBodySchema = z
  .object({
    id: z.string().trim().min(1),
    name: z.string().trim().min(1),
    default_base_url: z.string().optional(),
    api_key_prefix: z.string().optional(),
    chat_model: z.string().optional(),
    models: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          supports_multimodal: z.boolean().nullable().optional(),
          supports_image: z.boolean().nullable().optional(),
          supports_video: z.boolean().nullable().optional()
        })
      )
      .optional()
  })
  .passthrough();

export const addModelBodySchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1)
});

export const testModelBodySchema = z.object({
  model_id: z.string().trim().min(1)
});

export type ListModelsQuery = z.infer<typeof listModelsQuerySchema>;
export type ModelParams = z.infer<typeof modelParamsSchema>;
export type ActiveModelsQuery = z.infer<typeof activeModelsQuerySchema>;
export type SetActiveModelBody = z.infer<typeof setActiveModelBodySchema>;
export type ProviderModelParams = z.infer<typeof providerModelParamsSchema>;
export type DeleteCustomProviderParams = z.infer<typeof deleteCustomProviderParamsSchema>;
export type ConfigureProviderBody = z.infer<typeof configureProviderBodySchema>;
export type CreateCustomProviderBody = z.infer<typeof createCustomProviderBodySchema>;
export type AddModelBody = z.infer<typeof addModelBodySchema>;
export type TestModelBody = z.infer<typeof testModelBodySchema>;
