import { ChatsRepository } from "./chats.repository";
import { AppError } from "../../shared/errors/AppError";
import type { ChatSpec } from "./chats.types";

/** MOCK: in-memory chats only (no DB). */
export class ChatsService {
  constructor(private readonly repository = new ChatsRepository()) {}

  async listChats(query?: string) {
    const items = await this.repository.list();
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((item) =>
      (item.name ?? item.id).toLowerCase().includes(q),
    );
  }

  async getChatById(id: string) {
    const item = await this.repository.getById(id);
    if (!item) {
      throw new AppError("Chat not found", 404, "CHAT_NOT_FOUND", { id });
    }
    return item;
  }

  async getChatHistory(id: string) {
    await this.getChatById(id);
    return { messages: [] as unknown[], status: "idle" as const };
  }

  async createChat(spec: Partial<ChatSpec>) {
    return this.repository.create(spec);
  }

  async updateChat(id: string, patch: Partial<ChatSpec>) {
    const row = await this.repository.update(id, patch);
    if (!row) {
      throw new AppError("Chat not found", 404, "CHAT_NOT_FOUND", { id });
    }
    return row;
  }

  async deleteChat(id: string) {
    const ok = await this.repository.delete(id);
    if (!ok) {
      throw new AppError("Chat not found", 404, "CHAT_NOT_FOUND", { id });
    }
    return { success: true, chat_id: id };
  }

  async batchDelete(ids: string[]) {
    const deleted_count = await this.repository.batchDelete(ids);
    return { success: true, deleted_count };
  }
}
