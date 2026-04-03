/**
 * Legacy envelope types (pre–raw-JSON responses). Kept for reference only;
 * handlers now respond with unwrapped bodies for CoPaw compatibility.
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
