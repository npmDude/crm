<template>
  <footer class="mt-auto bg-light">
    <div class="container">
      <div class="content">
        <span>&copy; {{ year }} npmDude</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const year = dayjs().year();
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
