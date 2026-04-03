import type { McpClient } from "./mcp.types";
import { dbClient } from "../../infrastructure/db/client";

export class McpRepository {
  async list(): Promise<McpClient[]> {
    return dbClient.mcpClient.findMany({
      select: { key: true, name: true, enabled: true },
      orderBy: { createdAt: "asc" }
    });
  }

  async getByKey(key: string): Promise<McpClient | null> {
    return dbClient.mcpClient.findUnique({
      where: { key },
      select: { key: true, name: true, enabled: true }
    });
  }
}
