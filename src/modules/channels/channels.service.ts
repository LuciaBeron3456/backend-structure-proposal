import { ChannelsRepository } from "./channels.repository";
import { AppError } from "../../shared/errors/AppError";
import type { CreateChannelInput } from "./channels.types";

/** MOCK: data from in-memory ChannelsRepository (no DB). */
export class ChannelsService {
  constructor(private readonly repository = new ChannelsRepository()) {}

  async listChannels(enabled?: boolean) {
    const channels = await this.repository.list();
    if (enabled === undefined) return channels;
    return channels.filter((item) => item.enabled === enabled);
  }

  async createChannel(input: CreateChannelInput) {
    const existing = (await this.repository.list()).find((item) => item.id === input.id);
    if (existing) {
      throw new AppError(
        `Channel with id '${input.id}' already exists`,
        409,
        "CHANNEL_ALREADY_EXISTS",
        { id: input.id }
      );
    }
    return this.repository.create(input);
  }

  async getChannelById(id: string) {
    const channel = await this.repository.getById(id);
    if (!channel) {
      throw new AppError("Channel not found", 404, "CHANNEL_NOT_FOUND", { id });
    }
    return channel;
  }
}
