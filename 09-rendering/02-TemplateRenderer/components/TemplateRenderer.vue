<script>
import { compile, defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  render(...args) {
    const instance = getCurrentInstance();
    instance.components = this.$props.components;

    const renderFunction = compile(this.$props.template);
    return renderFunction.apply(this, args);
  },
});
</script>
