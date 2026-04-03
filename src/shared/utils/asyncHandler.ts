import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

type AsyncController<
  TParams extends ParamsDictionary = ParamsDictionary,
  TResBody = unknown,
  TReqBody = unknown,
  TReqQuery extends ParsedQs = ParsedQs,
  TLocals extends Record<string, unknown> = Record<string, unknown>
> = (
  req: Request<TParams, TResBody, TReqBody, TReqQuery, TLocals>,
  res: Response<TResBody, TLocals>,
  next: NextFunction
) => Promise<unknown>;

export function asyncHandler<
  TParams extends ParamsDictionary = ParamsDictionary,
  TResBody = unknown,
  TReqBody = unknown,
  TReqQuery extends ParsedQs = ParsedQs,
  TLocals extends Record<string, unknown> = Record<string, unknown>
>(
  handler: AsyncController<TParams, TResBody, TReqBody, TReqQuery, TLocals>
): RequestHandler<TParams, TResBody, TReqBody, TReqQuery, TLocals> {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
