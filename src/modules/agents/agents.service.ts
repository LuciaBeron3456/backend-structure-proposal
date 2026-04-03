import { AgentsRepository } from "./agents.repository";
import { AppError } from "../../shared/errors/AppError";

export class AgentsService {
  constructor(private readonly repository = new AgentsRepository()) {}

  async listAgents(enabled?: boolean) {
    const items = await this.repository.list();
    if (enabled === undefined) return items;
    return items.filter((item) => item.enabled === enabled);
  }

  async getAgentById(id: string) {
    const item = await this.repository.getById(id);
    if (!item) {
      throw new AppError("Agent not found", 404, "AGENT_NOT_FOUND", { id });
    }
    return item;
  }
}
