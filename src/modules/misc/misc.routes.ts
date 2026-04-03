import { Router } from "express";
import { ok } from "../../shared/utils/response";
import { asyncHandler } from "../../shared/utils/asyncHandler";

/** MOCK: endpoints from `ollamaModelApi`, `localModelApi`, `toolsApi`, `cronjobApi`, `envApi`, `tokenUsageApi`. */
export const miscRouter = Router();

/* ── Root (`rootApi.readRoot`) ─────────────────────────────────── */
miscRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    return ok(res, { mock: true, service: "mentonex-mock" });
  })
);

/* ── Ollama models ─────────────────────────────────────────────── */
miscRouter.get("/ollama-models", (_req, res) => {
  return ok(res, [] as unknown[]);
});

miscRouter.post("/ollama-models/download", (_req, res) => {
  return ok(res, {
    task_id: "mock-ollama-task",
    status: "completed",
    name: "mock",
    error: null,
    result: { name: "mock", size: 0 },
  });
});

miscRouter.get("/ollama-models/download-status", (_req, res) => {
  return ok(res, []);
});

miscRouter.delete("/ollama-models/download/:taskId", (req, res) => {
  return ok(res, { status: "cancelled", task_id: req.params.taskId });
});

miscRouter.delete("/ollama-models/:name", (req, res) => {
  return ok(res, { status: "ok", name: req.params.name });
});

/* ── Local (GGUF) models ───────────────────────────────────────── */
miscRouter.get("/local-models", (_req, res) => {
  return ok(res, []);
});

miscRouter.post("/local-models/download", (_req, res) => {
  return ok(res, {
    task_id: "mock-local-task",
    status: "completed",
    repo_id: "mock",
    filename: null,
    backend: "mock",
    source: "mock",
    error: null,
    result: null,
  });
});

miscRouter.get("/local-models/download-status", (_req, res) => {
  return ok(res, []);
});

miscRouter.post("/local-models/cancel-download/:taskId", (req, res) => {
  return ok(res, { status: "cancelled", task_id: req.params.taskId });
});

miscRouter.delete("/local-models/:modelId", (req, res) => {
  return ok(res, { status: "ok", model_id: req.params.modelId });
});

/* ── Tools ─────────────────────────────────────────────────────── */
const mockTool = (name: string) => ({
  name,
  enabled: true,
  description: "Mock tool",
  async_execution: false,
});

miscRouter.get("/tools", (_req, res) => {
  return ok(res, [mockTool("bash"), mockTool("read_file")]);
});

miscRouter.patch("/tools/:toolName/toggle", (req, res) => {
  return ok(res, mockTool(req.params.toolName));
});

miscRouter.patch("/tools/:toolName/async-execution", (req, res) => {
  const body = req.body as { async_execution?: boolean };
  return ok(res, {
    ...mockTool(req.params.toolName),
    async_execution: Boolean(body?.async_execution),
  });
});

/* ── Cron ──────────────────────────────────────────────────────── */
const mockCronJobs: unknown[] = [];

miscRouter.get("/cron/jobs", (_req, res) => {
  return ok(res, mockCronJobs);
});

miscRouter.post("/cron/jobs", (req, res) => {
  return ok(res, req.body);
});

miscRouter.get("/cron/jobs/:jobId", (req, res) => {
  return ok(res, { id: req.params.jobId, mock: true });
});

miscRouter.put("/cron/jobs/:jobId", (req, res) => {
  return ok(res, req.body);
});

miscRouter.delete("/cron/jobs/:jobId", (_req, res) => {
  return res.status(204).send();
});

miscRouter.post("/cron/jobs/:jobId/pause", (_req, res) => {
  return res.status(204).send();
});

miscRouter.post("/cron/jobs/:jobId/resume", (_req, res) => {
  return res.status(204).send();
});

miscRouter.post("/cron/jobs/:jobId/run", (_req, res) => {
  return res.status(204).send();
});

miscRouter.get("/cron/jobs/:jobId/state", (_req, res) => {
  return ok(res, { mock: true });
});

/* ── Env vars ──────────────────────────────────────────────────── */
let mockEnvs: { key: string; value: string }[] = [];

miscRouter.get("/envs", (_req, res) => {
  return ok(res, mockEnvs);
});

miscRouter.post("/envs", (req, res) => {
  mockEnvs = (req.body as { key: string; value: string }[]) ?? [];
  return ok(res, mockEnvs);
});

miscRouter.put("/envs/:key", (req, res) => {
  const b = req.body as { value?: string };
  const idx = mockEnvs.findIndex((e) => e.key === req.params.key);
  if (idx >= 0) mockEnvs[idx] = { key: req.params.key, value: b?.value ?? "" };
  else mockEnvs.push({ key: req.params.key, value: b?.value ?? "" });
  return ok(res, mockEnvs);
});

/* ── Token usage ───────────────────────────────────────────────── */
miscRouter.get("/token-usage", (_req, res) => {
  return ok(res, {
    total_prompt_tokens: 0,
    total_completion_tokens: 0,
    total_calls: 0,
    by_model: {},
    by_date: {},
  });
});
