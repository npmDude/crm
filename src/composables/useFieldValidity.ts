import type { FieldMeta } from 'vee-validate';
import { computed } from 'vue';

export default function useFieldValidity(fieldMeta: FieldMeta<unknown>) {
  const validity = computed(() => {
    if (fieldMeta.dirty || fieldMeta.validated) {
      return fieldMeta.valid ? 'is-valid' : 'is-invalid';
    }

    return null;
  });

  return { validity };
}
