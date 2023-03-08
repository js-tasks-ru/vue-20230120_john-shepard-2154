import { defineComponent } from 'vue';
import { createApp } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',

  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      currentOperation: 'sum',
    };
  },

  computed: {
    resultValue() {
      if (this.currentOperation == 'sum') return this.firstNumber + this.secondNumber;
      else if (this.currentOperation == 'subtract') return this.firstNumber - this.secondNumber;
      else if (this.currentOperation == 'multiply') return this.firstNumber * this.secondNumber;
      else return this.firstNumber / this.secondNumber;
    },
  },
});

const app = createApp(App);
const vm = app.mount('#app');
