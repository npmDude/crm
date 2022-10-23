<template>
  <form @submit="handleFormSubmit">
    <div class="row mb-3">
      <div class="col-md">
        <InputFloating name="id" type="number" label="ID" />
      </div>

      <div class="col-md">
        <InputFloating name="name" label="Name" />
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <BaseButton type="submit" variant="primary">Search</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import {
  number as yupNumber,
  object as yupObject,
  string as yupString,
  type InferType
} from 'yup';
import BaseButton from '../BaseButton.vue';
import InputFloating from '../InputFloating.vue';

interface Emits {
  (e: 'submit', params: any): void;
}

const emit = defineEmits<Emits>();

const validationSchema = yupObject({
  id: yupNumber().nullable(),
  name: yupString().nullable()
});

const { handleSubmit } = useForm<InferType<typeof validationSchema>>({
  validationSchema,
  initialValues: {
    id: null,
    name: null
  }
});

const handleFormSubmit = handleSubmit(async (values) => {
  emit('submit', values);
});
</script>
