import { useEffect, useRef, useState } from 'react';

function useDebounce(
  onSubmit: () => void,
  dependencies: Array<any>,
  delay: number,
  enableFirstRun: boolean
) {
  const isRunned = useRef(enableFirstRun);
  useEffect(() => {
    if (isRunned.current) {
      const handleOnSubmit = setTimeout(() => {
        onSubmit();
      }, delay);
      return () => clearTimeout(handleOnSubmit);
    }
    isRunned.current = true;
  }, [dependencies, onSubmit, delay]);
}

function useDebounceEffect(
  onSubmit: () => void,
  dependencies: Array<any>,
  delay: number
) {
  useEffect(() => {
    const handleOnSubmit = setTimeout(() => {
      onSubmit();
    }, delay);

    return () => clearTimeout(handleOnSubmit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

function useDebounceFunc() {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  return (onSubmit: () => void, delay: number = 1000) => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      onSubmit();
    }, delay);
    setTimer(newTimer);
  };
}
export { useDebounceEffect, useDebounceFunc, useDebounce };
