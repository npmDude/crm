<template>
  <tr>
    <td :colspan="colspan" :class="['text-center', textVariant]">
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      >
      </span>
      {{ ` ` }}
      <strong>Loading...</strong>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  colspan?: number;
}

const props = defineProps<Props>();

const textVariant = computed(() =>
  props.variant ? `text-${props.variant}` : ''
);
</script>
