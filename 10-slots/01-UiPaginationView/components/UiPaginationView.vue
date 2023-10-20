<template>
  <div class="pagination-container">
    <template v-for="item in itemsOnPage">
      <slot :item="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    itemsOnPage() {
      let itemsToSkip = (this.page - 1) * this.perPage;
      return this.items.slice(itemsToSkip, itemsToSkip + this.perPage);
    },
  },
};
</script>

<style></style>
