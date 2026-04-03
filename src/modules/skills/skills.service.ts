import { SkillsRepository } from "./skills.repository";
import { AppError } from "../../shared/errors/AppError";

/** MOCK: data from in-memory SkillsRepository (no DB). */
export class SkillsService {
  constructor(private readonly repository = new SkillsRepository()) {}

  async listSkills(enabled?: boolean) {
    const items = await this.repository.list();
    if (enabled === undefined) return items;
    return items.filter((item) => item.enabled === enabled);
  }

  async getSkillByName(name: string) {
    const item = await this.repository.getByName(name);
    if (!item) {
      throw new AppError("Skill not found", 404, "SKILL_NOT_FOUND", { name });
    }
    return item;
  }
}
