import type { SkillSummary } from "./skills.types";
import { dbClient } from "../../infrastructure/db/client";

export class SkillsRepository {
  async list(): Promise<SkillSummary[]> {
    return dbClient.skill.findMany({
      select: { name: true, enabled: true },
      orderBy: { createdAt: "asc" }
    });
  }

  async getByName(name: string): Promise<SkillSummary | null> {
    return dbClient.skill.findUnique({
      where: { name },
      select: { name: true, enabled: true }
    });
  }
}
