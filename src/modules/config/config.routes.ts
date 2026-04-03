import { Router } from "express";
import {
  getChannelByNameController,
  getChannelsController,
  getHeartbeatController,
  getUserTimezoneController,
  listChannelTypesController,
  putChannelByNameController,
  putChannelsController,
  putHeartbeatController,
  putUserTimezoneController,
  weixinQrcodeController,
  weixinQrcodeStatusController,
} from "./config.controller";
import { ok } from "../../shared/utils/response";

/**
 * MOCK: `/config/*` routes consumed by the Mentonex frontend (`channelApi`, etc.).
 */
export const configRouter = Router();

configRouter.get("/channels/types", listChannelTypesController);
configRouter.get("/channels", getChannelsController);
configRouter.put("/channels", putChannelsController);
configRouter.get("/channels/:channelName", getChannelByNameController);
configRouter.put("/channels/:channelName", putChannelByNameController);
configRouter.get("/channels/weixin/qrcode", weixinQrcodeController);
configRouter.get("/channels/weixin/qrcode/status", weixinQrcodeStatusController);

configRouter.get("/heartbeat", getHeartbeatController);
configRouter.put("/heartbeat", putHeartbeatController);

configRouter.get("/user-timezone", getUserTimezoneController);
configRouter.put("/user-timezone", putUserTimezoneController);

/** MOCK: catch-all for `/config/security/*` (Settings → Security). Must be registered last. */
const securityStub = Router();
securityStub.use((_req, res) => {
  return ok(res, { mock: true });
});
configRouter.use("/security", securityStub);
