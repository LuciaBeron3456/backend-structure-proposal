import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { apiRouter } from "./api/router";
import { notFoundMiddleware } from "./shared/middleware/notFoundMiddleware";
import { errorMiddleware } from "./shared/middleware/errorMiddleware";
import { requestLoggerMiddleware } from "./shared/middleware/requestLoggerMiddleware";
import { env } from "./config/env";

export function createApp() {
  const app = express();

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"]
        }
      }
    })
  );

  app.use(
    cors({
      origin: env.FRONTEND_URL || "http://localhost:5173",
      credentials: true
    })
  );

  app.use(morgan("combined"));
  app.use(requestLoggerMiddleware);
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", apiRouter);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
