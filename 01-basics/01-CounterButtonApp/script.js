import { defineComponent } from 'vue';
import { createApp } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',

  data() {
    return {
      counterValue: 0,
    };
  },

  methods: {
    incrementCounterValue() {
      this.counterValue += 1;
    },
  },
});

const app = createApp(App);
const vm = app.mount('#app');
