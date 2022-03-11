import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { IToken } from 'src/models/nft';

export const useTokens = ({ collectionAddress, owner }: { collectionAddress?: string; owner?: string }) => {
  const [tokens, setTokens] = useState([] as IToken[]);
  let url = `http://${process.env.REACT_APP_API}/tokens/?`;
  if (collectionAddress != undefined && collectionAddress != null) {
    url += `address=${collectionAddress}&`;
  }
  if (owner != undefined && owner != null) {
    url += `data.to=${owner}`;
  }

  useMemo(() => {
    console.info('CALLING API');
    axios({
      method: 'get',
      url,
      responseType: 'json',
    })
      .then((response) => {
        if (response && response.data) {
          console.info('GOT TOKENS', response.data);
          setTokens(response.data as IToken[]);
        }
      })
      .catch((error) => {
        console.error('Error in Getting tokens: ', error);
      });
  }, [url]);

  return { tokens };
};
