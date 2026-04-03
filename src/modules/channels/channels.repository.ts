import type { ChannelSummary, CreateChannelInput } from "./channels.types";

/**
 * MOCK DATA: in-memory channels (no DB). `create` appends to this array.
 */
let mockChannels: ChannelSummary[] = [
  { id: "ch-console", type: "console", enabled: true },
  { id: "ch-discord", type: "discord", enabled: false },
];

export class ChannelsRepository {
  async list(): Promise<ChannelSummary[]> {
    return [...mockChannels];
  }

  async getById(id: string): Promise<ChannelSummary | null> {
    return mockChannels.find((c) => c.id === id) ?? null;
  }

  async create(input: CreateChannelInput): Promise<ChannelSummary> {
    const row: ChannelSummary = {
      id: input.id,
      type: input.type,
      enabled: input.enabled ?? true,
    };
    mockChannels = [...mockChannels, row];
    return row;
  }
}
