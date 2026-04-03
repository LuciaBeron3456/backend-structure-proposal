export interface ModelSummary {
  id: string;
  provider: string;
  enabled: boolean;
}

export interface ProviderModelInfo {
  id: string;
  name: string;
  supports_multimodal: boolean | null;
  supports_image: boolean | null;
  supports_video: boolean | null;
}

export interface ProviderInfo {
  id: string;
  name: string;
  api_key_prefix: string;
  chat_model: string;
  models: ProviderModelInfo[];
  extra_models: ProviderModelInfo[];
  is_custom: boolean;
  is_local: boolean;
  support_model_discovery: boolean;
  support_connection_check: boolean;
  freeze_url: boolean;
  require_api_key: boolean;
  api_key: string;
  base_url: string;
  generate_kwargs: Record<string, unknown>;
}

export interface ModelSlotConfig {
  provider_id: string;
  model: string;
}

export interface ActiveModelsInfo {
  active_llm?: ModelSlotConfig;
}
