<template>
  <table
    :class="[
      'table',
      { 'table-sm': small, 'table-striped': striped, 'table-hover': hover }
    ]"
  >
    <thead>
      <tr>
        <th v-for="th in fields" :key="th.key" scope="col">
          {{ th.label ?? th.key }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="busy">
        <td :colspan="fieldCount">
          <slot name="table-busy">
            <div class="text-center">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              >
              </span>
              {{ ` ` }}
              <strong>Loading...</strong>
            </div>
          </slot>
        </td>
      </tr>

      <tr v-else-if="itemCount === 0">
        <td :colspan="fieldCount" class="text-center">
          <slot name="empty">No data to display.</slot>
        </td>
      </tr>

      <template v-else>
        <tr v-for="(item, index) in paginatedItems" :key="index">
          <td v-for="th in fields" :key="`${th.key}-${index}`">
            <slot
              :name="`cell(${th.key})`"
              :field="th"
              :index="index"
              :item="item"
              :value="item[th.key]"
            >
              {{ item[th.key] }}
            </slot>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  fields: { key: string; label?: string }[];
  items?: any[];
  busy?: boolean;
  small?: boolean;
  hover?: boolean;
  striped?: boolean;
  perPage?: number;
  currentPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  perPage: 0,
  currentPage: 1
});
const fieldCount = computed(() => props.fields.length);
const startIndex = computed(() => (props.currentPage - 1) * props.perPage);
const excludedIndex = computed(() =>
  props.perPage ? startIndex.value + props.perPage : undefined
);
const paginatedItems = computed(() =>
  props.items.slice(startIndex.value, excludedIndex.value)
);
const itemCount = computed(() => paginatedItems.value.length);
</script>
