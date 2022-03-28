import { useCallback, useState } from 'react';

export const useLocalStorage = (parentItem: string) => {
  const [item, setItem] = useState(JSON.parse(localStorage.getItem(parentItem)) || {});

  const getInfo = useCallback(
    (key: string, value = true) => {
      if (!item[key]) {
        const newItem = { ...item, [key]: value };
        localStorage.setItem(parentItem, JSON.stringify(newItem));
        setItem(newItem);
        return newItem[key];
      }
      return item[key];
    },
    [item, parentItem],
  );

  const setInfo = useCallback(
    (key: string, value: boolean) => {
      const newItem = { ...item, [key]: value };
      localStorage.setItem(parentItem, JSON.stringify(newItem));
      setItem(newItem);
    },
    [item, parentItem],
  );

  return { item, getInfo, setInfo };
};

export default useLocalStorage;
