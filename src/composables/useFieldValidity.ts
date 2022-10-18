import type { FieldMeta } from 'vee-validate';
import { computed } from 'vue';

export default function useFieldValidity(fieldMeta: FieldMeta<unknown>) {
  const validity = computed(() =>
    fieldMeta.dirty || fieldMeta.validated ? fieldMeta.valid : null
  );

  const validityClass = computed(() => {
    if (validity.value) {
      return 'is-valid';
    } else if (validity.value === false) {
      return 'is-valid';
    }

    return null;
  });

  return { validityClass };
}
