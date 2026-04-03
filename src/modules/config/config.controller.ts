import type { Request, Response } from "express";
import { ok } from "../../shared/utils/response";
import { getMockChannelConfig } from "./mockChannelConfig";

/** MOCK: channel type ids the UI may show in pickers. */
export function listChannelTypesController(_req: Request, res: Response) {
  return ok(res, [
    "console",
    "discord",
    "telegram",
    "slack",
    "feishu",
    "wecom",
  ]);
}

export function getChannelsController(_req: Request, res: Response) {
  return ok(res, getMockChannelConfig());
}

export function putChannelsController(_req: Request, res: Response) {
  return ok(res, getMockChannelConfig());
}

export function getChannelByNameController(req: Request, res: Response) {
  const full = getMockChannelConfig() as Record<string, Record<string, unknown>>;
  const cfg = full[req.params.channelName];
  if (!cfg) {
    res.status(404).json({ detail: "Unknown channel", mock: true });
    return;
  }
  return ok(res, cfg);
}

export function putChannelByNameController(req: Request, res: Response) {
  return getChannelByNameController(req, res);
}

export function weixinQrcodeController(_req: Request, res: Response) {
  return ok(res, { qrcode_img: "", qrcode: "mock", mock: true });
}

export function weixinQrcodeStatusController(_req: Request, res: Response) {
  return ok(res, {
    status: "mock",
    bot_token: "",
    base_url: "",
    mock: true,
  });
}

export function getHeartbeatController(_req: Request, res: Response) {
  return ok(res, { enabled: false, mock: true });
}

export function putHeartbeatController(_req: Request, res: Response) {
  return ok(res, { enabled: false, mock: true });
}

export function getUserTimezoneController(_req: Request, res: Response) {
  return ok(res, { timezone: "UTC", mock: true });
}

export function putUserTimezoneController(_req: Request, res: Response) {
  return ok(res, { timezone: "UTC", mock: true });
}
