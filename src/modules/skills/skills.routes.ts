import { Router } from "express";
import multer from "multer";
import { getSkillByNameController, listSkillsController } from "./skills.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  listSkillsHeadersSchema,
  listSkillsQuerySchema,
  skillParamsSchema,
} from "./skills.schemas";
import { ok } from "../../shared/utils/response";

const upload = multer({ storage: multer.memoryStorage() });

function hubTask(taskId: string) {
  return {
    task_id: taskId,
    bundle_url: "",
    version: "",
    enable: false,
    overwrite: false,
    status: "completed" as const,
    error: null as string | null,
    result: { installed: true, name: "mock", enabled: true, source_url: "" },
    created_at: Date.now(),
  };
}

/**
 * MOCK: ordered routes for `skillApi` — static paths before `/:name`.
 */
export const skillsRouter = Router();

skillsRouter.get(
  "/workspaces",
  asyncHandler(async (_req, res) => {
    return ok(res, [
      {
        agent_id: "default",
        agent_name: "Default Agent",
        workspace_dir: "~/.copaw/workspaces/default",
        skills: [] as unknown[],
      },
    ]);
  })
);

skillsRouter.get(
  "/pool",
  asyncHandler(async (_req, res) => {
    return ok(res, [
      {
        name: "mock-pool-skill",
        description: "Mock pool skill",
        version_text: "0.0.0",
        content: "",
        source: "mock",
        protected: false,
        sync_status: "synced",
      },
    ]);
  })
);

skillsRouter.get(
  "/hub/search",
  asyncHandler(async (req, res) => {
    const q = String(req.query.q ?? "");
    return ok(res, [
      {
        slug: "mock",
        name: `Result for ${q}`,
        description: "Mock hub skill",
        version: "1.0.0",
        source_url: "",
      },
    ]);
  })
);

skillsRouter.post(
  "/pool/create",
  asyncHandler(async (req, res) => {
    const b = req.body as { name?: string };
    return ok(res, { created: true, name: b?.name ?? "mock" });
  })
);

skillsRouter.put(
  "/pool/save",
  asyncHandler(async (req, res) => {
    const b = req.body as { name?: string };
    return ok(res, {
      success: true,
      mode: "noop" as const,
      name: b?.name ?? "mock",
    });
  })
);

skillsRouter.post(
  "/hub/install/start",
  asyncHandler(async (_req, res) => {
    return ok(res, hubTask("mock-hub-task"));
  })
);

skillsRouter.post(
  "/pool/import",
  asyncHandler(async (req, res) => {
    const b = req.body as { bundle_url?: string };
    return ok(res, {
      installed: true,
      name: "imported-mock",
      enabled: true,
      source_url: b?.bundle_url ?? "",
    });
  })
);

skillsRouter.get(
  "/hub/install/status/:taskId",
  asyncHandler(async (req, res) => {
    const taskId = String(req.params.taskId);
    return ok(res, hubTask(taskId));
  })
);

skillsRouter.post(
  "/hub/install/cancel/:taskId",
  asyncHandler(async (req, res) => {
    const taskId = String(req.params.taskId);
    return ok(res, { task_id: taskId, status: "cancelled" });
  })
);

skillsRouter.get(
  "/pool/builtin-sources",
  asyncHandler(async (_req, res) => {
    return ok(res, [
      {
        name: "builtin-mock",
        description: "Mock builtin",
        version_text: "1.0.0",
        status: "missing",
      },
    ]);
  })
);

skillsRouter.post(
  "/pool/import-builtin",
  asyncHandler(async (_req, res) => {
    return ok(res, {
      imported: [] as string[],
      updated: [] as string[],
      unchanged: [] as string[],
      conflicts: [] as unknown[],
    });
  })
);

skillsRouter.post(
  "/pool/upload",
  asyncHandler(async (_req, res) => {
    return ok(res, { success: true, name: "mock" });
  })
);

skillsRouter.post(
  "/pool/download",
  asyncHandler(async (_req, res) => {
    return ok(res, { downloaded: [] as unknown[], conflicts: [] as unknown[] });
  })
);

skillsRouter.post(
  "/pool/upload-zip",
  upload.single("file"),
  asyncHandler(async (_req, res) => {
    return ok(res, { imported: [] as string[], count: 0, conflicts: [] as unknown[] });
  })
);

skillsRouter.post(
  "/upload",
  upload.single("file"),
  asyncHandler(async (_req, res) => {
    return ok(res, {
      imported: [] as string[],
      count: 0,
      enabled: false,
      conflicts: [] as unknown[],
    });
  })
);

skillsRouter.post(
  "/ai/optimize/stream",
  asyncHandler(async (_req, res) => {
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.write(`data: ${JSON.stringify({ text: "", done: true })}\n\n`);
    return res.end();
  })
);

skillsRouter.post(
  "/pool/:skillName/update-builtin",
  asyncHandler(async (_req, res) => {
    return ok(res, { mock: true });
  })
);

skillsRouter.delete(
  "/pool/:skillName",
  asyncHandler(async (_req, res) => {
    return ok(res, { deleted: true });
  })
);

skillsRouter.get(
  "/pool/:skillName/config",
  asyncHandler(async (_req, res) => {
    return ok(res, { config: {} });
  })
);

skillsRouter.put(
  "/pool/:skillName/config",
  asyncHandler(async (req, res) => {
    return ok(res, { updated: true, ...(req.body as object) });
  })
);

skillsRouter.delete(
  "/pool/:skillName/config",
  asyncHandler(async (_req, res) => {
    return ok(res, { cleared: true });
  })
);

skillsRouter.get(
  "/",
  validate({ query: listSkillsQuerySchema, headers: listSkillsHeadersSchema }),
  asyncHandler(listSkillsController)
);

skillsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const b = req.body as { name?: string };
    return ok(res, { created: true, name: b?.name ?? "mock" });
  })
);

skillsRouter.put(
  "/save",
  asyncHandler(async (req, res) => {
    const b = req.body as { name?: string };
    return ok(res, {
      success: true,
      mode: "noop" as const,
      name: b?.name ?? "mock",
    });
  })
);

skillsRouter.post(
  "/batch-enable",
  asyncHandler(async (_req, res) => {
    return res.status(204).send();
  })
);

skillsRouter.post(
  "/:name/enable",
  asyncHandler(async (_req, res) => {
    return res.status(204).send();
  })
);

skillsRouter.post(
  "/:name/disable",
  asyncHandler(async (_req, res) => {
    return res.status(204).send();
  })
);

skillsRouter.delete(
  "/:name",
  asyncHandler(async (_req, res) => {
    return ok(res, { deleted: true });
  })
);

skillsRouter.put(
  "/:name/channels",
  asyncHandler(async (req, res) => {
    const body = req.body as string[] | unknown;
    const channels = Array.isArray(body) ? body : [];
    return ok(res, { updated: true, channels });
  })
);

skillsRouter.get(
  "/:name/config",
  asyncHandler(async (_req, res) => {
    return ok(res, { config: {} });
  })
);

skillsRouter.put(
  "/:name/config",
  asyncHandler(async (_req, res) => {
    return ok(res, { updated: true });
  })
);

skillsRouter.delete(
  "/:name/config",
  asyncHandler(async (_req, res) => {
    return ok(res, { cleared: true });
  })
);

skillsRouter.get(
  "/:name",
  validate({ params: skillParamsSchema }),
  asyncHandler(getSkillByNameController)
);
