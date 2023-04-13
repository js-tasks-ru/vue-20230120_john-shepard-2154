<template>
  <div class="toasts">
    <ToasterItem v-for="toast in toastStack" :key="toast.id" :toastType="toast.type">{{ toast.message }}</ToasterItem>
  </div>
</template>

<script>
import ToasterItem from './ToasterItem.vue';
export default {
  name: 'TheToaster',
  components: { ToasterItem },
  data() {
    return {
      lastToastId: -1,
      timeToClose: 5000,
      toastStack: [],
    };
  },
  methods: {
    success(message) {
      this.addToast(message, 'success');
    },
    error(message) {
      this.addToast(message, 'error');
    },
    addToast(message, toastType) {
      let newToast = {
        id: --this.lastToastId,
        message: message,
        timeLife: this.timeToClose,
        type: toastType,
      };
      this.toastStack.push(newToast);
      setTimeout(this.removeToast, this.timeToClose, newToast.id);
    },
    removeToast(toastId) {
      try {
        let toastToRemove = this.toastStack.findIndex((element) => element.id === toastId);
        this.toastStack.splice(toastToRemove, 1);
      } catch (error) {
        //
      }
    },
    // handleCloseClick(toast) {
    //   this.removeToast(toast.id)
    // }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}
@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
