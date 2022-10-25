<template>
  <nav aria-label="Search results pages">
    <ul :class="['pagination', align && `justify-content-${align}`]">
      <li :class="['page-item', modelValue === 1 && 'disabled']">
        <a
          class="page-link"
          href="#"
          :tabindex="modelValue === 1 ? -1 : undefined"
          @click="
            modelValue === 1 ? null : handlePageClick($event, modelValue - 1)
          "
        >
          {{ prevText }}
        </a>
      </li>

      <li :class="['page-item', modelValue === 1 && 'active']">
        <a class="page-link" href="#" @click="handlePageClick($event, 1)">1</a>
      </li>

      <li
        v-if="pageTotal >= 2"
        :class="[
          'page-item',
          { active: modelValue === secondPage, disabled: secondPage === '...' }
        ]"
      >
        <a
          class="page-link"
          href="#"
          :tabindex="secondPage === '...' ? -1 : undefined"
          @click="
            secondPage === '...' ? null : handlePageClick($event, secondPage)
          "
        >
          {{ secondPage }}
        </a>
      </li>

      <li
        v-if="pageTotal >= 3"
        :class="['page-item', modelValue === thirdPage && 'active']"
      >
        <a
          class="page-link"
          href="#"
          @click="handlePageClick($event, thirdPage)"
        >
          {{ thirdPage }}
        </a>
      </li>

      <li
        v-if="pageTotal >= 4"
        :class="['page-item', modelValue === fourthPage && 'active']"
      >
        <a
          class="page-link"
          href="#"
          @click="handlePageClick($event, fourthPage)"
        >
          {{ fourthPage }}
        </a>
      </li>

      <li
        v-if="pageTotal >= 5"
        :class="['page-item', modelValue === fifthPage && 'active']"
      >
        <a
          class="page-link"
          href="#"
          @click="handlePageClick($event, fifthPage)"
        >
          {{ fifthPage }}
        </a>
      </li>

      <li
        v-if="pageTotal >= 6"
        :class="[
          'page-item',
          { active: modelValue === sixthPage, disabled: sixthPage === '...' }
        ]"
      >
        <a
          class="page-link"
          href="#"
          :tabindex="sixthPage === '...' ? -1 : undefined"
          @click="
            sixthPage === '...' ? null : handlePageClick($event, sixthPage)
          "
        >
          {{ sixthPage }}
        </a>
      </li>

      <li
        v-if="pageTotal >= 7"
        :class="['page-item', modelValue === pageTotal && 'active']"
      >
        <a
          class="page-link"
          href="#"
          @click="handlePageClick($event, pageTotal)"
        >
          {{ pageTotal }}
        </a>
      </li>

      <li :class="['page-item', modelValue === pageTotal && 'disabled']">
        <a
          class="page-link"
          href="#"
          :tabindex="modelValue === pageTotal ? -1 : undefined"
          @click="
            modelValue === pageTotal
              ? null
              : handlePageClick($event, modelValue + 1)
          "
        >
          {{ nextText }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: number;
  totalItems: number;
  perPage: number;
  prevText?: string;
  nextText?: string;
  align?: 'start' | 'center' | 'end';
}

interface Emits {
  (e: 'update:modelValue', value: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  prevText: 'Prev',
  nextText: 'Next'
});
const emit = defineEmits<Emits>();

const pageTotal = computed(() => Math.ceil(props.totalItems / props.perPage));
const isPageOnFirstHalf = computed(() => isPageBetween(1, 4));
const isPageOnSecondHalf = computed(() =>
  isPageBetween(pageTotal.value - 3, pageTotal.value)
);

const secondPage = computed(() =>
  isPageOnFirstHalf.value || pageTotal.value < 8 ? 2 : '...'
);

const thirdPage = computed(() => {
  let page = props.modelValue - 1;

  if (isPageOnFirstHalf.value || pageTotal.value < 8) {
    page = 3;
  } else if (isPageOnSecondHalf.value) {
    page = pageTotal.value - 4;
  }

  return page;
});

const fourthPage = computed(() => {
  let page = props.modelValue;

  if (isPageOnFirstHalf.value || pageTotal.value < 8) {
    page = 4;
  } else if (isPageOnSecondHalf.value) {
    page = pageTotal.value - 3;
  }

  return page;
});

const fifthPage = computed(() => {
  let page = props.modelValue + 1;

  if (isPageOnFirstHalf.value || pageTotal.value < 8) {
    page = 5;
  } else if (isPageOnSecondHalf.value) {
    page = pageTotal.value - 2;
  }

  return page;
});

const sixthPage = computed(() => {
  let page: '...' | number = '...';

  if (pageTotal.value < 8) {
    page = 6;
  } else if (isPageOnSecondHalf.value) {
    page = pageTotal.value - 1;
  }

  return page;
});

const handlePageClick = (e: Event, page: number) => {
  e.preventDefault();
  emit('update:modelValue', page);
};

const isPageBetween = (min: number, max: number) =>
  props.modelValue >= min && props.modelValue <= max;
</script>
