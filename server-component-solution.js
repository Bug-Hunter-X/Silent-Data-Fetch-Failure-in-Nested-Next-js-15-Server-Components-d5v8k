// server-component-solution.js

import { Suspense } from 'react';

export default async function Page() {
  try {
    const data = await fetchData();
    return <NestedComponent data={data} />;
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}

async function fetchData() {
  // Simulate an API call that might fail
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
}

function NestedComponent({ data }) {
  try {
    // Further nested fetching and processing
    const processedData = processData(data);
    return <div>Data: {processedData}</div>;
  } catch (error) {
    //Handle error
    console.error("Error Processing Data",error);
    return <p>Error Processing Data</p>;
  }
}

function processData(data){
  if (!data.nestedData) {
    throw new Error('Nested data missing');
  }
  return data.nestedData;
}