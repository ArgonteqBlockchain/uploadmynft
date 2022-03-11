import { MAINNET } from 'src/config/constants/chainId';
import { GAS_PRICE_GWEI } from 'src/config/constants/gasPrice';

export function useGasPrice(): string {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return chainId === MAINNET.toString() ? GAS_PRICE_GWEI.default : GAS_PRICE_GWEI.testnet;
}
