import { Component } from '../../@lib/Component.js';
import { LottoResult } from '../../domain/LottoResult.js';
import { eventHandler } from '../../event/EventHandler.js';
import { LottoResultModalTemplate } from './LottoResultModal.template.js';
import { store } from '../../store/Store.js';

class LottoResultModal extends Component {
  $closeButtonElem;
  $replayButtonElem;

  mounted() {
    this.hide();
  }

  template() {
    if (!store.state) return;

    const { lottoNumber, lottoList } = store.state;
    return LottoResultModalTemplate(new LottoResult(lottoNumber, lottoList));
  }

  initElement() {
    this.$closeButtonElem = this.$container.querySelector('.modal-close');
    this.$replayButtonElem = this.$container.querySelector('.lotto-replay');
  }

  initEvent() {
    eventHandler.onRestart(() => {
      this.reset();
    });

    this.$closeButtonElem.addEventListener('click', () => {
      this.hide();
    });

    this.$replayButtonElem.addEventListener('click', () => {
      eventHandler.emitRestart();
    });
  }

  onChangeState(state) {
    if (!this.isRenderAble(state)) return;

    this.render();
    this.show();
  }

  isRenderAble(state) {
    return state.lottoNumber && state.lottoList;
  }
}

window.customElements.define('lotto-result-modal', LottoResultModal);
