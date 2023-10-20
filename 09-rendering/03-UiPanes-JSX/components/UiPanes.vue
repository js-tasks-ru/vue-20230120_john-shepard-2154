<script lang="jsx">
import { h } from 'vue';
import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  components: {
    UiButton,
  },

  data() {
    return {
      /**
       * Массив с текущим порядком номеров моделей, например
       * [0, 1, 2]
       * @type {number[]|null}
       */
      panes: [],
    };
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i - 1];
      this.panes[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i + 1];
      this.panes[i + 1] = temp;
    },
  },

  render() {
    let countVNodes = this.$slots.default().length;
    let panesContent = [];
    let buttonsClass;

    if (!this.panes.length) {
      for (let index = 0; index < countVNodes; index++) this.panes.push(index);
    }

    let createPane = (toRenderVNodeIndex, toSwapVNodeIndex, isUpButtonDisabled, isDownButtonDisabled) => {
      buttonsClass = ['', ''];
      if (isUpButtonDisabled) buttonsClass[0] = 'pane__disabled-button';
      if (isDownButtonDisabled) buttonsClass[1] = 'pane__disabled-button';

      return (
        <div class="pane">
          <div class="pane__content">{this.$slots.default()[toRenderVNodeIndex]}</div>
          <div class="pane__controls">
            <UiButton class={buttonsClass[0]} variant="secondary" block onClick={() => this.up(toSwapVNodeIndex)}>
              {' '}
              Up{' '}
            </UiButton>
            <UiButton class={buttonsClass[1]} variant="danger" block onClick={() => this.down(toSwapVNodeIndex)}>
              {' '}
              Down{' '}
            </UiButton>
          </div>
        </div>
      );
    };

    for (let index = 0; index < countVNodes; index++) {
      let isUpButtonDisabled = false;
      let isDownButtonDisabled = false;

      if (index === 0) isUpButtonDisabled = true;
      if (index === countVNodes - 1) isDownButtonDisabled = true;

      let vNode = createPane(this.panes[index], index, isUpButtonDisabled, isDownButtonDisabled);
      panesContent.push(vNode);
    }

    return <div class="panes"> {panesContent} </div>;
  },
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
