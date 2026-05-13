export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  meta?: ApiResponseMeta;
}

export interface ApiResponseMeta {
  source: string;
  regionSlug: string;
  seasonId: string;
  dataStatus: "verified" | "partial" | "placeholder";
  validationIssues: number;
}
