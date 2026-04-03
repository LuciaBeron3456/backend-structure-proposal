import type { ChatSummary } from "./chats.types";

/**
 * MOCK DATA: in-memory chat list (no DB). Mutated only in this process.
 */
let mockChats: ChatSummary[] = [
  { id: "chat-mock-1", title: "Mock chat" },
  { id: "chat-mock-2", title: "Another mock chat" },
];

export class ChatsRepository {
  async list(): Promise<ChatSummary[]> {
    return [...mockChats];
  }

  async getById(id: string): Promise<ChatSummary | null> {
    return mockChats.find((c) => c.id === id) ?? null;
  }
}
