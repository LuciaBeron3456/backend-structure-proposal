import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import {
  postConsoleChatController,
  postConsoleChatStopController,
  postConsoleUploadController,
} from "./console.controller";
import { ok } from "../../shared/utils/response";

const upload = multer({ storage: multer.memoryStorage() });

export const consoleRouter = Router();

/** MOCK: `consoleApi.getPushMessages()`. */
consoleRouter.get("/push-messages", (_req, res) => {
  return ok(res, { messages: [] });
});

consoleRouter.post("/chat", asyncHandler(postConsoleChatController));
consoleRouter.post("/chat/stop", asyncHandler(postConsoleChatStopController));
consoleRouter.post(
  "/upload",
  upload.single("file"),
  postConsoleUploadController,
);
