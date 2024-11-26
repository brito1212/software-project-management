import React from "react";

type RequestOptions = RequestInit; // Usa o tipo nativo do Fetch API para as opções da requisição

interface FetchResult {
  response: Response | null;
  json: any;
}

const useFetch = () => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const request = React.useCallback(
    async (url: string, options?: RequestOptions): Promise<FetchResult> => {
      let response: Response | null = null;
      let json: any = null;

      try {
        setError(null);
        setLoading(true);

        response = await fetch(url, options);
        json = await response.json();
        if (!response.ok)
          throw new Error(json.message || "Something went wrong");
      } catch (error) {
        json = null;
        setError((error as Error).message);
      } finally {
        setData(json);
        setLoading(false);
        return { response, json };
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
