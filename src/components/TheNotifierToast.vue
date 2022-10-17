<template>
  <div
    ref="toast"
    :class="['toast border-0', toastVariant]"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    @[hiddenEvent]="handleToastHidden"
  >
    <div class="d-flex">
      <div class="toast-body">{{ message }}</div>

      <button
        v-if="dismissible"
        type="button"
        :class="['btn-close me-2 m-auto', isWhiteCloseButton]"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'bootstrap';
import { computed, onMounted, ref } from 'vue';

interface Props {
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

interface Emits {
  (e: 'hidden', id: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const toast = ref<HTMLDivElement | null>(null);

const toastVariant = computed(() => `text-bg-${props.variant}`);

const isWhiteCloseButton = computed(() =>
  props.variant !== 'light' ? 'btn-close-white' : ''
);

onMounted(() => {
  const thisToast = Toast.getOrCreateInstance(toast.value!);
  thisToast?.show();
});

const hiddenEvent = 'hidden.bs.toast';
const handleToastHidden = () => {
  emit('hidden', props.id);
};
</script>
