import { Router } from "express";
import {
  batchDeleteChatsController,
  createChatController,
  deleteChatController,
  getChatByIdController,
  listChatsController,
  updateChatController,
} from "./chats.controller";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  batchDeleteBodySchema,
  chatParamsSchema,
  createChatBodySchema,
  listChatsQuerySchema,
  updateChatBodySchema,
} from "./chats.schemas";

export const chatsRouter = Router();

chatsRouter.get(
  "/",
  validate({ query: listChatsQuerySchema }),
  asyncHandler(listChatsController),
);
chatsRouter.post(
  "/",
  validate({ body: createChatBodySchema }),
  asyncHandler(createChatController),
);
chatsRouter.post(
  "/batch-delete",
  validate({ body: batchDeleteBodySchema }),
  asyncHandler(batchDeleteChatsController),
);
chatsRouter.get(
  "/:id",
  validate({ params: chatParamsSchema }),
  asyncHandler(getChatByIdController),
);
chatsRouter.put(
  "/:id",
  validate({ params: chatParamsSchema, body: updateChatBodySchema }),
  asyncHandler(updateChatController),
);
chatsRouter.delete(
  "/:id",
  validate({ params: chatParamsSchema }),
  asyncHandler(deleteChatController),
);
