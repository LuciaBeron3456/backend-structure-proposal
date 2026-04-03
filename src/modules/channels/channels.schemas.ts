import { z } from "zod";

const channelTypeSchema = z.enum(["console", "discord", "telegram", "slack"]);

export const listChannelsQuerySchema = z.object({
  enabled: z
    .union([z.literal("true"), z.literal("false")])
    .optional()
});

export const createChannelBodySchema = z.object({
  id: z.string().trim().min(1),
  type: channelTypeSchema,
  enabled: z.boolean().optional().default(true)
});

export const channelParamsSchema = z.object({
  id: z.string().trim().min(1)
});

export type ListChannelsQuery = z.infer<typeof listChannelsQuerySchema>;
export type CreateChannelBody = z.infer<typeof createChannelBodySchema>;
export type ChannelParams = z.infer<typeof channelParamsSchema>;
