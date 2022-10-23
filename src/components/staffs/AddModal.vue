<template>
  <div
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="addStaffModalTitle"
    aria-hidden="true"
    @[shownModalEvent]="onModalShown"
    @[hiddenModalEvent]="onModalHidden"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit="handleFormSubmit">
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
            <InputFloating ref="input" name="name" label="Name" class="mb-3" />
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
              type="submit"
              variant="primary"
              :busy="insertLoading"
              :disabled="!meta.valid"
            >
              Add
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStaffStore } from '@/stores/staffs';
import { Modal } from 'bootstrap';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { object as yupObject, string as yupString, type InferType } from 'yup';
import BaseButton from '../BaseButton.vue';
import InputFloating from '../InputFloating.vue';

const modal = ref<HTMLDivElement | null>(null);
const input = ref<InstanceType<typeof InputFloating> | null>(null);
const router = useRouter();
const staffStore = useStaffStore();
const { insertLoading, insertError } = storeToRefs(staffStore);

const validationSchema = yupObject({
  name: yupString().required()
});

const { handleSubmit, resetForm, meta } = useForm<
  InferType<typeof validationSchema>
>({
  validationSchema,
  initialValues: {
    name: ''
  }
});

const shownModalEvent = 'shown.bs.modal';
const onModalShown = () => {
  input.value?.inputEl?.focus();
};

const hiddenModalEvent = 'hidden.bs.modal';
const onModalHidden = () => {
  resetForm();
};

const handleFormSubmit = handleSubmit(async (values) => {
  staffStore.insert(values);
});

staffStore.$onAction(({ name, after }) => {
  after((result) => {
    if (name === 'insert' && !insertError.value && modal.value) {
      const thisModal = Modal.getOrCreateInstance(modal.value);
      thisModal.hide();

      router.push(`/staffs/${result}`);
    }
  });
});
</script>
