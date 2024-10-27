import { APIResponse } from '@playwright/test';

export function logResponseStatus(response: APIResponse) {
  try {
    const status = response.status();
    const url = response.url();
    if (status >= 200 && status < 300) {
      console.log(`API-Test: Request successful with status code ${status} for URL: ${url}`);
    } else {
      console.error(`API-Test: Request failed with status code ${status} for URL: ${url}`);
    }
  } catch (error) {
    console.error(`API-Test: Error logging response status: ${error.message}`);
  }
}