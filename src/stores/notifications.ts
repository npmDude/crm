import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Notification {
  key: number;
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
      key: new Date().getTime() + Math.random(),
      variant: 'info',
      dismissible: false,
      ...notification
    });
  }

  function remove(key: number) {
    notifications.value.splice(
      notifications.value.findIndex((n) => n.key === key),
      1
    );
  }

  return { notifications, enqueue, remove };
});
