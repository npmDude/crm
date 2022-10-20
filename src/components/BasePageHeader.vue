<template>
  <div v-if="hasActions" class="d-flex">
    <h1 class="mb-0"><slot></slot></h1>

    <div class="d-flex align-items-end ms-auto">
      <slot name="actions"></slot>
    </div>
  </div>

  <h1 v-else class="mb-0"><slot></slot></h1>

  <hr />
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

const slots = useSlots();
const hasActions = computed(() => !!slots.actions);
</script>
