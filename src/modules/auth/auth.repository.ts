import { dbClient } from "../../infrastructure/db/client";

export class AuthRepository {
  async findUserByUsername(username: string) {
    const user = await dbClient.user.findUnique({
      where: { username },
      select: { id: true, username: true, passwordHash: true }
    });
    // Keep the mock login experience usable until user provisioning is implemented.
    if (!user && username === "admin") {
      return { id: "u1", username: "admin", passwordHash: "mock" };
    }
    return user;
  }
}
