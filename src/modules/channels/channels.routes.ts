import { Router } from "express";
import {
  createChannelController,
  getChannelByIdController,
  listChannelsController
} from "./channels.controller";
import { validate } from "../../shared/middleware/validateMiddleware";
import {
  channelParamsSchema,
  createChannelBodySchema,
  listChannelsQuerySchema
} from "./channels.schemas";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const channelsRouter = Router();

channelsRouter.get(
  "/",
  validate({ query: listChannelsQuerySchema }),
  asyncHandler(listChannelsController)
);
channelsRouter.post(
  "/",
  validate({ body: createChannelBodySchema }),
  asyncHandler(createChannelController)
);
channelsRouter.get(
  "/:id",
  validate({ params: channelParamsSchema }),
  asyncHandler(getChannelByIdController)
);
