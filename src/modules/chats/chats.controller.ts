import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { ChatsService } from "./chats.service";
import { ok } from "../../shared/utils/response";
import type { ChatParams, ListChatsQuery } from "./chats.schemas";

const chatsService = new ChatsService();

export async function listChatsController(
  req: ValidatedRequest<unknown, ListChatsQuery>,
  res: Response
) {
  const data = await chatsService.listChats(req.query.q);
  return ok(res, data, {
    filters: { q: req.query.q ?? "" }
  });
}

export async function getChatByIdController(
  req: ValidatedRequest<unknown, Record<string, never>, ChatParams>,
  res: Response
) {
  const data = await chatsService.getChatById(req.params.id);
  return ok(res, data);
}
