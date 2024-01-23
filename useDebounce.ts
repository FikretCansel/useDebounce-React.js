import { useEffect, useRef } from 'react';

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
export default useDebounce;
