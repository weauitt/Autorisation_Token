'use client';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface ApiResponse {
  message: string; 
}

type ErrorType = string | null;

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null); 
  const [error, setError] = useState<ErrorType>(null); 

  const fetchData = async () => {
    try {
      const tokenResponse = await axios.get('/api/token'); 
      const token = tokenResponse.data.token; 

      const response = await axios.get('http://demo7755148.mockable.io/token-demo', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setData(response.data); 
    } catch (err) {
      const axiosError = err as AxiosError; 
      const headerError = axiosError.response?.headers?.['error-message'] || axiosError.message;
      setError(headerError);
    }
  };

  return (
    <div>
      <h1>Token Based API Fetcher</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
