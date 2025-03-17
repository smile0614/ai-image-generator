import fetch, { RequestInit, Response } from "node-fetch";

const DEFAULT_TIMEOUT = 60000; // Set timeout to 30 seconds
const MAX_RETRIES = 3; // Retry up to 5 times

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = MAX_RETRIES,
  timeout = DEFAULT_TIMEOUT
): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { ...options });

      clearTimeout(id);

      if (response.ok) return response;

      const errorBody = await response.text();
      console.error(`Error response from server: HTTP ${response.status}: ${errorBody}`);
      throw new Error(`HTTP ${response.status}: ${errorBody}`);
    } catch (err) {
      const error = err as { name?: string; message?: string };

      // Log the final error if retries are exhausted or AbortError occurred
      if (attempt === retries || error?.name === "AbortError") {
        console.error(`Fetch failed after ${attempt} attempts:`, error.message || error);
        throw error;
      }

      // Add exponential backoff for retries
      console.warn(`Retrying fetch attempt ${attempt} for URL: ${url} after ${DEFAULT_TIMEOUT}ms`);
      await new Promise((resolve) => setTimeout(resolve, DEFAULT_TIMEOUT)); // Wait before retrying
    }
  }

  throw new Error("Max retries reached");
}