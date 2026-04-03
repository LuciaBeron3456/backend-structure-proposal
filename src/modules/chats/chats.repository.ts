import type { ChatSummary } from "./chats.types";
import { dbClient } from "../../infrastructure/db/client";

export class ChatsRepository {
  async list(): Promise<ChatSummary[]> {
    return dbClient.chat.findMany({
      select: { id: true, title: true },
      orderBy: { createdAt: "asc" }
    });
  }

  async getById(id: string): Promise<ChatSummary | null> {
    return dbClient.chat.findUnique({
      where: { id },
      select: { id: true, title: true }
    });
  }
}
