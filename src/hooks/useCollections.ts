import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { Collection } from 'src/models/collection';

export const useCollections = ({ owner }: { owner?: string }) => {
  const [collections, setCollections] = useState([] as Collection[]);
  const { account } = useWeb3React();
  let localOwner = owner;
  if (!localOwner) {
    localOwner = account;
  }
  useMemo(() => {
    console.info('CALLING API');
    axios({
      method: 'get',
      url: `http://${process.env.REACT_APP_API}/collections/?owner=${account}`,
      responseType: 'json',
    })
      .then((response) => {
        if (response && response.data) {
          console.info('GOT COLLECTIONS', response.data);
          setCollections(response.data as Collection[]);
        }
      })
      .catch((error) => {
        console.error('Error in RecentCollections: ', error);
      });
  }, [account]);

  return { collections };
};
