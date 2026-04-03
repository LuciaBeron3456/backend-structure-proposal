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

  async createAgent(body: {
    name: string;
    description?: string;
    workspace_dir?: string;
    language?: string;
    skill_names?: string[];
  }) {
    const id = `agent-${Date.now()}`;
    const created = await this.repository.create({
      id,
      name: body.name,
      description: body.description,
      workspace_dir: body.workspace_dir,
    });
    return { id: created.id, workspace_dir: created.workspace_dir };
  }

  async updateAgent(id: string, profile: Record<string, unknown>) {
    const existing = await this.repository.getById(id);
    if (!existing) {
      throw new AppError("Agent not found", 404, "AGENT_NOT_FOUND", { id });
    }
    const next = await this.repository.update(id, {
      name: (profile.name as string) ?? existing.name,
      description: (profile.description as string) ?? existing.description,
      workspace_dir: (profile.workspace_dir as string) ?? existing.workspace_dir,
    });
    return this.getAgentProfile(next!.id);
  }

  async deleteAgent(id: string) {
    const ok = await this.repository.delete(id);
    if (!ok) {
      throw new AppError("Agent not found", 404, "AGENT_NOT_FOUND", { id });
    }
    return { success: true, agent_id: id };
  }

  async toggleAgent(id: string) {
    const item = await this.repository.getById(id);
    if (!item) {
      throw new AppError("Agent not found", 404, "AGENT_NOT_FOUND", { id });
    }
    const enabled = !item.enabled;
    await this.repository.toggle(id, enabled);
    return { success: true, agent_id: id, enabled };
  }

  async listAgentFiles(_agentId: string) {
    return [] as {
      filename: string;
      path: string;
      size: number;
      created_time: string;
      modified_time: string;
    }[];
  }

  async getAgentFile(_agentId: string, filename: string) {
    return { content: `# ${filename}\n(mock)` };
  }

  async putAgentFile(_agentId: string, filename: string) {
    return { written: true, filename };
  }

  async listAgentMemory(_agentId: string) {
    return this.listAgentFiles(_agentId);
  }
}
