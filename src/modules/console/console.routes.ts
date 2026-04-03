import { Router } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import {
  postConsoleChatController,
  postConsoleChatStopController,
} from "./console.controller";

export const consoleRouter = Router();

consoleRouter.post("/chat", asyncHandler(postConsoleChatController));
consoleRouter.post("/chat/stop", asyncHandler(postConsoleChatStopController));
