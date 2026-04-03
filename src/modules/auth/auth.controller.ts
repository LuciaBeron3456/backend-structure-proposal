import type { Request, Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { AuthService } from "./auth.service";
import type { LoginBody } from "./auth.schemas";
import { ok } from "../../shared/utils/response";

const authService = new AuthService();

export async function loginController(
  req: ValidatedRequest<LoginBody>,
  res: Response,
) {
  const payload = req.body;
  const result = await authService.login(payload);
  return ok(res, result);
}

/** MOCK: auth disabled for local dev — frontend may still call this. */
export function statusController(_req: Request, res: Response) {
  return ok(res, { enabled: false, has_users: true });
}

/**
 * MOCK: any Bearer token is treated as valid (no JWT verification).
 * Frontend AuthGuard only checks `response.ok`.
 */
export function verifyController(_req: Request, res: Response) {
  return ok(res, { valid: true, mock: true });
}

/** MOCK: pretend registration succeeded. */
export function registerController(req: Request, res: Response) {
  const body = req.body as { username?: string };
  const username = body.username ?? "user";
  return ok(res, {
    token: `mock-token-register-${username}`,
    username,
    message: "mock register",
  });
}

/** MOCK: no-op profile update. */
export function updateProfileController(req: Request, res: Response) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "") ?? "";
  return ok(res, {
    token: token || "mock-token",
    username: "mock-user",
    message: "mock update profile",
  });
}
