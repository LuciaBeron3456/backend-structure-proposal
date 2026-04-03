import type { AgentSummary } from "./agents.types";

/**
 * MOCK DATA: fixed agents (no DB). Shape matches frontend `AgentSummary`.
 */
const mockAgents: AgentSummary[] = [
  {
    id: "default",
    name: "Default Agent",
    description: "Mock default agent",
    workspace_dir: "~/.copaw/workspaces/default",
    enabled: true,
  },
  {
    id: "research",
    name: "Research Agent",
    description: "Mock research agent",
    workspace_dir: "~/.copaw/workspaces/research",
    enabled: true,
  },
];

export class AgentsRepository {
  async list(): Promise<AgentSummary[]> {
    return [...mockAgents];
  }

  async getById(id: string): Promise<AgentSummary | null> {
    return mockAgents.find((a) => a.id === id) ?? null;
  }
}
