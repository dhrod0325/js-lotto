import { Component } from '../../@lib/Component.js';
import { LottoResult } from '../../domain/LottoResult.js';
import { eventHandler } from '../../event/EventHandler.js';
import { LottoResultModalTemplate } from './LottoResultModal.template.js';

class LottoResultModal extends Component {
  lottoList;
  lottoNumber;

  $closeButtonElem;
  $replayButtonElem;

  mounted() {
    this.hide();
  }

  template() {
    return LottoResultModalTemplate(new LottoResult(this.lottoNumber, this.lottoList));
  }

  initElement() {
    this.$closeButtonElem = this.$container.querySelector('.modal-close');
    this.$replayButtonElem = this.$container.querySelector('.lotto-replay');
  }

  initEvent() {
    eventHandler.onResultCheck(lottoNumber => {
      this.lottoNumber = lottoNumber;
      this.render();
      this.show();
    });

    eventHandler.onCreatedLottoList(lottoList => {
      this.lottoList = lottoList;
    });

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
}

window.customElements.define('lotto-result-modal', LottoResultModal);
