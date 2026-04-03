import type { WorkspaceFileSummary } from "./workspace.types";

/**
 * MOCK DATA: static workspace files (no DB).
 */
const mockFiles: WorkspaceFileSummary[] = [
  { filename: "README.md", size: 120 },
  { filename: "notes.txt", size: 42 },
];

export class WorkspaceRepository {
  async listFiles(): Promise<WorkspaceFileSummary[]> {
    return [...mockFiles];
  }

  async getByFilename(filename: string): Promise<WorkspaceFileSummary | null> {
    return mockFiles.find((f) => f.filename === filename) ?? null;
  }
}
