import type { ModelSummary } from "./models.types";

/**
 * MOCK DATA: legacy `ModelSummary` rows for GET /models/:id (no DB).
 * Provider-style list for the UI comes from ModelsService.listProviders().
 */
const mockModels: ModelSummary[] = [
  { id: "mock-gpt-4o-mini", provider: "mock-openai", enabled: true },
  { id: "mock-claude", provider: "mock-anthropic", enabled: false },
];

export class ModelsRepository {
  async list(): Promise<ModelSummary[]> {
    return [...mockModels];
  }

  async getById(id: string): Promise<ModelSummary | null> {
    return mockModels.find((m) => m.id === id) ?? null;
  }
}
