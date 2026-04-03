import type { Response } from "express";
import type { ApiErrorBody, ApiSuccess } from "../types/apiResponse";

export function ok<T>(res: Response, data: T, meta?: Record<string, unknown>) {
  const body: ApiSuccess<T> = meta ? { success: true, data, meta } : { success: true, data };
  return res.status(200).json(body);
}

export function created<T>(res: Response, data: T, meta?: Record<string, unknown>) {
  const body: ApiSuccess<T> = meta ? { success: true, data, meta } : { success: true, data };
  return res.status(201).json(body);
}

export function fail(
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown
) {
  const body: ApiErrorBody = {
    success: false,
    error: { code, message, details }
  };
  return res.status(statusCode).json(body);
}
