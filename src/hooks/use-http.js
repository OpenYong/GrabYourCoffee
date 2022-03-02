import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? requestConfig.body : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("패치 데이터 실패");
      }
      const responseData = await response.json();

      applyData(responseData);
    } catch (e) {
      console.log(e);
      setError(e.message || "에러 발생, 서버로부터 정보를 가져올 수 없음.");
    }
    setIsLoading(false);
    setError(false);
  });

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
