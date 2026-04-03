import type { NextFunction, Request, Response } from "express";
import { loggerHelper } from "../logger/logger";

export function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  loggerHelper.logRequest(req, res, next);
}
