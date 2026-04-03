import type { AgentSummary } from "./agents.types";

/**
 * MOCK DATA: fixed agents only (no DB).
 */
const mockAgents: AgentSummary[] = [
  { id: "default", name: "Default Agent", enabled: true },
  { id: "research", name: "Research Agent", enabled: true },
];

export class AgentsRepository {
  async list(): Promise<AgentSummary[]> {
    return [...mockAgents];
  }

  async getById(id: string): Promise<AgentSummary | null> {
    return mockAgents.find((a) => a.id === id) ?? null;
  }
}
