<template>
  <table :class="['table', { 'table-sm': small, 'table-striped': striped }]">
    <thead>
      <tr>
        <th v-for="th in fields" :key="th.key" scope="col">
          {{ th.label ?? th.key }}
        </th>
      </tr>
    </thead>

    <tbody>
      <TableLoadingRow v-if="busy" :colspan="fieldCount" />

      <TableNoDataRow v-else-if="itemCount === 0" :colspan="fieldCount" />

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
import TableLoadingRow from './TableLoadingRow.vue';
import TableNoDataRow from './TableNoDataRow.vue';

interface Props {
  fields: { key: string; label?: string }[];
  items?: any[];
  busy?: boolean;
  small?: boolean;
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
