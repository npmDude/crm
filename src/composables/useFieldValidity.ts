import type { FieldMeta } from 'vee-validate';
import { computed } from 'vue';

export default function useFieldValidity(fieldMeta: FieldMeta<unknown>) {
  const valid = computed(() =>
    fieldMeta.dirty || fieldMeta.validated ? fieldMeta.valid : null
  );

  const validityClass = computed(() => {
    if (valid.value) {
      return 'is-valid';
    } else if (valid.value === false) {
      return 'is-valid';
    }

    return null;
  });

  return { valid, validityClass };
}
