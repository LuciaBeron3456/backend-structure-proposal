import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import {
  postConsoleChatController,
  postConsoleChatStopController,
  postConsoleUploadController,
} from "./console.controller";

const upload = multer({ storage: multer.memoryStorage() });

export const consoleRouter = Router();

consoleRouter.post("/chat", asyncHandler(postConsoleChatController));
consoleRouter.post("/chat/stop", asyncHandler(postConsoleChatStopController));
consoleRouter.post(
  "/upload",
  upload.single("file"),
  postConsoleUploadController,
);
