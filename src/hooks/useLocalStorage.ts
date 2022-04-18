import { useCallback, useEffect } from 'react';

export const useLocalStorage = <T>(parentItem: string, initialValue: Record<string, T>, useCookies = true) => {
  console.log({ parentItem, initialValue, useCookies });
  useEffect(() => {
    console.log('IN use effect');
    if (!useCookies) {
      localStorage.setItem(parentItem, JSON.stringify(initialValue));
    } else {
      // check for new fields in initialValue
      const newFields = Object.keys(initialValue).filter(
        (key) => !(key in JSON.parse(localStorage.getItem(parentItem))),
      );
      const oldFields = Object.keys(initialValue).filter((key) => key in JSON.parse(localStorage.getItem(parentItem)));
      console.log('New Fields: ', newFields);
      console.log('OLD Fields: ', oldFields);
      if (newFields.length > 0) {
        const currentValue = JSON.parse(localStorage.getItem(parentItem) || '{}');
        newFields.forEach((key) => {
          currentValue[key] = initialValue[key];
        });
        localStorage.setItem(parentItem, JSON.stringify(currentValue));
      }
      if (oldFields.length > 0) {
        // use old fields
        const currentValue = JSON.parse(localStorage.getItem(parentItem) || '{}');
        oldFields.forEach((key) => {
          initialValue[key] = currentValue[key];
        });
        localStorage.setItem(parentItem, JSON.stringify(initialValue));
      }
    }
  }, []);

  const getItem = useCallback(
    (key: string, defaultValue: T) => {
      const item = JSON.parse(localStorage.getItem(parentItem) || '{}');
      console.log(key, defaultValue, item);
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
      const item = JSON.parse(localStorage.getItem(parentItem) || '{}');
      const newItem = { ...item, [key]: value };
      console.log(newItem);
      localStorage.setItem(parentItem, JSON.stringify(newItem));
    },
    [parentItem],
  );

  return { getItem, setItem };
};

export default useLocalStorage;
