import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const RUNTIME_CONFIG = useRuntimeConfig();

export const useSignalR = () => {
  const connection = ref(
    new HubConnectionBuilder()
      .withUrl(RUNTIME_CONFIG.restApiUrl + '/hubs/chat')
      .configureLogging(LogLevel.Information)
      .build(),
  );

  const registerHandler = (event: string, cb: (data: any) => void) => {
    connection.value.on(event, cb);
  };

  const sendSignal = async (type: string, data: any) => {
    await connection.value.invoke(type, data);
  };

  const startConnection = async () => {
    await connection.value.start();
  };

  return {
    registerHandler,
    sendSignal,
    startConnection,
  };
};
