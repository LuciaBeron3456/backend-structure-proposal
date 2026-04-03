import type { ModelSummary } from "./models.types";
import { dbClient } from "../../infrastructure/db/client";

export class ModelsRepository {
  async list(): Promise<ModelSummary[]> {
    return dbClient.model.findMany({
      select: { id: true, provider: true, enabled: true },
      orderBy: { createdAt: "asc" }
    });
  }

  async getById(id: string): Promise<ModelSummary | null> {
    return dbClient.model.findUnique({
      where: { id },
      select: { id: true, provider: true, enabled: true }
    });
  }
}
