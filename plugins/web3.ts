import { Web3 } from 'web3';

export default defineNuxtPlugin(() => {
  if (!process.client) return; // don't run on server side
  return {
    provide: {
      web3: window.ethereum ? new Web3(window.ethereum) : null,
    },
  };
});
