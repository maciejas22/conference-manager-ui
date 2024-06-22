import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debouncedSetValue = useMemo(
    () => debounce((newValue: T) => setDebouncedValue(newValue), delay),
    [delay],
  );

  useEffect(() => {
    debouncedSetValue(value);

    return () => {
      debouncedSetValue.cancel();
    };
  }, [value, debouncedSetValue]);

  return debouncedValue;
}

export default useDebounce;
