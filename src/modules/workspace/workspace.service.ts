import { WorkspaceRepository } from "./workspace.repository";
import { AppError } from "../../shared/errors/AppError";

export class WorkspaceService {
  constructor(private readonly repository = new WorkspaceRepository()) {}

  async listWorkspaceFiles(extension?: string) {
    const items = await this.repository.listFiles();
    if (!extension) return items;
    const normalized = extension.startsWith(".") ? extension : `.${extension}`;
    return items.filter((item) => item.filename.endsWith(normalized));
  }

  async getWorkspaceFile(filename: string) {
    const item = await this.repository.getByFilename(filename);
    if (!item) {
      throw new AppError(
        "Workspace file not found",
        404,
        "WORKSPACE_FILE_NOT_FOUND",
        { filename }
      );
    }
    return item;
  }
}
