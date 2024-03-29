import { ref, watch } from 'vue';
import debounce from 'lodash/debounce';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */

export function debouncedRef(source, wait) {
  const debounced = ref(undefined);

  const debounceUpdateReturnValue = debounce((newValue) => {
    debounced.value = newValue;
  }, wait);

  const updateReturnValue = (newValue) => {
    debounced.value = newValue;
  };

  watch(
    source,
    (newValue) => {
      if (debounced.value === undefined) updateReturnValue(newValue);
      debounceUpdateReturnValue(newValue);
    },
    {
      immediate: true,
    },
  );

  return debounced;
}
