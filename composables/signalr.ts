import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';

import type {
  ChatInvitationResponseDTO,
  ChatInvitationResponseRequestDTO,
  ChatMessageRequestDTO,
  ChatMessageResponseDTO,
  ChatRequestDTO,
  ChatResponseDTO,
  ReceivedChatInvitationResponseDTO,
  UserResponseDTO,
} from '~/types/dtos';

const CHAT_EVENTS = [
  'ReceivedChatInvitation',
  'UserJoinedChat',
  'UserLeftChat',
  'UserDeclinedChatInvitation',
  'ReceivedMessage',
  'DeletedMessage',
  'AdminDeletedChat',
  'AdminInvitedUser',
  'NewAdmin',
  'CreatedChatFromAnotherDevice',
  'JoinedChatFromAnotherDevice',
  'DeclinedChatInvitationFromAnotherDevice',
  'LeftChatFromAnotherDevice',
  'AdminDeletedChatInvitation',
] as const;

type ChatEvent = (typeof CHAT_EVENTS)[number];

type ChatEventCb = {
  ReceivedChatInvitation: (dto: ReceivedChatInvitationResponseDTO) => void;
  UserJoinedChat: (chatId: number, dto: UserResponseDTO) => void;
  UserLeftChat: (chatId: number, userAddress: string) => void;
  UserDeclinedChatInvitation: (chatId: number, userAddress: string) => void;
  ReceivedMessage: (chatId: number, dto: ChatMessageResponseDTO) => void;
  DeletedMessage: (chatId: number, chatMessageId: number) => void;
  AdminDeletedChat: (chatId: number) => void;
  AdminInvitedUser: (chatId: number, dto: ChatInvitationResponseDTO) => void;
  NewAdmin: (chatId: number, dto: UserResponseDTO) => void;
  CreatedChatFromAnotherDevice: (dto: ChatResponseDTO) => void;
  JoinedChatFromAnotherDevice: (dto: ChatResponseDTO) => void;
  DeclinedChatInvitationFromAnotherDevice: (chatId: number) => void;
  LeftChatFromAnotherDevice: (chatId: number) => void;
  AdminDeletedChatInvitation: (chatId: number) => void;
};

class SignalHubError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly errors: string[],
  ) {
    super(message);
  }
}

/**
 * SignalR connection
 */
const connection = ref<HubConnection | null>(null);

/**
 * SignalR composable
 * @returns SignalR composable
 */
export const useSignalR = () => {
  const initialize = (token: string) => {
    const RUNTIME_CONFIG = useRuntimeConfig();
    connection.value = new HubConnectionBuilder()
      .withUrl(RUNTIME_CONFIG.public.signalRUrl, {
        transport: HttpTransportType.WebSockets,
        skipNegotiation: true,
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  };

  /**
   * Connection state
   * @returns Connection state
   */
  const connectionState = computed<HubConnectionState>(
    () => connection.value?.state ?? HubConnectionState.Disconnected,
  );

  /**
   * Register a handler for a SignalR event
   * @param event Event to handle
   * @param cb Callback function
   */
  const registerHandler = <E extends ChatEvent>(event: E, cb: ChatEventCb[E]) => {
    if (!connection.value) {
      throw new Error('Connection not initialized');
    }
    if (!CHAT_EVENTS.includes(event)) {
      throw new Error('Invalid event handler: ' + event);
    }
    connection.value.on(event, cb);
  };

  const registerErrorHandler = (cb: (error: Error) => void) => {
    if (!connection.value) {
      throw new Error('Connection not initialized');
    }
    connection.value.on('error', (error) => {
      if (error) {
        cb(error);
      }
    });
  };

  /**
   * Send a signal to the SignalR hub
   * @param type Type of the signal
   * @param data Data to send
   * @returns Response data
   */
  const sendSignal = async <R = void>(type: string, ...data: any[]) => {
    if (!connection.value) {
      throw new Error('Connection not initialized');
    }
    const result = await connection.value.invoke(type, ...data);
    if (!result?.isError) {
      return result as R;
    }
    const err = new SignalHubError(result.statusCode, result.message, result.errors);
    return Promise.reject<R>(err);
  };

  /**
   * Connect to the SignalR hub
   */
  const connect = async () => {
    if (!connection.value) {
      throw new Error('Connection not initialized');
    }
    await connection.value.start();
  };

  /**
   * Disconnect from the SignalR hub
   */
  const disconnect = async () => {
    if (!connection.value) {
      throw new Error('Connection not initialized');
    }
    await connection.value.stop();
  };

  /**
   * Create a chat
   * @param addresses Array of user addresses
   * @param name Optional chat name
   * @returns Chat object
   */
  const createChat = async (addresses: string[], name?: string) =>
    await sendSignal<ChatResponseDTO>('CreateChat', {
      userAddresses: addresses,
      name,
    } as ChatRequestDTO);

  /**
   * Invite a user to a chat
   * @param chatId ID of the chat
   * @param address  Address of the user to invite
   */
  const inviteToChat = async (chatId: number, address: string) =>
    await sendSignal<ChatInvitationResponseDTO>('InviteToChat', chatId, address);

  /**
   * Respond to a chat invitation
   * @param chatId ID of the chat
   * @param accept Whether to accept or decline the invitation
   * @returns Chat object if accepted, undefined if declined
   */
  const respondToChatInvitation = async (chatId: number, accept: boolean) =>
    await sendSignal<ChatResponseDTO | undefined>('RespondToChatInvitation', chatId, {
      accept,
    } as ChatInvitationResponseRequestDTO);

  /**
   * Leave a chat
   * @param chatId  ID of the chat
   */
  const leaveChat = async (chatId: number) => await sendSignal('LeaveChat', chatId);

  /**
   * Promote a user to admin
   * @param chatId  ID of the chat
   * @param address Address of the user to promote
   */
  const promoteToAdmin = async (chatId: number, address: string) => await sendSignal('PromoteToAdmin', chatId, address);

  /**
   * Send a message to a chat
   * @param chatId ID of the chat
   * @param content Message content
   * @param parentMessageId ID of the parent message, if any
   * @returns Chat message object
   */
  const sendMessage = async (chatId: number, content: string, parentMessageId?: number) =>
    await sendSignal<ChatMessageResponseDTO>('SendMessage', chatId, {
      content,
      parentMessageId,
    } as ChatMessageRequestDTO);

  /**
   * Delete a message
   * @param chatId ID of the chat
   * @param chatMessageId ID of the message
   */
  const deleteMessage = async (chatId: number, chatMessageId: number) =>
    await sendSignal('DeleteMessage', chatId, chatMessageId);

  return {
    initialize,
    registerHandler,
    registerErrorHandler,
    sendSignal,
    connect,
    disconnect,
    connectionState,
    createChat,
    inviteToChat,
    respondToChatInvitation,
    leaveChat,
    promoteToAdmin,
    sendMessage,
    deleteMessage,
  };
};
