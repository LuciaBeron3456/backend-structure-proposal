export interface ChannelSummary {
  id: string;
  type: "console" | "discord" | "telegram" | "slack";
  enabled: boolean;
}

export interface CreateChannelInput {
  id: string;
  type: "console" | "discord" | "telegram" | "slack";
  enabled?: boolean;
}
