import { Router } from "express";
import { authRouter } from "../modules/auth";
import { agentsRouter } from "../modules/agents";
import { skillsRouter } from "../modules/skills";
import { mcpRouter } from "../modules/mcp";
import { modelsRouter } from "../modules/models";
import { channelsRouter } from "../modules/channels";
import { workspaceRouter } from "../modules/workspace";
import { chatsRouter } from "../modules/chats";
import { consoleRouter } from "../modules/console";
import { ok } from "../shared/utils/response";

/**
 * MOCK API: every route is backed by in-memory data in `src/modules/*` (no DB).
 */
export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/agents", agentsRouter);
apiRouter.use("/skills", skillsRouter);
apiRouter.use("/mcp", mcpRouter);
apiRouter.use("/models", modelsRouter);
apiRouter.use("/channels", channelsRouter);
apiRouter.use("/workspace", workspaceRouter);
apiRouter.use("/chats", chatsRouter);
apiRouter.use("/console", consoleRouter);

apiRouter.get("/health", (_req, res) => {
  return ok(res, { status: "ok", service: "backend-modular-mockup", mock: true });
});

/** MOCK: version string for frontend `rootApi.getVersion()`. */
apiRouter.get("/version", (_req, res) => {
  return ok(res, { version: "0.0.0-mock", name: "backend-modular-mockup" });
});
