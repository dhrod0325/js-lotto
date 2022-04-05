import { Component } from '../../@lib/Component.js';
import { validator } from '../../domain/Validator.js';
import { LottoNumber } from '../../domain/LottoNumber.js';
import { eventHandler } from '../../domain/EventHandler.js';
import { LottoNumberInputTemplate } from './LottoNumberInput.template.js';

class LottoNumberInput extends Component {
  $openModalButtonElem;
  $lottoNumberElems;
  $bonusNumberElem;

  mounted() {
    this.hide();
  }

  template() {
    return LottoNumberInputTemplate();
  }

  initElement() {
    this.$lottoNumberElems = this.$container.querySelectorAll('.winning-number');
    this.$openModalButtonElem = this.$container.querySelector('.open-result-modal-button');
    this.$bonusNumberElem = this.$container.querySelector('.bonus-number');
  }

  initEvent() {
    eventHandler.on_구매금액입력(() => {
      this.show();
    });

    eventHandler.on_다시시작(() => {
      this.reset();
    });

    this.$openModalButtonElem.addEventListener('click', () => {
      const lottoNumber = new LottoNumber(this.getInputNumbers(), this.getInputBonus());
      const numbersAndBonus = lottoNumber.getNumbersAndBonus();

      try {
        validator.validateLottoNumber(numbersAndBonus);
      } catch (e) {
        return alert(e.message);
      }

      eventHandler.emit_결과확인(lottoNumber);
    });
  }

  getInputNumbers() {
    return Array.from(this.$lottoNumberElems)
      .filter((elem) => +elem.value > 0)
      .map((elem) => +elem.value);
  }

  getInputBonus() {
    return this.$bonusNumberElem.value;
  }
}

window.customElements.define('lotto-number-input', LottoNumberInput);
