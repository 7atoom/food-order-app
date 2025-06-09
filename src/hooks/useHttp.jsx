import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  // For GitHub Pages deployment, adjust the URL to point to our deployed backend
  const API_URL = import.meta.env.PROD
    ? "https://web-production-fbd2a.up.railway.app" // Our deployed Railway API URL
    : url; // Use localhost URL for development

  // If in production, modify the URL to use the deployed API
  const requestUrl = import.meta.env.PROD
    ? `${API_URL}${url.substring(url.lastIndexOf("/"))}`
    : url;

  const response = await fetch(requestUrl, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
