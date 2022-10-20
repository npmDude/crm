<template>
  <table class="table table-sm">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
      </tr>
    </thead>

    <tbody>
      <TableLoadingRow v-if="getListLoading" :colspan="2" />

      <TableNoDataRow v-else-if="staffs.length === 0" :colspan="2" />

      <template v-else>
        <tr v-for="staff in staffs" :key="staff.id">
          <td>{{ staff.id }}</td>
          <td>{{ staff.name }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useStaffStore } from '@/stores/staffs';
import { storeToRefs } from 'pinia';
import TableLoadingRow from '../TableLoadingRow.vue';
import TableNoDataRow from '../TableNoDataRow.vue';

const staffStore = useStaffStore();
const { staffs, getListLoading } = storeToRefs(staffStore);
</script>
