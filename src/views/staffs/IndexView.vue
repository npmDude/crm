<template>
  <div class="container">
    <BasePageHeader>
      Staffs

      <template #actions>
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addStaffModal"
        >
          Add Staff
        </button>
      </template>
    </BasePageHeader>

    <StaffSearchForm class="mb-3" @submit="handleSubmit" />

    <StaffListTable />

    <StaffAddModal id="addStaffModal" />
  </div>
</template>

<script setup lang="ts">
import BasePageHeader from '@/components/BasePageHeader.vue';
import StaffAddModal from '@/components/staffs/AddModal.vue';
import StaffListTable from '@/components/staffs/ListTable.vue';
import StaffSearchForm from '@/components/staffs/SearchForm.vue';
import { useStaffStore } from '@/stores/staffs';

const staffStore = useStaffStore();

// On created
staffStore.getList();

const handleSubmit = (params: any) => {
  staffStore.getList(params);
};
</script>
