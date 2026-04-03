import { Router } from "express";
import { getChatByIdController, listChatsController } from "./chats.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import { chatParamsSchema, listChatsQuerySchema } from "./chats.schemas";

export const chatsRouter = Router();

chatsRouter.get(
  "/",
  validate({ query: listChatsQuerySchema }),
  asyncHandler(listChatsController)
);
chatsRouter.get(
  "/:id",
  validate({ params: chatParamsSchema }),
  asyncHandler(getChatByIdController)
);
