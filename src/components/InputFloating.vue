<template>
  <div class="form-floating">
    <input
      ref="input"
      :type="type"
      :id="`field-${name}`"
      :name="name"
      :value="inputValue"
      :placeholder="label"
      :class="['form-control', validityClass]"
      @input="handleInput"
    />
    <label :for="`field-${name}`">{{ label }}</label>
    <div class="invalid-feedback">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useFieldValidity from '@/composables/useFieldValidity';
import { useField } from 'vee-validate';
import { ref, toRef } from 'vue';
import type { AnySchema } from 'yup';

interface Props {
  name: string;
  label: string;
  type?: string;
  value?: string | number | null;
  rules?: AnySchema;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  value: ''
});
const input = ref<HTMLInputElement | null>(null);

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  setValue,
  meta
} = useField<string | number | null>(name, props.rules, {
  initialValue: props.value
});
const { validityClass } = useFieldValidity(meta);

const focus = () => {
  input.value?.focus();
};

const handleInput = (e: Event) => {
  if (props.type === 'number') {
    handleNumberInput(e);
  } else {
    handleTextInput(e);
  }
};

const handleTextInput = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value;

  if (['', null, undefined].includes(inputValue)) {
    setValue(null);
  } else {
    setValue(inputValue.trim());
  }
};

const handleNumberInput = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value;

  if (['', null, undefined].includes(inputValue)) {
    setValue(null);
    return;
  }

  const numberValue = Number(inputValue);

  if (isNaN(numberValue)) {
    setValue(null);
  } else {
    setValue(numberValue);
  }
};

defineExpose({
  focus
});
</script>
