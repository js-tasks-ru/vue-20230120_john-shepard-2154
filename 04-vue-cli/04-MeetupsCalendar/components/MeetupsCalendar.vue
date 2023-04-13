<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="previousMonth"
        ></button>
        <div class="calendar-view__date">{{ currentMonthYear }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="day in days"
        :key="day.day"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !day.active }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ day.title }}</div>
        <div class="calendar-view__cell-content">
          <a
            v-for="meetup in meetupsToDaysMatching[day.formatDate]"
            :key="meetup.title"
            href="#"
            class="calendar-event"
            >{{ meetup.title }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  computed: {
    currentMonthYear() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    days() {
      let month = this.date.getMonth();
      let year = this.date.getFullYear();

      let firstWeek = new Date(year, month, 1).getDay();
      let endWeek = new Date(year, month + 1, 0).getDay();

      let days = [];

      if (firstWeek != 1) {
        let lastAddedDay = firstWeek;
        let previousDay = new Date(year, month, 0);
        let lastDayIndex = new Date(year, month, 0).getDate();

        let i = 1;
        while (lastAddedDay != 1) {
          days.push({
            day: previousDay,
            title: previousDay.getDate(),
            formatDate: this.formatDate(previousDay),
            active: false,
          });
          lastAddedDay = previousDay.getDay();
          previousDay = new Date(year, month - 1, lastDayIndex - i);
          i++;
        }
        days = days.reverse();
      }

      for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
        days.push({
          day: new Date(year, month, i),
          title: new Date(year, month, i).getDate(),
          formatDate: this.formatDate(new Date(year, month, i)),
          active: true,
        });
      }

      if (endWeek != 7) {
        let lastAddedDay = endWeek;
        let nextDay = new Date(year, month + 1, 1);

        let i = 2;
        while (lastAddedDay != 0) {
          days.push({
            day: nextDay,
            title: nextDay.getDate(),
            formatDate: this.formatDate(nextDay),
            active: false,
          });
          lastAddedDay = nextDay.getDay();
          nextDay = new Date(year, month + 1, i);
          i++;
        }
      }

      return days;
    },

    meetupsToDaysMatching() {
      let matchingResult = {};

      for (let meetup of this.meetups) {
        let meetupDate = new Date(meetup.date).toLocaleDateString(navigator.language, {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        });

        try {
          matchingResult[meetupDate].push({ title: meetup.title, __dateForDebug: meetup.__dateForDebug });
        } catch (error) {
          if (error instanceof TypeError) {
            matchingResult[meetupDate] = [];
            matchingResult[meetupDate].push({ title: meetup.title, __dateForDebug: meetup.__dateForDebug });
          }
        }
      }

      return matchingResult;
    },
  },

  methods: {
    setMonth(monthNumber) {
      let year = this.date.getFullYear();
      let lastDayIndexInNextMonth = new Date(year, monthNumber + 1, 0).getDate();

      if (lastDayIndexInNextMonth > this.date.getDate()) {
        this.date = new Date(this.date.setMonth(monthNumber));
      } else {
        this.date.setDate(lastDayIndexInNextMonth);
        this.date = new Date(this.date.setMonth(monthNumber));
      }
    },

    nextMonth() {
      this.setMonth(this.date.getMonth() + 1);
    },

    previousMonth() {
      this.setMonth(this.date.getMonth() - 1);
    },

    formatDate(date) {
      return date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
/* .calendar-view {
} */

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
