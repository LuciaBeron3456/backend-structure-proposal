import { ChatsRepository } from "./chats.repository";
import { AppError } from "../../shared/errors/AppError";

export class ChatsService {
  constructor(private readonly repository = new ChatsRepository()) {}

  async listChats(query?: string) {
    const items = await this.repository.list();
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }

  async getChatById(id: string) {
    const item = await this.repository.getById(id);
    if (!item) {
      throw new AppError("Chat not found", 404, "CHAT_NOT_FOUND", { id });
    }
    return item;
  }
}
