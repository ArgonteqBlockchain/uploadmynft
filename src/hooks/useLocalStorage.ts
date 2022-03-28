import { useCallback, useState } from 'react';

export const useLocalStorage = <T>(parentItem: string, initialValue: T, useCookies = true) => {
  let iniItem = initialValue;
  if (useCookies) {
    iniItem = (JSON.parse(localStorage.getItem(parentItem)) as T) || initialValue;
  }

  const [item, setMyItem] = useState(iniItem);

  const getItem = useCallback(
    (key: string, defaultValue: T) => {
      if (!item[key]) {
        const newItem = { ...item, [key]: defaultValue };
        localStorage.setItem(parentItem, JSON.stringify(newItem));
        setMyItem(newItem);
        return newItem[key];
      }
      return item[key];
    },
    [item, parentItem],
  );

  const setItem = useCallback(
    (key: string, value: T) => {
      const newItem = { ...item, [key]: value };
      localStorage.setItem(parentItem, JSON.stringify(newItem));
      setMyItem(newItem);
    },
    [item, parentItem],
  );

  return { item, getItem, setItem };
};

export default useLocalStorage;
