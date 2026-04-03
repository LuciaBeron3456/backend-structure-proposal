import type { NextFunction, Request, Response } from "express";
import { ZodError, type AnyZodObject } from "zod";
import { fail } from "../utils/response";

interface ValidationSchemas {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
  headers?: AnyZodObject;
}

export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.headers) {
        schemas.headers.parse(req.headers);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return fail(
          res,
          400,
          "VALIDATION_ERROR",
          "Validation failed",
          error.issues
        );
      }
      next(error);
    }
  };
}
