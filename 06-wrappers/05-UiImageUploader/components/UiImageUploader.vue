<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': currentState == 'isLoading' ? true : false }"
      :style="imageUrl && { '--bg-url': `url(${imageUrl})` }"
    >
      <span class="image-uploader__text">{{ currentStateDescription }}</span>
      <input
        ref="imgInput"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @click.capture="clickHandler"
        @change="getFile"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
      required: false,
    },

    uploader: {
      type: Function,
      required: false,
    },
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      previewProxy: null,
      selectedFileUrl: null,
      isFileUploaded: false,
    };
  },

  computed: {
    currentState() {
      if (!this.imageUrl) return 'empty';
      if (this.imageUrl && !this.isFileUploaded) return 'isLoading';
      if (this.previewProxy || this.isFileUploaded) return 'filledIn';
      return null;
    },

    currentStateDescription() {
      if (this.currentState === 'empty') return 'Загрузить изображение';
      if (this.currentState === 'isLoading') return 'Загрузка...';
      if (this.currentState === 'filledIn') return 'Удалить изображение';
      return null;
    },

    imageUrl() {
      if (this.previewProxy) return this.previewProxy;
      if (this.selectedFileUrl) return this.selectedFileUrl;
      return null;
    },
  },

  created() {
    if (this.preview) {
      this.previewProxy = this.preview;
      this.isFileUploaded = true;
    }
  },

  methods: {
    clickHandler(event) {
      if (this.currentState == 'isLoading') {
        event.preventDefault();
        return;
      }
      if (this.previewProxy || this.selectedFileUrl) this.removeImage(event);
    },

    removeImage(event) {
      this.refreshState();
      this.previewProxy = null;
      this.$emit('remove');
      event.preventDefault();
    },

    async getFile(event) {
      let selectedFile = event.target.files[0];
      this.selectedFileUrl = URL.createObjectURL(selectedFile);
      this.$emit('select', selectedFile);

      if (this.uploader) {
        await this.uploader(selectedFile)
          .then((response) => {
            this.$emit('upload', response);
            this.isFileUploaded = true;
          })
          .catch((error) => {
            this.$emit('error', error);
            this.refreshState();
          });
      } else this.isFileUploaded = true;
    },

    refreshState() {
      this.selectedFileUrl = null;
      this.isFileUploaded = null;
      this.previewProxy = this.preview;
      this.$refs.imgInput.value = null;
    },
  },
};
</script>

<style scoped>
/* .image-uploader {} */

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
