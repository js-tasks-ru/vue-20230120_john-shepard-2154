import { computed, isRef, unref } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) =>
    computed(() => {
      let reactiveOrNotArgs = [...args];
      let unreactiveArgs = [];

      reactiveOrNotArgs.forEach((arg) => {
        if (isRef(arg)) unreactiveArgs.push(unref(arg));
        else unreactiveArgs.push(arg);
      });

      return func(...unreactiveArgs);
    });
}
