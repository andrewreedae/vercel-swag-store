import { config } from "@/config";
import { log } from "../logging";
import { ApiData } from "../types/api";

export const getVercelStoreDataWithMeta = async<T>(
  endpoint: string,
  params: Record<string, any> = {},
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  extraHeaders: Record<string, string> = {},
): Promise<ApiData<T> | null> => {
  const { vercelApiBaseUrl, vercelApiKey } = config;
  const url =
    method === "GET"
      ? `${vercelApiBaseUrl}/${endpoint}?${new URLSearchParams(params).toString()}`
      : `${vercelApiBaseUrl}/${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: {
      "x-vercel-protection-bypass": vercelApiKey,
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body:
      method === "POST" || method === "PATCH"
        ? JSON.stringify(params ?? {})
        : undefined,
  });
  const responseData = await res.json();
  if (!res.ok) {
    log(`Failed to fetch data from ${endpoint}: ${res.statusText}`);
    return null;
  }
  if (!responseData.success) {
    log(`Unsuccessful fetch from ${endpoint}: ${responseData.message}`);
    return null;
  }
  return responseData as ApiData<T>;
}

export const getVercelStoreData = async<T>(
  endpoint: string,
  params: Record<string, any> = {},
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  extraHeaders: Record<string, string> = {},
): Promise<T | null> => {
  const apiData = await getVercelStoreDataWithMeta<T>(endpoint, params, method, extraHeaders);
  return apiData?.data ?? null;
}


