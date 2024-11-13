import { getToken } from "../api/token/getToken";

interface ApiResponse {
  message: string;
}

export type ErrorType = string | null;

export const fetchData = async (): Promise<{ data: ApiResponse | null; error: ErrorType }> => {
  try {
    const token = await getToken(); 
    const response = await fetch('http://demo7755148.mockable.io/token-demo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error('Ошибка при получении данных:', err);
    const errorMessage = (err as Error).message || 'Unknown error';
    return { data: null, error: errorMessage };
  }
};
