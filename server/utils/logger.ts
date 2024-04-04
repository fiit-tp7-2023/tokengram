import { createConsola } from 'consola';

export const useLogger = (namespace: string) => {
  const consola = createConsola({ defaults: { tag: namespace } });
  return consola;
};
