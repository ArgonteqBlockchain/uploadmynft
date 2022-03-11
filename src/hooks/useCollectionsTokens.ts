import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { useCollections } from './useCollections';
import { IToken } from 'src/models/nft';
import { Collection } from 'src/models/collection';

export const useCollectionsTokens = ({ collectionOwner }: { collectionOwner?: string }) => {
  const [tokens, setTokens] = useState([] as IToken[]);
  const [collections, setCollections] = useState([] as Collection[]);

  const { account } = useWeb3React();
  let localOwner = collectionOwner;
  if (!localOwner) {
    localOwner = account;
  }

  useMemo(async () => {
    console.info('CALLING API');
    axios({
      method: 'get',
      url: `https://${process.env.REACT_APP_API}/collections/?owner=${account}`,
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
  // const [tempData, setdata] = useState();
  useMemo(async () => {
    // const { collections } = useCollections({ owner: localOwner });
    console.info('CALLING API');
    const localD = [];
    // if (!tempData) {
    for (const collection of collections) {
      // const t = tokens;
      const { data } = await axios.get(`https://${process.env.REACT_APP_API}/tokens/?address=${collection.address}`);
      // setdata(data);
      if (data && data.length > 0) {
        // console.log(data);
        // console.log(t);
        localD.push(...data);
      }
      // }
    }
    setTokens(localD);
  }, [collections]);

  return { collections, tokens };
};
