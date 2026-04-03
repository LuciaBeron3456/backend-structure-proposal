import dotenv from "dotenv";
import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./shared/logger/logger";

dotenv.config();

const app = createApp();

app.listen(env.PORT, () => {
  logger.info({
    message: "backend-modular-mockup server started",
    port: env.PORT,
    frontendUrl: env.FRONTEND_URL
  });
});
