import type { ExplorerResponse } from "@/utils/types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function isExplorerResponse(value: unknown): value is ExplorerResponse {
  if (typeof value !== "object" || value === null) return false;

  const r = value as Record<string, unknown>;
  return (
    typeof r.path === "string" &&
    (typeof r.parentId === "number" || r.parentId === null) &&
    Array.isArray(r.folders) &&
    Array.isArray(r.files)
  );
}

export async function fetchExplorer(
  segments: string[],
  signal?: AbortSignal
): Promise<ExplorerResponse> {
  const apiPath = segments.map(encodeURIComponent).join("/");

  const response = await fetch(`${BASE_URL}/api/browse/${apiPath}`, { signal });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  const result: unknown = await response.json();

  if (!isExplorerResponse(result)) {
    throw new Error("The API returned an invalid response structure.");
  }

  return result;
}