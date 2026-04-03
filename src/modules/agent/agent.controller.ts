import type { Request, Response } from "express";
import { ok } from "../../shared/utils/response";
import { agentMockStore } from "./agent.store";

/** MOCK: GET /agent/files — list markdown files (workspace page). */
export function listAgentFilesController(_req: Request, res: Response) {
  return ok(res, agentMockStore.listFiles());
}

/** MOCK: GET /agent/files/:filename */
export function getAgentFileController(req: Request, res: Response) {
  const name = req.params.filename;
  const content = agentMockStore.getFile(name);
  if (content === undefined) {
    res.status(404).json({ detail: "File not found", mock: true });
    return;
  }
  return ok(res, { content });
}

/** MOCK: PUT /agent/files/:filename */
export function putAgentFileController(req: Request, res: Response) {
  const name = req.params.filename;
  const body = req.body as { content?: string };
  agentMockStore.setFile(name, body.content ?? "");
  return ok(res, { written: true, mock: true });
}

/** MOCK: GET /agent/memory */
export function listAgentMemoryController(_req: Request, res: Response) {
  return ok(res, agentMockStore.listMemory());
}

/** MOCK: GET /agent/memory/:date.md */
export function getAgentMemoryController(req: Request, res: Response) {
  const raw = req.params.date;
  const date = raw.replace(/\.md$/i, "");
  const content = agentMockStore.getMemory(date);
  if (content === undefined) {
    res.status(404).json({ detail: "Memory not found", mock: true });
    return;
  }
  return ok(res, { content });
}

/** MOCK: PUT /agent/memory/:date.md */
export function putAgentMemoryController(req: Request, res: Response) {
  const raw = req.params.date;
  const date = raw.replace(/\.md$/i, "");
  const body = req.body as { content?: string };
  agentMockStore.setMemory(date, body.content ?? "");
  return ok(res, { written: true, mock: true });
}

/** MOCK: GET /agent/system-prompt-files */
export function getSystemPromptFilesController(_req: Request, res: Response) {
  return ok(res, agentMockStore.getSystemPromptFiles());
}

/** MOCK: PUT /agent/system-prompt-files */
export function putSystemPromptFilesController(req: Request, res: Response) {
  const body = req.body as string[] | { files?: string[] };
  const files = Array.isArray(body) ? body : body.files ?? [];
  agentMockStore.setSystemPromptFiles(files);
  return ok(res, files);
}
