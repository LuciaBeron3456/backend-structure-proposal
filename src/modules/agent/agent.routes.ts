import { Router } from "express";
import {
  getAgentFileController,
  getAgentMemoryController,
  getSystemPromptFilesController,
  listAgentFilesController,
  listAgentMemoryController,
  putAgentFileController,
  putAgentMemoryController,
  putSystemPromptFilesController,
} from "./agent.controller";
import {
  agentAdminStatus,
  agentHealth,
  agentProcess,
  agentRoot,
  agentShutdown,
  getAudioMode,
  getLanguage,
  getLocalWhisperStatus,
  getRunningConfig,
  getTranscriptionProviderType,
  getTranscriptionProviders,
  putAudioMode,
  putLanguage,
  putRunningConfig,
  putTranscriptionProvider,
  putTranscriptionProviderType,
} from "./agent.stub";

/**
 * MOCK: routes used by `workspaceApi` (`/agent/files`, `/agent/memory`, …).
 */
export const agentRouter = Router();

agentRouter.get("/", agentRoot);
agentRouter.get("/health", agentHealth);
agentRouter.post("/process", agentProcess);
agentRouter.get("/admin/status", agentAdminStatus);
agentRouter.post("/shutdown", agentShutdown);
agentRouter.post("/admin/shutdown", agentShutdown);
agentRouter.get("/running-config", getRunningConfig);
agentRouter.put("/running-config", putRunningConfig);
agentRouter.get("/language", getLanguage);
agentRouter.put("/language", putLanguage);
agentRouter.get("/audio-mode", getAudioMode);
agentRouter.put("/audio-mode", putAudioMode);
agentRouter.get("/transcription-providers", getTranscriptionProviders);
agentRouter.put("/transcription-provider", putTranscriptionProvider);
agentRouter.get("/transcription-provider-type", getTranscriptionProviderType);
agentRouter.put("/transcription-provider-type", putTranscriptionProviderType);
agentRouter.get("/local-whisper-status", getLocalWhisperStatus);

agentRouter.get("/files", listAgentFilesController);
agentRouter.get("/files/:filename", getAgentFileController);
agentRouter.put("/files/:filename", putAgentFileController);

agentRouter.get("/memory", listAgentMemoryController);
agentRouter.get("/memory/:date", getAgentMemoryController);
agentRouter.put("/memory/:date", putAgentMemoryController);

agentRouter.get("/system-prompt-files", getSystemPromptFilesController);
agentRouter.put("/system-prompt-files", putSystemPromptFilesController);
