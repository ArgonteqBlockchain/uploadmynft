import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
// import getNodeUrl from './getRpcUrl';

export enum ConnectorNames {
  Injected = 'injected',
}

const POLLING_INTERVAL = 12000;
// const rpcUrl = getNodeUrl();
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

export const injected = new InjectedConnector({ supportedChainIds: [chainId] });

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
};

export const getLibrary = (provider): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
