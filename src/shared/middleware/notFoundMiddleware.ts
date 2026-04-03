import type { Request, Response } from "express";
import { fail } from "../utils/response";

export function notFoundMiddleware(_req: Request, res: Response) {
  return fail(res, 404, "ROUTE_NOT_FOUND", "Route not found");
}
