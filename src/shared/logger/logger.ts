import pino from "pino";
import type { NextFunction, Request, Response } from "express";
import { env } from "../../config/env";

const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug"
});

type LogData = Record<string, unknown>;

function getRequestId(req: Request): string {
  const fromReq = (req as Request & { id?: string }).id;
  return fromReq ?? Math.random().toString(36).slice(2, 10);
}

export const loggerHelper = {
  logger,
  createChildLogger: (module: string) => logger.child({ module }),
  serverLogger: logger.child({ module: "server" }),
  authLogger: logger.child({ module: "auth" }),
  errorLogger: logger.child({ module: "error" }),
  requestLogger: logger.child({ module: "request" }),
  dbLogger: logger.child({ module: "database" }),

  logRequest(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    this.requestLogger.info(
      {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        requestId: getRequestId(req)
      },
      "Incoming request"
    );

    res.on("finish", () => {
      this.requestLogger.info(
        {
          method: req.method,
          url: req.originalUrl,
          statusCode: res.statusCode,
          durationMs: Date.now() - start,
          ip: req.ip
        },
        "Request completed"
      );
    });

    next();
  },

  logError(error: unknown, req?: Request | null, additionalInfo: LogData = {}) {
    const err = error instanceof Error ? error : new Error(String(error));
    const payload: LogData = {
      error: {
        message: err.message,
        stack: err.stack,
        name: err.name,
        ...additionalInfo
      }
    };

    if (req) {
      payload.request = {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get("User-Agent")
      };
    }

    this.errorLogger.error(payload, "Application error occurred");
  },

  logAuth(action: string, userId: string, success: boolean, additionalInfo: LogData = {}) {
    this.authLogger.info(
      {
        action,
        userId,
        success,
        timestamp: new Date().toISOString(),
        ...additionalInfo
      },
      `Authentication ${action}`
    );
  },

  logDatabase(
    operation: string,
    collection: string,
    success: boolean,
    durationMs: number,
    additionalInfo: LogData = {}
  ) {
    this.dbLogger.debug(
      {
        operation,
        collection,
        success,
        durationMs,
        ...additionalInfo
      },
      `Database ${operation}`
    );
  }
};

export { logger };
