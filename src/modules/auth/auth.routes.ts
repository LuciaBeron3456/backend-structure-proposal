import { Router } from "express";
import { loginController, statusController } from "./auth.controller";
import { validate } from "../../shared/middleware/validateMiddleware";
import { loginBodySchema } from "./auth.schemas";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const authRouter = Router();

authRouter.get("/status", statusController);
authRouter.post(
  "/login",
  validate({ body: loginBodySchema }),
  asyncHandler(loginController)
);
