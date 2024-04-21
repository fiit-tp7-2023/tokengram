import { defineStore } from 'pinia';

type NotificationType = 'info' | 'success' | 'error';

export interface Notification {
  title: string;
  content: string;
  type: NotificationType;
}

type StoreState = {
  items: Record<string, Notification>;
};

export const useNotificationStore = defineStore({
  id: 'notification',
  state: (): StoreState => ({
    items: {},
  }),
  actions: {
    addNotification(title: string, content: string, type: NotificationType = 'success', timeout = 50000) {
      const id = Math.random().toString(36).substring(7);
      this.items[id] = {
        title,
        content,
        type,
      };
      setTimeout(() => {
        if (this.items[id]) {
          delete this.items[id];
        }
      }, timeout);
    },
    remove(id: string) {
      delete this.items[id];
    },
  },
});
