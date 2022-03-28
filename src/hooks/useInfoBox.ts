import { useCallback, useState } from 'react';

export const useInfoBox = () => {
  const [infoBox, setInfoBox] = useState(JSON.parse(localStorage.getItem('infoBox')) || {});

  const getInfo = useCallback(
    (page: string) => {
      if (!infoBox[page]) {
        const newInfoBox = { ...infoBox, [page]: true };
        localStorage.setItem('infoBox', JSON.stringify(newInfoBox));
        setInfoBox(newInfoBox);
        return newInfoBox[page];
      }
      return infoBox[page];
    },
    [infoBox],
  );

  const setInfo = useCallback(
    (page: string, value: boolean) => {
      const newInfoBox = { ...infoBox, [page]: value };
      localStorage.setItem('infoBox', JSON.stringify(newInfoBox));
      setInfoBox(newInfoBox);
    },
    [infoBox],
  );

  return { infoBox, getInfo, setInfo };
};

export default useInfoBox;
