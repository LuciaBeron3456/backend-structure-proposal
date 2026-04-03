import type { Response } from "express";

/**
 * Success responses: send the payload as the JSON body (CoPaw / Mentonex frontend
 * expects raw objects/arrays, not `{ success, data }` wrappers).
 *
 * @param _meta Optional metadata (ignored for API parity; callers may omit it).
 */
export function ok<T>(res: Response, data: T, _meta?: Record<string, unknown>) {
  return res.status(200).json(data);
}

export function created<T>(res: Response, data: T, _meta?: Record<string, unknown>) {
  return res.status(201).json(data);
}

/**
 * Error responses: FastAPI-style `detail` plus `code` for debugging.
 * The frontend auth layer reads `detail` on failed login/register.
 */
export function fail(
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown
) {
  const body: Record<string, unknown> = {
    detail: message,
    code,
    ...(details !== undefined ? { details } : {}),
  };
  return res.status(statusCode).json(body);
}
