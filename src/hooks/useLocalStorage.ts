import { useCallback, useEffect } from 'react';

export const useLocalStorage = <T>(parentItem: string, initialValue: Record<string, T>, useCookies = true) => {
  useEffect(() => {
    if (!useCookies) {
      localStorage.setItem(parentItem, JSON.stringify(initialValue));
    }
  }, []);

  const getItem = useCallback(
    (key: string, defaultValue: T) => {
      const item = JSON.parse(localStorage.getItem(parentItem));
      if (!item[key]) {
        const newItem = { ...item, [key]: defaultValue };
        localStorage.setItem(parentItem, JSON.stringify(newItem));
        return newItem[key];
      }
      return item[key];
    },
    [parentItem],
  );

  const setItem = useCallback(
    (key: string, value: T) => {
      const item = JSON.parse(localStorage.getItem(parentItem));
      const newItem = { ...item, [key]: value };
      console.log(newItem);
      localStorage.setItem(parentItem, JSON.stringify(newItem));
    },
    [parentItem],
  );

  return { getItem, setItem };
};

export default useLocalStorage;
