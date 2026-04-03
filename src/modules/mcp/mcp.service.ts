import { McpRepository } from "./mcp.repository";
import { AppError } from "../../shared/errors/AppError";

/** MOCK: data from in-memory McpRepository (no DB). */
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

  async createClient(body: { key: string; name: string; enabled?: boolean }) {
    const existing = await this.repository.getByKey(body.key);
    if (existing) {
      throw new AppError("MCP client exists", 409, "MCP_CLIENT_EXISTS", {
        key: body.key,
      });
    }
    return this.repository.create({
      key: body.key,
      name: body.name,
      enabled: body.enabled ?? true,
    });
  }

  async updateClient(key: string, body: { name?: string; enabled?: boolean }) {
    const existing = await this.repository.getByKey(key);
    if (!existing) {
      throw new AppError("MCP client not found", 404, "MCP_CLIENT_NOT_FOUND", {
        key,
      });
    }
    return this.repository.upsert({
      key,
      name: body.name ?? existing.name,
      enabled: body.enabled ?? existing.enabled,
    });
  }

  async deleteClient(key: string) {
    const ok = await this.repository.delete(key);
    if (!ok) {
      throw new AppError("MCP client not found", 404, "MCP_CLIENT_NOT_FOUND", {
        key,
      });
    }
    return { message: "deleted" };
  }

  async toggleClient(key: string) {
    const next = await this.repository.toggle(key);
    if (!next) {
      throw new AppError("MCP client not found", 404, "MCP_CLIENT_NOT_FOUND", {
        key,
      });
    }
    return next;
  }
}
