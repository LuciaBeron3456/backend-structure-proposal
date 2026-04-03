export interface ChatSummary {
  id: string;
  title: string;
}

/** MOCK: aligns with frontend `ChatSpec` for session list. */
export interface ChatSpec {
  id: string;
  session_id: string;
  user_id: string;
  channel: string;
  name?: string;
  created_at: string | null;
  updated_at: string | null;
  meta?: Record<string, unknown>;
  status?: "idle" | "running";
}
