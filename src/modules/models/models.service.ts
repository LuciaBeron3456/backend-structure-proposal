import { ModelsRepository } from "./models.repository";
import { AppError } from "../../shared/errors/AppError";
import type {
  ActiveModelsInfo,
  ModelSlotConfig,
  ProviderInfo,
} from "./models.types";

/**
 * MOCK: all model/provider state is in-memory (see mockProviders, activeGlobalLlm).
 * ModelsRepository provides legacy ModelSummary rows only — no database.
 */
const MOCK_PROVIDER_ID = "mock-openai";
const MOCK_MODEL_ID = "mock-gpt-4o-mini";

const mockProviders: ProviderInfo[] = [
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

let activeGlobalLlm: ModelSlotConfig = {
  provider_id: MOCK_PROVIDER_ID,
  model: MOCK_MODEL_ID,
};

const activeByAgent = new Map<string, ModelSlotConfig>();

export class ModelsService {
  constructor(private readonly repository = new ModelsRepository()) {}

  async listProviders(): Promise<ProviderInfo[]> {
    return mockProviders;
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
