import type { ChannelSummary, CreateChannelInput } from "./channels.types";
import { dbClient } from "../../infrastructure/db/client";

export class ChannelsRepository {
  async list(): Promise<ChannelSummary[]> {
    const rows = await dbClient.channel.findMany({
      select: { id: true, type: true, enabled: true },
      orderBy: { createdAt: "asc" }
    });
    return rows.map((row) => ({
      id: row.id,
      type: row.type as ChannelSummary["type"],
      enabled: row.enabled
    }));
  }

  async getById(id: string): Promise<ChannelSummary | null> {
    const row = await dbClient.channel.findUnique({
      where: { id },
      select: { id: true, type: true, enabled: true }
    });
    if (!row) return null;
    return {
      id: row.id,
      type: row.type as ChannelSummary["type"],
      enabled: row.enabled
    };
  }

  async create(input: CreateChannelInput): Promise<ChannelSummary> {
    const row = await dbClient.channel.create({
      data: {
        id: input.id,
        type: input.type,
        enabled: input.enabled ?? true
      },
      select: { id: true, type: true, enabled: true }
    });
    return {
      id: row.id,
      type: row.type as ChannelSummary["type"],
      enabled: row.enabled
    };
  }
}
