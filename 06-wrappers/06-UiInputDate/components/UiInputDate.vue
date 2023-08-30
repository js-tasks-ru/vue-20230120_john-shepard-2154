<template>
  <UiInput :modelValue="formattedDate" :type="type" @input="$emit('update:modelValue', $event.target.valueAsNumber)">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
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
        let isValid = ['date', 'time', 'datetime-local'].includes(value);
        if (isValid) return true;
        throw new Error("Invalid prop 'type'");
      },
    },
    modelValue: {
      type: [Number, null],
    },
  },

  emits: ['update:modelValue'],

  computed: {
    formattedDate() {
      if (!this.modelValue) return null;

      let date = new Date(this.modelValue).toISOString();
      if (this.type == 'date') return date.slice(0, 10);
      else if (this.type == 'datetime-local') return date.slice(0, -8);
      else if (this.type == 'time') return date.slice(11, 16);
      else return undefined;
    },
  },
};
</script>
