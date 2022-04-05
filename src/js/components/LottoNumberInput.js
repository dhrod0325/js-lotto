import { BaseElement } from '../@lib/BaseElement.js';
import { validator } from '../domain/Validator.js';
import { LottoNumber } from '../domain/LottoNumber.js';
import { eventHandler } from '../domain/EventHandler.js';

class LottoNumberInput extends BaseElement {
  $openModalButton;
  $lottoNumbers;
  $bonusNumber;

  mounted() {
    this.hide();
  }

  template() {
    return template;
  }

  initElement() {
    this.$lottoNumbers = this.$container.querySelectorAll('.winning-number');
    this.$openModalButton = this.$container.querySelector('.open-result-modal-button');
    this.$bonusNumber = this.$container.querySelector('.bonus-number');
  }

  initEvent() {
    eventHandler.on_구매금액입력(() => {
      this.show();
    });

    eventHandler.on_다시시작(() => {
      this.reset();
    });

    this.$openModalButton.addEventListener('click', () => {
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
    return Array.from(this.$lottoNumbers)
      .filter((elem) => +elem.value > 0)
      .map((elem) => +elem.value);
  }

  getInputBonus() {
    return this.$bonusNumber.value;
  }
}

const template = `
<form class='mt-9'>
    <label class='flex-auto d-inline-block mb-3'
      >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
    >
    <div class='d-flex'>
      <div>
        <h4 class='mt-0 mb-3 text-center'>당첨 번호</h4>
        <div>
          <input
            type='number'
            class='winning-number mx-1 text-center'
          />
          <input
            type='number'
            class='winning-number mx-1 text-center'
          />
          <input
            type='number'
            class='winning-number mx-1 text-center'
          />
          <input
            type='number'
            class='winning-number mx-1 text-center'
          />
          <input
            type='number'
            class='winning-number mx-1 text-center'
          />
          <input
            type='number'
            class='winning-number mx-1 text-center'
          />
        </div>
      </div>
      <div class='bonus-number-container flex-grow'>
        <h4 class='mt-0 mb-3 text-center'>보너스 번호</h4>
        <div class='d-flex justify-center'>
          <input type='number' class='bonus-number text-center' />
        </div>
      </div>
    </div>
    <button
      type='button'
      class='open-result-modal-button mt-5 btn btn-cyan w-100'>결과 확인하기</button>
  </form>
`;

window.customElements.define('lotto-number-input', LottoNumberInput);
