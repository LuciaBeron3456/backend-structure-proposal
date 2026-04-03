import { Router } from "express";
import {
  loginController,
  registerController,
  statusController,
  updateProfileController,
  verifyController,
} from "./auth.controller";
import { validate } from "../../shared/middleware/validateMiddleware";
import { loginBodySchema } from "./auth.schemas";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const authRouter = Router();

authRouter.get("/status", statusController);
authRouter.get("/verify", verifyController);
authRouter.post(
  "/login",
  validate({ body: loginBodySchema }),
  asyncHandler(loginController),
);
/** MOCK: accepts JSON body; no persistence. */
authRouter.post("/register", registerController);
authRouter.post("/update-profile", updateProfileController);
