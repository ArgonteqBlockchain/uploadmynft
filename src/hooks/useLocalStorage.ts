import { useCallback, useState } from 'react';

export const useLocalStorage = (parentItem: string) => {
  const [item, setMyItem] = useState(JSON.parse(localStorage.getItem(parentItem)) || {});

  const getItem = useCallback(
    (key: string, value = true) => {
      if (!item[key]) {
        const newItem = { ...item, [key]: value };
        localStorage.setItem(parentItem, JSON.stringify(newItem));
        setMyItem(newItem);
        return newItem[key];
      }
      return item[key];
    },
    [item, parentItem],
  );

  const setItem = useCallback(
    (key: string, value: boolean) => {
      const newItem = { ...item, [key]: value };
      localStorage.setItem(parentItem, JSON.stringify(newItem));
      setMyItem(newItem);
    },
    [item, parentItem],
  );

  return { item, getItem, setItem };
};

export default useLocalStorage;
