import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from './MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: undefined,
      fetchError: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(newValue, oldValue) {
        this.meetup = undefined;
        this.fetchError = null;

        fetchMeetupById(this.meetupId)
          .then((response) => {
            this.meetup = response;
          })
          .catch((error) => {
            this.fetchError = error.message;
          });
      },
    },
  },

  methods: {
    fetchMeetupById,
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />

      <UiContainer v-else-if="!fetchError">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else>
        <UiAlert>{{ fetchError }}</UiAlert>
      </UiContainer>
    </div>`,
});
