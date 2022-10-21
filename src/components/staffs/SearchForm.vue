<template>
  <form @submit="handleFormSubmit">
    <div class="row mb-3">
      <div class="col-md">
        <div class="form-floating mb-3 mb-md-0">
          <input
            id="field-id"
            type="text"
            :value="idValue"
            :class="['form-control', idValidityClass]"
            placeholder="ID"
            @input="handleNumberInput($event, setIdValue)"
          />
          <label for="field-id">ID</label>
        </div>
      </div>

      <div class="col-md">
        <div class="form-floating">
          <input
            id="field-name"
            type="text"
            :value="nameValue"
            :class="['form-control', nameValidityClass]"
            placeholder="Name"
            @input="handleTextInput($event, setNameValue)"
          />
          <label for="field-name">Name</label>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <BaseButton type="submit" variant="primary">Search</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import useFieldValidity from '@/composables/useFieldValidity';
import { handleNumberInput, handleTextInput } from '@/utils/handleInput';
import { useField, useForm } from 'vee-validate';
import {
  number as yupNumber,
  object as yupObject,
  string as yupString,
  type InferType
} from 'yup';
import BaseButton from '../BaseButton.vue';

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

const {
  value: idValue,
  meta: idMeta,
  setValue: setIdValue
} = useField<number | null>('id');
const { validityClass: idValidityClass } = useFieldValidity(idMeta);

const {
  value: nameValue,
  meta: nameMeta,
  setValue: setNameValue
} = useField<string | null>('name');
const { validityClass: nameValidityClass } = useFieldValidity(nameMeta);

const handleFormSubmit = handleSubmit(async (values) => {
  emit('submit', values);
});
</script>
