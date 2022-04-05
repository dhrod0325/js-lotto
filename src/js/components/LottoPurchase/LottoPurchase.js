import { Component } from '../../@lib/Component.js';
import { validator } from '../../domain/LottoValidator.js';
import { eventHandler } from '../../event/EventHandler.js';
import { LottoPurchaseTemplate } from './LottoPurchase.template.js';

class LottoPurchase extends Component {
  $formElem;
  $inputElem;

  template() {
    return LottoPurchaseTemplate();
  }

  initElement() {
    this.$formElem = this.$container.querySelector('form');
    this.$inputElem = this.$container.querySelector('input');
  }

  initEvent() {
    this.$formElem.addEventListener('submit', e => {
      e.preventDefault();

      const price = this.$inputElem.value;

      try {
        validator.validatePrice(price);
      } catch (e) {
        return alert(e.message);
      }

      eventHandler.emitInputPurchasePrice(price);
    });

    eventHandler.onRestart(() => {
      this.reset();
    });
  }
}

const template = `
<form class='mt-5'>
    <label class='mb-2 d-inline-block'>구입할 금액을 입력해주세요.</label>
    <div class='d-flex'>
        <input
            type='number'
            class='w-100 mr-2 pl-2'
            placeholder='구입 금액'
        />
        <button class='btn btn-cyan'>확인</button>
    </div>
</form>
`;

window.customElements.define('lotto-purchase', LottoPurchase);
