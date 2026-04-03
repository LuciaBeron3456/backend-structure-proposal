import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { ChatsService } from "./chats.service";
import { ok } from "../../shared/utils/response";
import type {
  BatchDeleteBody,
  ChatParams,
  CreateChatBody,
  ListChatsQuery,
  UpdateChatBody,
} from "./chats.schemas";

const chatsService = new ChatsService();

export async function listChatsController(
  req: ValidatedRequest<unknown, ListChatsQuery>,
  res: Response,
) {
  const data = await chatsService.listChats(req.query.q);
  return ok(res, data);
}

export async function getChatByIdController(
  req: ValidatedRequest<unknown, Record<string, never>, ChatParams>,
  res: Response,
) {
  const history = await chatsService.getChatHistory(req.params.id);
  return ok(res, history);
}

export async function createChatController(
  req: ValidatedRequest<CreateChatBody>,
  res: Response,
) {
  const data = await chatsService.createChat(req.body);
  return ok(res, data);
}

export async function updateChatController(
  req: ValidatedRequest<UpdateChatBody, Record<string, never>, ChatParams>,
  res: Response,
) {
  const data = await chatsService.updateChat(req.params.id, req.body);
  return ok(res, data);
}

export async function deleteChatController(
  req: ValidatedRequest<unknown, Record<string, never>, ChatParams>,
  res: Response,
) {
  const data = await chatsService.deleteChat(req.params.id);
  return ok(res, data);
}

export async function batchDeleteChatsController(
  req: ValidatedRequest<BatchDeleteBody>,
  res: Response,
) {
  const data = await chatsService.batchDelete(req.body);
  return ok(res, data);
}
