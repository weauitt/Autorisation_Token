import { token } from "../api/token/route";

interface ApiResponse {
  message: string;
}

export type ErrorType = string | null;

export const fetchData = async (): Promise<{ data: ApiResponse | null; error: ErrorType }> => {
  try {
    const response = await fetch('http://demo7755148.mockable.io/token-demo', {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка ответа: ${response.statusText}`);
    }

    const data = await response.json();
    return { data, error: null };

  } catch (err) {
    const errorMessage = (err as Error).message || 'Unknown error';
    return { data: null, error: errorMessage };
  }
};