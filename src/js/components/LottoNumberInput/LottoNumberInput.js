import { Component } from '../../@lib/Component.js';
import { validator } from '../../domain/LottoValidator.js';
import { LottoNumber } from '../../domain/LottoNumber.js';
import { LottoNumberInputTemplate } from './LottoNumberInput.template.js';
import { store } from '../../store/Store.js';

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
    this.$openModalButtonElem.addEventListener('click', () => {
      const lottoNumber = new LottoNumber(this.getInputNumbers(), this.getInputBonus());
      const numbersAndBonus = lottoNumber.getNumbersAndBonus();

      try {
        validator.validateLottoNumber(numbersAndBonus);
      } catch (e) {
        return alert(e.message);
      }

      store.setState({ lottoNumber });
    });
  }

  onChangeState(state) {
    if (!state.price) return;

    this.show();
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
