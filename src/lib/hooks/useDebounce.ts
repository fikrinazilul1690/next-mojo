import { useEffect, useRef, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      if (!!!timerRef.current) return;
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
