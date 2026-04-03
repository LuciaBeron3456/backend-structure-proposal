import type { AgentSummary } from "./agents.types";
import { dbClient } from "../../infrastructure/db/client";

export class AgentsRepository {
  async list(): Promise<AgentSummary[]> {
    const rows = await dbClient.agent.findMany({
      select: { id: true, name: true, enabled: true },
      orderBy: { createdAt: "asc" }
    });
    return rows;
  }

  async getById(id: string): Promise<AgentSummary | null> {
    const row = await dbClient.agent.findUnique({
      where: { id },
      select: { id: true, name: true, enabled: true }
    });
    return row;
  }
}
