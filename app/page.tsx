'use client';
import React from 'react';
import { fetchData, ErrorType } from './services/apiService'; 

interface ApiResponse {
  message: string;
}

export default function Home() {
  const [data, setData] = React.useState<ApiResponse | null>(null);
  const [error, setError] = React.useState<ErrorType>(null);

  const handleFetchData = async () => {
    const result = await fetchData();
    setData(result.data);  
    setError(result.error);
  };

  return (
    <div>
      <h1>Token Based API Fetcher</h1>
      <button onClick={handleFetchData}>Fetch Data</button>
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}