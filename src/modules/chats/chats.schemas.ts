import { z } from "zod";

export const listChatsQuerySchema = z.object({
  q: z.string().trim().min(1).optional(),
  user_id: z.string().optional(),
  channel: z.string().optional(),
});

export const chatParamsSchema = z.object({
  id: z.string().trim().min(1),
});

export const createChatBodySchema = z.object({
  id: z.string().optional(),
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  channel: z.string().optional(),
  name: z.string().optional(),
  meta: z.record(z.unknown()).optional(),
});

export const updateChatBodySchema = z
  .object({
    name: z.string().optional(),
    meta: z.record(z.unknown()).optional(),
    status: z.enum(["idle", "running"]).optional(),
  })
  .passthrough();

export const batchDeleteBodySchema = z.array(z.string().min(1));

export type ListChatsQuery = z.infer<typeof listChatsQuerySchema>;
export type ChatParams = z.infer<typeof chatParamsSchema>;
export type CreateChatBody = z.infer<typeof createChatBodySchema>;
export type UpdateChatBody = z.infer<typeof updateChatBodySchema>;
export type BatchDeleteBody = z.infer<typeof batchDeleteBodySchema>;
