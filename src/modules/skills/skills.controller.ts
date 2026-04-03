import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { SkillsService } from "./skills.service";
import { ok } from "../../shared/utils/response";
import type { ListSkillsQuery, SkillParams } from "./skills.schemas";

const skillsService = new SkillsService();

export async function listSkillsController(
  req: ValidatedRequest<unknown, ListSkillsQuery>,
  res: Response
) {
  const enabled =
    req.query.enabled === undefined ? undefined : req.query.enabled === "true";
  const data = await skillsService.listSkills(enabled);
  return ok(res, data, {
    filters: { enabled: enabled ?? "all" }
  });
}

export async function getSkillByNameController(
  req: ValidatedRequest<unknown, Record<string, never>, SkillParams>,
  res: Response
) {
  const data = await skillsService.getSkillByName(req.params.name);
  return ok(res, data);
}
