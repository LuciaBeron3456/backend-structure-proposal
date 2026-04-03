export interface LoginRequest {
  username: string;
  password: string;
}

/** MOCK: login always succeeds for demo users with password `admin` (see AuthService). */
export interface LoginResponse {
  token: string;
  username: string;
  message?: string;
}

/** MOCK: internal user shape for in-memory store (no DB). */
export interface MockUser {
  id: string;
  username: string;
  passwordHash: string;
}
