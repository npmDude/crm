<template>
  <div
    :class="`toast-container ${verticalPlacement} ${horizontalPlacement} p-3`"
  >
    <TheNotifierToast
      v-for="notification in currentNotifications"
      :key="notification.id"
      v-bind="notification"
      @hidden="handleToastHidden"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import {
  useNotificationStore,
  type Notification
} from '@/stores/notifications';
import TheNotifierToast from './TheNotifierToast.vue';

interface Props {
  horizontalAnchor?: 'start' | 'center' | 'end';
  verticalAnchor?: 'top' | 'center' | 'bottom';
  maxSnack: number;
}

const props = withDefaults(defineProps<Props>(), {
  horizontalAnchor: 'end',
  verticalAnchor: 'top',
  maxSnack: 1
});
const horizontalPlacement = computed(() =>
  props.horizontalAnchor === 'center'
    ? 'start-50'
    : `${props.horizontalAnchor}-0`
);
const verticalPlacement = computed(() =>
  props.verticalAnchor === 'center' ? 'top-50' : `${props.verticalAnchor}-0`
);

const handledIds = ref<number[]>([]);
const currentNotifications = ref<Notification[]>([]);
const queue = ref<Notification[]>([]);

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);

watch(
  notifications,
  (notificationList) => {
    for (const notification of notificationList) {
      // Do nothing if notification is already handled
      if (handledIds.value.includes(notification.id)) continue;

      // Enqueue notification
      enqueueNotification(notification);

      // Keep track of notifications that we've handled
      handledIds.value.push(notification.id);

      // Remove notification from store
      notificationStore.remove(notification.id);
    }
  },
  { deep: true }
);

/**
 * Adds a new snackbar to the queue to be presented.
 */
const enqueueNotification = (notification: Notification) => {
  queue.value.push(notification);

  processQueue();
};

/**
 * Display toast if there's space for it.
 */
const processQueue = () => {
  if (currentNotifications.value.length < props.maxSnack) {
    const notification = queue.value.shift();

    if (notification) {
      currentNotifications.value.push(notification);
    }
  }
};

/**
 * Deletes the notification from the array
 * and displays the next notification from the queue.
 * @param id The id of the notification
 */
const handleToastHidden = (id: number) => {
  currentNotifications.value.splice(
    currentNotifications.value.findIndex((n) => n.id === id),
    1
  );

  processQueue();
};
</script>
