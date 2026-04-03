import { Router } from "express";
import { authRouter } from "../modules/auth";
import { agentsRouter } from "../modules/agents";
import { skillsRouter } from "../modules/skills";
import { mcpRouter } from "../modules/mcp";
import { modelsRouter } from "../modules/models";
import { channelsRouter } from "../modules/channels";
import { workspaceRouter } from "../modules/workspace";
import { chatsRouter } from "../modules/chats";
import { ok } from "../shared/utils/response";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/agents", agentsRouter);
apiRouter.use("/skills", skillsRouter);
apiRouter.use("/mcp", mcpRouter);
apiRouter.use("/models", modelsRouter);
apiRouter.use("/channels", channelsRouter);
apiRouter.use("/workspace", workspaceRouter);
apiRouter.use("/chats", chatsRouter);

apiRouter.get("/health", (_req, res) => {
  return ok(res, { status: "ok", service: "backend-modular-mockup" });
});
