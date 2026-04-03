import { AgentsRepository } from "./agents.repository";
import { AppError } from "../../shared/errors/AppError";

/** MOCK: in-memory agents (no DB). */
export class AgentsService {
  constructor(private readonly repository = new AgentsRepository()) {}

  async listAgents(enabled?: boolean) {
    const items = await this.repository.list();
    if (enabled === undefined) return items;
    return items.filter((item) => item.enabled === enabled);
  }

  /** MOCK: returns a minimal `AgentProfileConfig`-like object for the frontend. */
  async getAgentProfile(id: string) {
    const item = await this.repository.getById(id);
    if (!item) {
      throw new AppError("Agent not found", 404, "AGENT_NOT_FOUND", { id });
    }
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      workspace_dir: item.workspace_dir,
      channels: {},
      mcp: {},
      heartbeat: {},
      running: {},
      llm_routing: {},
      system_prompt_files: [],
      tools: {},
      security: {},
    };
  }
}
