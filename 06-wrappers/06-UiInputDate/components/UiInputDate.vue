<template>
  <UiInput v-model="modelValueProxy" :type="type">
    <template v-if="$slots['left-icon']" #left-icon>
      <slot name="left-icon" />
    </template>

    <template v-if="$slots['right-icon']" #right-icon>
      <slot name="right-icon" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },
  
  props: {
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      },
    },
    modelValue: {
      type: [Number, null],
    },
  },

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        if (!this.modelValue) return null;

        if (this.type == 'date') {
          let date = new Date(this.modelValue);

          let year = date.getFullYear();
          let month = (date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
          let day = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate();

          return `${year}-${month}-${day}`;
        } else if (this.type == 'datetime-local') {
          let date = new Date(this.modelValue);
          return date
            .toISOString(navigator.language, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minutes: 'numeric',
            })
            .slice(0, -8);
        } else if (this.type == 'time') {
          let date = new Date(this.modelValue);

          let hours = date.getUTCHours().toString().length == 1 ? '0' + date.getUTCHours() : date.getUTCHours();
          let minutes = date.getUTCMinutes().toString().length == 1 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();

          return `${hours}:${minutes}`;
        }

        return null;
      },

      set(value) {
        let resultValue = null;

        if (value) {
          if (this.type == 'date') {
            let date = new Date(value);
            resultValue = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
          } else if (this.type == 'datetime-local') {
            let date = new Date(value);
            resultValue = Date.UTC(
              date.getUTCFullYear(),
              date.getUTCMonth(),
              date.getUTCDate(),
              date.getHours(),
              date.getMinutes(),
            );
          } else if (this.type == 'time') {
            resultValue = Date.UTC(1970, 0, 1, value.split(':')[0], value.split(':')[1]);
          }
        }

        this.$emit('update:modelValue', resultValue);
      },
    },
  },
};
</script>
