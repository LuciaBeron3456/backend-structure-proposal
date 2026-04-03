import { Router } from "express";
import { ok } from "../../shared/utils/response";

const emptyToolGuard = {
  enabled: false,
  guarded_tools: null as string[] | null,
  denied_tools: [] as string[],
  custom_rules: [] as unknown[],
  disabled_rules: [] as string[],
};

const emptyBuiltinRule = {
  id: "mock-rule",
  tools: [] as string[],
  params: [] as string[],
  category: "general",
  severity: "info",
  patterns: [] as string[],
  exclude_patterns: [] as string[],
  description: "",
  remediation: "",
};

/** MOCK: shapes match `frontend/src/api/modules/security.ts`. */
export const securityRouter = Router();

securityRouter.get("/tool-guard", (_req, res) => {
  return ok(res, emptyToolGuard);
});

securityRouter.put("/tool-guard", (req, res) => {
  return ok(res, { ...emptyToolGuard, ...(req.body as object) });
});

securityRouter.get("/tool-guard/builtin-rules", (_req, res) => {
  return ok(res, [emptyBuiltinRule]);
});

securityRouter.get("/file-guard", (_req, res) => {
  return ok(res, { enabled: false, paths: [] as string[] });
});

securityRouter.put("/file-guard", (req, res) => {
  const b = req.body as { enabled?: boolean; paths?: string[] };
  return ok(res, {
    enabled: b?.enabled ?? false,
    paths: b?.paths ?? [],
  });
});

const emptyScanner = {
  mode: "off" as const,
  timeout: 30,
  whitelist: [] as { skill_name: string; content_hash: string; added_at: string }[],
};

securityRouter.get("/skill-scanner", (_req, res) => {
  return ok(res, emptyScanner);
});

securityRouter.put("/skill-scanner", (req, res) => {
  return ok(res, { ...emptyScanner, ...(req.body as object) });
});

securityRouter.get("/skill-scanner/blocked-history", (_req, res) => {
  return ok(res, []);
});

securityRouter.delete("/skill-scanner/blocked-history", (_req, res) => {
  return ok(res, { cleared: true });
});

securityRouter.delete("/skill-scanner/blocked-history/:index", (_req, res) => {
  return ok(res, { removed: true });
});

securityRouter.post("/skill-scanner/whitelist", (req, res) => {
  const b = req.body as { skill_name?: string };
  return ok(res, { whitelisted: true, skill_name: b?.skill_name ?? "" });
});

securityRouter.delete("/skill-scanner/whitelist/:skillName", (req, res) => {
  return ok(res, { removed: true, skill_name: req.params.skillName });
});
