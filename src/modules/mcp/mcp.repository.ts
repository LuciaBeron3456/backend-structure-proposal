import type { McpClient } from "./mcp.types";

/**
 * MOCK DATA: static MCP clients (no DB).
 */
const mockMcpClients: McpClient[] = [
  { key: "filesystem", name: "Mock Filesystem MCP", enabled: true },
  { key: "fetch", name: "Mock Fetch MCP", enabled: false },
];

export class McpRepository {
  async list(): Promise<McpClient[]> {
    return [...mockMcpClients];
  }

  async getByKey(key: string): Promise<McpClient | null> {
    return mockMcpClients.find((c) => c.key === key) ?? null;
  }
}
