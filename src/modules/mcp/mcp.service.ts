import { McpRepository } from "./mcp.repository";
import { AppError } from "../../shared/errors/AppError";

export class McpService {
  constructor(private readonly repository = new McpRepository()) {}

  async listClients(enabled?: boolean) {
    const items = await this.repository.list();
    if (enabled === undefined) return items;
    return items.filter((item) => item.enabled === enabled);
  }

  async getClientByKey(key: string) {
    const item = await this.repository.getByKey(key);
    if (!item) {
      throw new AppError("MCP client not found", 404, "MCP_CLIENT_NOT_FOUND", {
        key
      });
    }
    return item;
  }
}
