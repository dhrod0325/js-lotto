import { Component } from '../../@lib/Component.js';
import { LottoResult } from '../../domain/LottoResult.js';
import { LottoResultModalTemplate } from './LottoResultModal.template.js';
import { store } from '../../store/Store.js';
import { app } from '../../App.js';

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
    this.$closeButtonElem.addEventListener('click', () => {
      this.hide();
    });

    this.$replayButtonElem.addEventListener('click', () => {
      app.restart();
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
