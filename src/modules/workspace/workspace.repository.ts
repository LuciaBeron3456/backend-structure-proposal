import type { WorkspaceFileSummary } from "./workspace.types";
import { dbClient } from "../../infrastructure/db/client";

export class WorkspaceRepository {
  async listFiles(): Promise<WorkspaceFileSummary[]> {
    return dbClient.workspaceFile.findMany({
      select: { filename: true, size: true },
      orderBy: { createdAt: "asc" }
    });
  }

  async getByFilename(filename: string): Promise<WorkspaceFileSummary | null> {
    return dbClient.workspaceFile.findUnique({
      where: { filename },
      select: { filename: true, size: true }
    });
  }
}
