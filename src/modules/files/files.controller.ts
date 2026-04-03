import type { Request, Response } from "express";
import { agentMockStore } from "../agent/agent.store";

/** MOCK: GET /files/preview/:filename — serves bytes from chat upload preview store. */
export function getFilePreviewController(req: Request, res: Response) {
  const filename = req.params.filename;
  const buf = agentMockStore.getPreviewBlob(filename);
  if (!buf) {
    res.status(404).json({ detail: "Not found", mock: true });
    return;
  }
  res.setHeader("Content-Type", "application/octet-stream");
  res.status(200).send(buf);
}
