import { Router } from "express";
import { getFilePreviewController } from "./files.controller";

/** MOCK: attachment preview URLs from `chatApi.filePreviewUrl`. */
export const filesRouter = Router();

filesRouter.get("/preview/:filename", getFilePreviewController);
