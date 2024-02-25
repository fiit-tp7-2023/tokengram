export {};

declare global {
  interface Window {
    ethereum?: import('web3').providers.Eip1193Provider;
  }
}
