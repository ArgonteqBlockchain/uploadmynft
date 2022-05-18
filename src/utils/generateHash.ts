import cryptoRandomString from 'crypto-random-string';
import createKeccakHash from 'keccak';

/**
 *
 * @dev Function to generate random hash based on
 * (collection_name + symbol + address + random_salt).
 * This function also generates a random salt, appends it to
 *
 * @param {string} name     Collection name
 * @param {string} symbol   Collection Symbol
 * @param {string} address  Collection address
 * @return {string}
 */
function generateHash(name: string, symbol: string, address: string): string {
  // const createKeccakHash = require('keccak');
  const saltLen = Math.floor(Math.random() * (50 - 10) + 10);
  const salt = cryptoRandomString({ length: saltLen, type: 'alphanumeric' });
  return createKeccakHash('keccak256').update(`${name}${symbol}${address}${salt}`).digest('hex');
}

export default generateHash;
