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

/**
 * MOCK: routes used by `workspaceApi` (`/agent/files`, `/agent/memory`, …).
 */
export const agentRouter = Router();

agentRouter.get("/files", listAgentFilesController);
agentRouter.get("/files/:filename", getAgentFileController);
agentRouter.put("/files/:filename", putAgentFileController);

agentRouter.get("/memory", listAgentMemoryController);
agentRouter.get("/memory/:date", getAgentMemoryController);
agentRouter.put("/memory/:date", putAgentMemoryController);

agentRouter.get("/system-prompt-files", getSystemPromptFilesController);
agentRouter.put("/system-prompt-files", putSystemPromptFilesController);
