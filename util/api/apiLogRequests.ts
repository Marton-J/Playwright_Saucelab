export async function logResponseStatus(response: Response) {
    if (response.status() === 200) {
      console.log('API-Test: Request successful with status code 200');
    } else {
      console.error(`API-Test: Request failed with status code: ${response.status()}`);
    }
  }