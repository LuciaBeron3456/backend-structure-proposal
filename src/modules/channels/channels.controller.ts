import type { Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { ChannelsService } from "./channels.service";
import type {
  ChannelParams,
  CreateChannelBody,
  ListChannelsQuery
} from "./channels.schemas";
import { created as createdResponse, ok } from "../../shared/utils/response";

const channelsService = new ChannelsService();

export async function listChannelsController(
  req: ValidatedRequest<unknown, ListChannelsQuery>,
  res: Response
) {
  const query = req.query;
  const enabled =
    query.enabled === undefined ? undefined : query.enabled === "true";
  const data = await channelsService.listChannels(enabled);
  return ok(res, data, {
    filters: {
      enabled: enabled ?? "all"
    }
  });
}

export async function createChannelController(
  req: ValidatedRequest<CreateChannelBody>,
  res: Response
) {
  const body = req.body;
  const createdChannel = await channelsService.createChannel(body);
  return createdResponse(res, createdChannel);
}

export async function getChannelByIdController(
  req: ValidatedRequest<unknown, Record<string, never>, ChannelParams>,
  res: Response
) {
  const data = await channelsService.getChannelById(req.params.id);
  return ok(res, data);
}
