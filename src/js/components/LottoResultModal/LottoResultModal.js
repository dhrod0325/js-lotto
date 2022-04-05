import { Component } from '../../@lib/Component.js';
import { LottoResult } from '../../domain/LottoResult.js';
import { eventHandler } from '../../domain/EventHandler.js';
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
    eventHandler.on_결과확인(lottoNumber => {
      this.lottoNumber = lottoNumber;
      this.render();
      this.show();
    });

    eventHandler.on_로또번호표생성(lottoList => {
      this.lottoList = lottoList;
    });

    eventHandler.on_다시시작(() => {
      this.reset();
    });

    this.$closeButtonElem.addEventListener('click', () => {
      this.hide();
    });

    this.$replayButtonElem.addEventListener('click', () => {
      eventHandler.emit_다시시작();
    });
  }
}

window.customElements.define('lotto-result-modal', LottoResultModal);
