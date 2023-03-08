import { defineComponent } from 'vue';
import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const App = defineComponent({
  name: 'App',
  data() {
    return {
      selectedMeetup: null,
      currentMeetupTitle: null,
    };
  },

  watch: {
    selectedMeetup(newValue, oldValue) {
      this.getMeetupTitle(newValue);
    },
  },

  methods: {
    getMeetupTitle(id) {
      fetchMeetupById(id).then((response) => {
        this.currentMeetupTitle = response.title;
      });
    },
  },
});

const app = createApp(App);
const vm = app.mount('#app');
