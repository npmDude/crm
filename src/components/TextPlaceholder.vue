<template>
  <div v-if="busy" class="placeholder-glow">
    <span :class="`placeholder col-${col}`"></span>
  </div>

  <slot v-else></slot>
</template>

<script setup lang="ts">
interface Props {
  col?: number;
  busy?: boolean;
}

withDefaults(defineProps<Props>(), {
  col: 12,
  busy: false
});
</script>
