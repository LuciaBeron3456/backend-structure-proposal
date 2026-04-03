import type { SkillSummary } from "./skills.types";

/**
 * MOCK DATA: static skills (no DB).
 */
const mockSkills: SkillSummary[] = [
  { name: "example-skill", enabled: true },
  { name: "mock-tool-skill", enabled: false },
];

export class SkillsRepository {
  async list(): Promise<SkillSummary[]> {
    return [...mockSkills];
  }

  async getByName(name: string): Promise<SkillSummary | null> {
    return mockSkills.find((s) => s.name === name) ?? null;
  }
}
