import { useState } from 'react';

import { baseUrl } from '../env';

export const useHandleFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async ({ data, method, path }) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${baseUrl}/${path}`, {
        method: method,
        body: data && JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsedRes = await res.json();

      setIsLoading(false);

      return parsedRes;
    } catch (e) {
      setIsLoading(false);

      return e;
    }
  };

  return { handleFetch, isLoading };
};
