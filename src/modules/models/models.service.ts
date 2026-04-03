import { ModelsRepository } from "./models.repository";
import { AppError } from "../../shared/errors/AppError";
import type {
  ActiveModelsInfo,
  ModelSlotConfig,
  ProviderInfo,
  ProviderModelInfo,
} from "./models.types";

/**
 * MOCK: all model/provider state is in-memory (see mockProviders, activeGlobalLlm).
 * ModelsRepository provides legacy ModelSummary rows only — no database.
 */
const MOCK_PROVIDER_ID = "mock-openai";
const MOCK_MODEL_ID = "mock-gpt-4o-mini";

function cloneProvider(p: ProviderInfo): ProviderInfo {
  return JSON.parse(JSON.stringify(p)) as ProviderInfo;
}

let mockProviders: ProviderInfo[] = [
  {
    id: MOCK_PROVIDER_ID,
    name: "Mock OpenAI",
    api_key_prefix: "sk-",
    chat_model: MOCK_MODEL_ID,
    models: [
      {
        id: MOCK_MODEL_ID,
        name: "Mock GPT-4o Mini",
        supports_multimodal: true,
        supports_image: true,
        supports_video: false,
      },
    ],
    extra_models: [],
    is_custom: false,
    is_local: false,
    support_model_discovery: false,
    support_connection_check: false,
    freeze_url: false,
    require_api_key: false,
    api_key: "",
    base_url: "https://api.openai.com/v1",
    generate_kwargs: {},
  },
];

/** MOCK: user-created providers (mutable). */
let customProviders: ProviderInfo[] = [];

let activeGlobalLlm: ModelSlotConfig = {
  provider_id: MOCK_PROVIDER_ID,
  model: MOCK_MODEL_ID,
};

const activeByAgent = new Map<string, ModelSlotConfig>();

export class ModelsService {
  constructor(private readonly repository = new ModelsRepository()) {}

  private allProviders(): ProviderInfo[] {
    return [...mockProviders.map(cloneProvider), ...customProviders.map(cloneProvider)];
  }

  private findProvider(id: string): ProviderInfo | undefined {
    return this.allProviders().find((p) => p.id === id);
  }

  async listProviders(): Promise<ProviderInfo[]> {
    return this.allProviders();
  }

  async configureProvider(
    id: string,
    body: {
      api_key?: string;
      base_url?: string;
      chat_model?: string;
      generate_kwargs?: Record<string, unknown>;
    },
  ): Promise<ProviderInfo> {
    const p = this.findProvider(id);
    if (!p) {
      throw new AppError("Provider not found", 404, "PROVIDER_NOT_FOUND", { id });
    }
    const next = cloneProvider(p);
    if (body.api_key !== undefined) next.api_key = body.api_key;
    if (body.base_url !== undefined) next.base_url = body.base_url;
    if (body.chat_model !== undefined) next.chat_model = body.chat_model;
    if (body.generate_kwargs !== undefined) next.generate_kwargs = body.generate_kwargs;
    this.replaceProvider(next);
    return next;
  }

  private replaceProvider(updated: ProviderInfo) {
    const i = customProviders.findIndex((p) => p.id === updated.id);
    if (i >= 0) {
      customProviders[i] = updated;
      return;
    }
    const j = mockProviders.findIndex((p) => p.id === updated.id);
    if (j >= 0) {
      mockProviders[j] = updated;
      return;
    }
  }

  async createCustomProvider(body: {
    id: string;
    name: string;
    default_base_url?: string;
    api_key_prefix?: string;
    chat_model?: string;
    models?: Array<{
      id: string;
      name: string;
      supports_multimodal?: boolean | null;
      supports_image?: boolean | null;
      supports_video?: boolean | null;
    }>;
  }): Promise<ProviderInfo> {
    if (this.findProvider(body.id)) {
      throw new AppError("Provider already exists", 409, "PROVIDER_EXISTS", {
        id: body.id,
      });
    }
    const toModelRow = (m: {
      id: string;
      name: string;
      supports_multimodal?: boolean | null;
      supports_image?: boolean | null;
      supports_video?: boolean | null;
    }): ProviderModelInfo => ({
      id: m.id,
      name: m.name,
      supports_multimodal: m.supports_multimodal ?? false,
      supports_image: m.supports_image ?? false,
      supports_video: m.supports_video ?? false,
    });
    const p: ProviderInfo = {
      id: body.id,
      name: body.name,
      api_key_prefix: body.api_key_prefix ?? "key-",
      chat_model: body.chat_model ?? "default",
      models: body.models?.length
        ? body.models.map(toModelRow)
        : [
            {
              id: "default",
              name: "default",
              supports_multimodal: false,
              supports_image: false,
              supports_video: false,
            },
          ],
      extra_models: [],
      is_custom: true,
      is_local: false,
      support_model_discovery: true,
      support_connection_check: true,
      freeze_url: false,
      require_api_key: true,
      api_key: "",
      base_url: body.default_base_url ?? "https://example.com/v1",
      generate_kwargs: {},
    };
    customProviders.push(p);
    return cloneProvider(p);
  }

  async deleteCustomProvider(id: string): Promise<ProviderInfo[]> {
    const before = customProviders.length;
    customProviders = customProviders.filter((p) => p.id !== id);
    if (customProviders.length === before) {
      throw new AppError("Custom provider not found", 404, "PROVIDER_NOT_FOUND", {
        id,
      });
    }
    return this.listProviders();
  }

  async addModel(
    providerId: string,
    body: { id: string; name: string },
  ): Promise<ProviderInfo> {
    const p = this.findProvider(providerId);
    if (!p) {
      throw new AppError("Provider not found", 404, "PROVIDER_NOT_FOUND", {
        id: providerId,
      });
    }
    const next = cloneProvider(p);
    const row: ProviderModelInfo = {
      id: body.id,
      name: body.name,
      supports_multimodal: false,
      supports_image: false,
      supports_video: false,
    };
    if (next.is_custom) {
      next.models = [...next.models, row];
    } else {
      next.extra_models = [...next.extra_models, row];
    }
    this.replaceProvider(next);
    return next;
  }

  async removeModel(providerId: string, modelId: string): Promise<ProviderInfo> {
    const p = this.findProvider(providerId);
    if (!p) {
      throw new AppError("Provider not found", 404, "PROVIDER_NOT_FOUND", {
        id: providerId,
      });
    }
    const next = cloneProvider(p);
    next.models = next.models.filter((m) => m.id !== modelId);
    next.extra_models = next.extra_models.filter((m) => m.id !== modelId);
    this.replaceProvider(next);
    return next;
  }

  async testProviderConnection(_providerId: string) {
    return { success: true, message: "Mock connection OK" };
  }

  async testModelConnection(_providerId: string, _body: { model_id: string }) {
    return { success: true, message: "Mock model OK" };
  }

  async discoverModels(providerId: string) {
    const p = this.findProvider(providerId);
    return {
      success: true,
      message: "Mock discover",
      models: (p?.models ?? []).map((m) => ({
        id: m.id,
        name: m.name,
        supports_multimodal: m.supports_multimodal,
        supports_image: m.supports_image,
        supports_video: m.supports_video,
      })),
      added_count: 0,
    };
  }

  async probeMultimodal(_providerId: string, _modelId: string) {
    return {
      supports_image: true,
      supports_video: false,
      supports_multimodal: true,
      image_message: "mock",
      video_message: "mock",
    };
  }

  async getActiveModels(scope?: "effective" | "global" | "agent", agentId?: string): Promise<ActiveModelsInfo> {
    if (scope === "global") {
      return { active_llm: activeGlobalLlm };
    }
    if (scope === "agent") {
      return { active_llm: agentId ? activeByAgent.get(agentId) : undefined };
    }
    if (agentId && activeByAgent.has(agentId)) {
      return { active_llm: activeByAgent.get(agentId) };
    }
    return { active_llm: activeGlobalLlm };
  }

  async setActiveModels(input: {
    provider_id: string;
    model: string;
    scope: "global" | "agent";
    agent_id?: string;
  }): Promise<ActiveModelsInfo> {
    const slot: ModelSlotConfig = {
      provider_id: input.provider_id,
      model: input.model,
    };
    if (input.scope === "agent" && input.agent_id) {
      activeByAgent.set(input.agent_id, slot);
      return { active_llm: slot };
    }
    activeGlobalLlm = slot;
    return { active_llm: slot };
  }

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
