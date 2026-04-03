import { ModelsRepository } from "./models.repository";
import { AppError } from "../../shared/errors/AppError";

export class ModelsService {
  constructor(private readonly repository = new ModelsRepository()) {}

  async listModels(filters?: { provider?: string; enabled?: boolean }) {
    const items = await this.repository.list();
    return items.filter((item) => {
      const providerOk = !filters?.provider || item.provider === filters.provider;
      const enabledOk =
        filters?.enabled === undefined || item.enabled === filters.enabled;
      return providerOk && enabledOk;
    });
  }

  async getModelById(id: string) {
    const item = await this.repository.getById(id);
    if (!item) {
      throw new AppError("Model not found", 404, "MODEL_NOT_FOUND", { id });
    }
    return item;
  }
}
