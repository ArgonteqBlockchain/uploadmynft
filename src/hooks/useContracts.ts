import { Contract, ethers } from 'ethers';
import { simpleRpcProvider } from 'src/utils/providers';
import CONTRACTS from 'src/config/constants/contracts';
import factoryAbi from 'src/config/abi/Factory.json';
import collectionAbi from 'src/config/abi/Collection.json';
import useActiveWeb3React from './useActiveWeb3React';
import { useMemo } from 'react';

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getAddress = (address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return address[chainId] ? address[chainId] : address['1'];
};

const getFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(factoryAbi, getAddress(CONTRACTS.factory), signer);
};

const getCollectionContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(collectionAbi, address, signer);
};

export function useFactoryContract(): Contract | null {
  const { library } = useActiveWeb3React();
  return useMemo(() => getFactoryContract(library.getSigner()), [library]);
}

export function useCollectionContract(address: string): Contract | null {
  const { library } = useActiveWeb3React();
  return useMemo(() => getCollectionContract(address, library.getSigner()), [address, library]);
}
