import { useState } from "react";

/**
 * useLocalStorage
 *
 * A hook to persist state in localStorage.
 *
 * @param key The key to use when storing the state in localStorage.
 * @param initialValue The initial value of the state to be stored.
 * @param options An object with the following optional properties:
 *   - serialize: A function to serialize the state. Defaults to JSON.stringify.
 *   - deserialize: A function to deserialize the state. Defaults to JSON.parse.
 * @returns A tuple with the stored value and a function to update the stored value.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
) {
  const { serialize = JSON.stringify, deserialize = JSON.parse } =
    options || {};

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, serialize(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
