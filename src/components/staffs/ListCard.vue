<template>
  <div class="card">
    <div class="card-body">
      <BaseTable
        :fields="fields"
        :items="staffs"
        :busy="getListLoading"
        small
        hover
        :per-page="10"
        :current-page="currentPage"
      >
        <template #cell(id)="{ value }">
          <RouterLink :to="`staffs/${value}`">{{ value }}</RouterLink>
        </template>
      </BaseTable>

      <BasePagination
        v-model="currentPage"
        :total-items="staffs.length"
        :per-page="10"
        align="center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStaffStore } from '@/stores/staffs';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import BasePagination from '../BasePagination.vue';
import BaseTable from '../BaseTable.vue';

const staffStore = useStaffStore();
const { staffs, getListLoading } = storeToRefs(staffStore);
const fields = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' }
];
const currentPage = ref(1);
</script>
