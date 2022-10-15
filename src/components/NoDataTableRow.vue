<template>
  <tr>
    <td :colspan="colspan" class="text-center">
      {{ message }}
    </td>
  </tr>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
  colspan?: number;
}

withDefaults(defineProps<Props>(), {
  message: 'No data to display.'
});
</script>
