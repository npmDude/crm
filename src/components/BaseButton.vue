<template>
  <button
    type="button"
    :class="['btn', `btn-${variant}`, 'position-relative']"
    :disabled="busy || disabled"
  >
    <div v-if="busy" class="position-absolute top-50 start-50 translate-middle">
      <div
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  busy?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  busy: false
});
</script>
