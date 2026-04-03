import type { Request, Response } from "express";

/**
 * MOCK: GET /workspace/download — minimal zip bytes for Workspace page download button.
 */
export function downloadWorkspaceController(_req: Request, res: Response) {
  const zip = Buffer.from([
    0x50, 0x4b, 0x05, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  ]);
  const filename = "mock-workspace.zip";
  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`,
  );
  res.status(200).send(zip);
}

/**
 * MOCK: POST /workspace/upload — accepts zip from Workspace page; no persistence.
 */
export function uploadWorkspaceController(_req: Request, res: Response) {
  res.status(200).json({
    success: true,
    message: "mock upload — data not stored",
    mock: true,
  });
}
