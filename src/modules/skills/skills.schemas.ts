import { z } from "zod";

export const listSkillsQuerySchema = z.object({
  enabled: z.union([z.literal("true"), z.literal("false")]).optional()
});

export const skillParamsSchema = z.object({
  name: z.string().trim().min(1)
});

export const listSkillsHeadersSchema = z.object({
  "x-agent-id": z.string().trim().min(1).optional()
});

export type ListSkillsQuery = z.infer<typeof listSkillsQuerySchema>;
export type SkillParams = z.infer<typeof skillParamsSchema>;
