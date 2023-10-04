import { useState, useEffect } from 'react';

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setData(result);
    setIsLoading(false);
  }, [result]);

  return { data, isLoading };
};

export default useStore;
