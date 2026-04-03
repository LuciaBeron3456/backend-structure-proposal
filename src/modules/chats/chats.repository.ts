import type { ChatSpec, ChatSummary } from "./chats.types";

/**
 * MOCK: in-memory chats (no DB). `ChatSummary` kept for legacy list shape;
 * list API returns full `ChatSpec[]` for the frontend session list.
 */
let mockChats: ChatSpec[] = [
  {
    id: "chat-mock-1",
    session_id: "console:default",
    user_id: "default",
    channel: "console",
    name: "Mock chat",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: "idle",
  },
  {
    id: "chat-mock-2",
    session_id: "console:default",
    user_id: "default",
    channel: "console",
    name: "Another mock chat",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: "idle",
  },
];

export class ChatsRepository {
  async list(): Promise<ChatSpec[]> {
    return [...mockChats];
  }

  async getById(id: string): Promise<ChatSpec | null> {
    return mockChats.find((c) => c.id === id) ?? null;
  }

  async create(spec: Partial<ChatSpec>): Promise<ChatSpec> {
    const id = spec.id ?? `chat-${Date.now()}`;
    const row: ChatSpec = {
      id,
      session_id: spec.session_id ?? "console:default",
      user_id: spec.user_id ?? "default",
      channel: spec.channel ?? "console",
      name: spec.name ?? "New chat",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "idle",
      meta: spec.meta,
    };
    mockChats = [...mockChats, row];
    return row;
  }

  async update(id: string, patch: Partial<ChatSpec>): Promise<ChatSpec | null> {
    const idx = mockChats.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    const next = {
      ...mockChats[idx],
      ...patch,
      updated_at: new Date().toISOString(),
    };
    mockChats = mockChats.map((c, i) => (i === idx ? next : c));
    return next;
  }

  async delete(id: string): Promise<boolean> {
    const before = mockChats.length;
    mockChats = mockChats.filter((c) => c.id !== id);
    return mockChats.length < before;
  }

  async batchDelete(ids: string[]): Promise<number> {
    const set = new Set(ids);
    const before = mockChats.length;
    mockChats = mockChats.filter((c) => !set.has(c.id));
    return before - mockChats.length;
  }
}

/** Legacy title-only summary for internal use */
export function toSummary(c: ChatSpec): ChatSummary {
  return { id: c.id, title: c.name ?? c.id };
}
