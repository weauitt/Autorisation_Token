export async function getToken() {
  try {
    const response = await fetch('http://localhost:4000', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Ответ сервера:', response);

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }

    const data = await response.json();
    return data.token; 
  } catch (error) {
    console.error('Ошибка при получении токена:', error);
    return null; 
  }
}
