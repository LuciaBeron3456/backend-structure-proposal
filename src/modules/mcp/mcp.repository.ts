import type { McpClient } from "./mcp.types";

const initial: McpClient[] = [
  { key: "filesystem", name: "Mock Filesystem MCP", enabled: true },
  { key: "fetch", name: "Mock Fetch MCP", enabled: false },
];

/** MOCK: mutable in-memory clients. */
let mockMcpClients: McpClient[] = [...initial];

export class McpRepository {
  async list(): Promise<McpClient[]> {
    return [...mockMcpClients];
  }

  async getByKey(key: string): Promise<McpClient | null> {
    return mockMcpClients.find((c) => c.key === key) ?? null;
  }

  async create(client: McpClient): Promise<McpClient> {
    mockMcpClients.push(client);
    return client;
  }

  async upsert(client: McpClient): Promise<McpClient> {
    const i = mockMcpClients.findIndex((c) => c.key === client.key);
    if (i >= 0) mockMcpClients[i] = client;
    else mockMcpClients.push(client);
    return client;
  }

  async delete(key: string): Promise<boolean> {
    const before = mockMcpClients.length;
    mockMcpClients = mockMcpClients.filter((c) => c.key !== key);
    return mockMcpClients.length < before;
  }

  async toggle(key: string): Promise<McpClient | null> {
    const c = await this.getByKey(key);
    if (!c) return null;
    c.enabled = !c.enabled;
    return c;
  }
}
