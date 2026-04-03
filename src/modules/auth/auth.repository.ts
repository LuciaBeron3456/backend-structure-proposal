import type { MockUser } from "./auth.types";

/**
 * MOCK DATA: in-memory users only (no DB).
 * Password check is handled in AuthService (`admin` for demo).
 */
const mockUsers: MockUser[] = [
  { id: "u1", username: "admin", passwordHash: "mock" },
  { id: "u2", username: "demo", passwordHash: "mock" },
];

export class AuthRepository {
  async findUserByUsername(username: string): Promise<MockUser | null> {
    return mockUsers.find((u) => u.username === username) ?? null;
  }
}
