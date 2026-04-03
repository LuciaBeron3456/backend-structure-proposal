import { Router } from "express";
import { getSkillByNameController, listSkillsController } from "./skills.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  listSkillsHeadersSchema,
  listSkillsQuerySchema,
  skillParamsSchema
} from "./skills.schemas";

export const skillsRouter = Router();

skillsRouter.get(
  "/",
  validate({ query: listSkillsQuerySchema, headers: listSkillsHeadersSchema }),
  asyncHandler(listSkillsController)
);
skillsRouter.get(
  "/:name",
  validate({ params: skillParamsSchema }),
  asyncHandler(getSkillByNameController)
);
