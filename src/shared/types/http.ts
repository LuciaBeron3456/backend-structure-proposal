import type { Request } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

export type ValidatedRequest<
  TBody = unknown,
  TQuery extends ParsedQs = ParsedQs,
  TParams extends ParamsDictionary = ParamsDictionary
> = Request<TParams, unknown, TBody, TQuery>;
