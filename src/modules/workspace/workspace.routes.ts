import { Router } from "express";
import multer from "multer";
import {
  downloadWorkspaceController,
  uploadWorkspaceController,
} from "./workspace.controller";

const upload = multer({ storage: multer.memoryStorage() });

/**
 * MOCK: only routes the frontend calls under `/workspace` (not `/workspace/files`).
 * File listing uses `/agent/files` (see `agent` module).
 */
export const workspaceRouter = Router();

workspaceRouter.get("/download", downloadWorkspaceController);
workspaceRouter.post(
  "/upload",
  upload.single("file"),
  uploadWorkspaceController,
);
