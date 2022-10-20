<template>
  <div
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="addStaffModalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addStaffModalTitle">Add Staff</h1>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              id="field-name"
              type="text"
              v-model="value"
              :class="['form-control', validityClass]"
              placeholder="Name"
              required
            />
            <label for="field-name">Name</label>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>

          <BaseButton
            variant="primary"
            :busy="insertLoading"
            :disabled="!valid"
            @click="handleSaveClick"
          >
            Add
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFieldValidity from '@/composables/useFieldValidity';
import { useStaffStore } from '@/stores/staffs';
import { onKeyStroke } from '@vueuse/core';
import { Modal } from 'bootstrap';
import { storeToRefs } from 'pinia';
import { useField } from 'vee-validate';
import { ref } from 'vue';
import { string as yupString } from 'yup';
import BaseButton from '../BaseButton.vue';

const { value, meta } = useField<string>('name', yupString().required());
const { valid, validityClass } = useFieldValidity(meta);
const staffStore = useStaffStore();
const { insertLoading, insertError } = storeToRefs(staffStore);
const modal = ref<HTMLDivElement | null>(null);

onKeyStroke('Enter', (e) => {
  e.preventDefault();

  handleSaveClick();
});

const handleSaveClick = () => {
  staffStore.insert({
    name: value.value
  });
};

staffStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'insert' && !insertError.value && modal.value) {
      const thisModal = Modal.getOrCreateInstance(modal.value);
      thisModal.hide();
    }
  });
});
</script>
