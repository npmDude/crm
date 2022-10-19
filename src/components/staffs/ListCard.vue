<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex">
        <h2 class="card-title">Staff List</h2>

        <div class="ms-auto">
          <button
            type="button"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addStaffModal"
          >
            Add Staff
          </button>
        </div>
      </div>

      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
          </tr>
        </thead>

        <tbody>
          <LoadingTableRow v-if="getListLoading" :colspan="2" />

          <NoDataTableRow v-else-if="staffs.length === 0" :colspan="2" />

          <template v-else>
            <tr v-for="staff in staffs" :key="staff.id">
              <td>{{ staff.id }}</td>
              <td>{{ staff.name }}</td>
            </tr>
          </template>
        </tbody>
      </table>

      <StaffAddModal id="addStaffModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStaffStore } from '@/stores/staffs';
import { storeToRefs } from 'pinia';
import LoadingTableRow from '../LoadingTableRow.vue';
import NoDataTableRow from '../NoDataTableRow.vue';
import StaffAddModal from './AddModal.vue';

const staffStore = useStaffStore();
const { staffs, getListLoading } = storeToRefs(staffStore);
</script>
