import type { AgentSummary } from "./agents.types";

/**
 * MOCK DATA: agents (no DB). Mutable for create/delete/toggle.
 */
let mockAgents: AgentSummary[] = [
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

  async create(
    input: Pick<AgentSummary, "name" | "description" | "workspace_dir"> & { id: string },
  ): Promise<AgentSummary> {
    const row: AgentSummary = {
      id: input.id,
      name: input.name,
      description: input.description ?? "",
      workspace_dir: input.workspace_dir ?? `~/.copaw/workspaces/${input.id}`,
      enabled: true,
    };
    mockAgents.push(row);
    return row;
  }

  async update(id: string, patch: Partial<AgentSummary>): Promise<AgentSummary | null> {
    const i = mockAgents.findIndex((a) => a.id === id);
    if (i < 0) return null;
    mockAgents[i] = { ...mockAgents[i], ...patch, id };
    return mockAgents[i];
  }

  async delete(id: string): Promise<boolean> {
    const before = mockAgents.length;
    mockAgents = mockAgents.filter((a) => a.id !== id);
    return mockAgents.length < before;
  }

  async toggle(id: string, enabled: boolean): Promise<AgentSummary | null> {
    return this.update(id, { enabled });
  }
}
