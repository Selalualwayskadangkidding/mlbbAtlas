import type { ApiResponse, ApiResponseMeta } from "@/types/api";

export function createSuccessResponse<T>(
  data: T,
  message = "OK",
  meta?: ApiResponseMeta
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    meta
  };
}

export function createErrorResponse(message: string): ApiResponse<null> {
  return {
    success: false,
    data: null,
    message
  };
}
