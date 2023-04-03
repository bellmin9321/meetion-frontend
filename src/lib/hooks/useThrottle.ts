import { useEffect, useRef, useState } from 'react';

interface debounceProps<T> {
  value: T;
  delay: number;
}

function useThrottle<T>({ value, delay }: debounceProps<T>): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const handler = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);

      return () => clearTimeout(handler);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
