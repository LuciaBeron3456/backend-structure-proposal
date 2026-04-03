import { z } from "zod";

export const listChatsQuerySchema = z.object({
  q: z.string().trim().min(1).optional()
});

export const chatParamsSchema = z.object({
  id: z.string().trim().min(1)
});

export type ListChatsQuery = z.infer<typeof listChatsQuerySchema>;
export type ChatParams = z.infer<typeof chatParamsSchema>;
