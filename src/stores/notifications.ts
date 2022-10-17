import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Notification {
  id: number;
  message: string;
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  dismissible: boolean;
}

type PartialNotification = Pick<Notification, 'message'> &
  Pick<Partial<Notification>, 'variant' | 'dismissible'>;

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([]);

  function enqueue(notification: PartialNotification) {
    notifications.value.push({
      id: new Date().getTime() + Math.random(),
      variant: 'info',
      dismissible: false,
      ...notification
    });
  }

  function remove(id: number) {
    notifications.value.splice(
      notifications.value.findIndex((n) => n.id === id),
      1
    );
  }

  return { notifications, enqueue, remove };
});
