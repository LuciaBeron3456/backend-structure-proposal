import { AuthRepository } from "./auth.repository";
import type { LoginRequest, LoginResponse } from "./auth.types";
import { AppError } from "../../shared/errors/AppError";

/**
 * MOCK AUTH: no real password hashing; accepts password `admin` for any known user.
 */
export class AuthService {
  constructor(private readonly repository = new AuthRepository()) {}

  async login(input: LoginRequest): Promise<LoginResponse> {
    const user = await this.repository.findUserByUsername(input.username);
    if (!user || input.password !== "admin") {
      throw new AppError("Invalid credentials", 401, "AUTH_INVALID_CREDENTIALS");
    }
    return {
      token: `mock-token-for-${input.username}`,
      username: user.username,
      message: "mock login",
    };
  }
}
