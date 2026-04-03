import type { Response } from "express";
import type { Request } from "express";
import { ok } from "../../shared/utils/response";

/** MOCK: `agentApi` routes (`frontend/src/api/modules/agent.ts`). */
export function agentRoot(_req: Request, res: Response) {
  return ok(res, { mock: true });
}

export function agentHealth(_req: Request, res: Response) {
  return ok(res, { status: "ok", mock: true });
}

export function agentProcess(req: Request, res: Response) {
  return ok(res, { echo: req.body, mock: true });
}

export function agentAdminStatus(_req: Request, res: Response) {
  return ok(res, { running: true, mock: true });
}

export function agentShutdown(_req: Request, res: Response) {
  return res.status(204).send();
}

export function getRunningConfig(_req: Request, res: Response) {
  return ok(res, { mock: true });
}

export function putRunningConfig(req: Request, res: Response) {
  return ok(res, req.body);
}

export function getLanguage(_req: Request, res: Response) {
  return ok(res, { language: "en" });
}

export function putLanguage(_req: Request, res: Response) {
  return ok(res, { language: "en", copied_files: [] as string[] });
}

export function getAudioMode(_req: Request, res: Response) {
  return ok(res, { audio_mode: "off" });
}

export function putAudioMode(req: Request, res: Response) {
  const b = req.body as { audio_mode?: string };
  return ok(res, { audio_mode: b?.audio_mode ?? "off" });
}

export function getTranscriptionProviders(_req: Request, res: Response) {
  return ok(res, {
    providers: [{ id: "mock", name: "Mock", available: true }],
    configured_provider_id: "mock",
  });
}

export function putTranscriptionProvider(req: Request, res: Response) {
  const b = req.body as { provider_id?: string };
  return ok(res, { provider_id: b?.provider_id ?? "mock" });
}

export function getTranscriptionProviderType(_req: Request, res: Response) {
  return ok(res, { transcription_provider_type: "none" });
}

export function putTranscriptionProviderType(req: Request, res: Response) {
  const b = req.body as { transcription_provider_type?: string };
  return ok(res, {
    transcription_provider_type: b?.transcription_provider_type ?? "none",
  });
}

export function getLocalWhisperStatus(_req: Request, res: Response) {
  return ok(res, {
    available: false,
    ffmpeg_installed: false,
    whisper_installed: false,
  });
}
