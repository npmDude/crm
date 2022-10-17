<template>
  <TheHeader />

  <main class="position-relative">
    <TheNotifier :max-snack="3" />

    <RouterView />
  </main>

  <TheFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';
import TheNotifier from './components/TheNotifier.vue';
</script>
