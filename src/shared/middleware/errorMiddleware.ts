import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { loggerHelper } from "../logger/logger";
import { fail } from "../utils/response";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  loggerHelper.logError(err, _req);

  if (err instanceof AppError) {
    return fail(res, err.statusCode, err.code, err.message, err.details);
  }

  return fail(res, 500, "INTERNAL_ERROR", "Internal server error");
}
