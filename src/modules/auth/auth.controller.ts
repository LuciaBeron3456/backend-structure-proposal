import type { Request, Response } from "express";
import type { ValidatedRequest } from "../../shared/types/http";
import { AuthService } from "./auth.service";
import type { LoginBody } from "./auth.schemas";
import { ok } from "../../shared/utils/response";

const authService = new AuthService();

export async function loginController(
  req: ValidatedRequest<LoginBody>,
  res: Response
) {
  const payload = req.body;
  const result = await authService.login(payload);
  return ok(res, result);
}

export function statusController(_req: Request, res: Response) {
  return ok(res, { enabled: true });
}
