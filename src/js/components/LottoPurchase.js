import { BaseElement } from '../@lib/BaseElement.js';
import { EVENT } from '../Constant.js';
import { validator } from '../domain/Validator.js';

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

class LottoPurchase extends BaseElement {
  $form;
  $input;

  template() {
    return template;
  }

  initElement() {
    this.$form = this.$container.querySelector('form');
    this.$input = this.$container.querySelector('input');
  }

  initEvent() {
    this.$form.addEventListener('submit', e => {
      e.preventDefault();

      const price = this.$input.value;

      try {
        validator.validatePrice(price);
      } catch (e) {
        return alert(e.message);
      }

      window.dispatchEvent(new CustomEvent(EVENT.구매금액입력, {
        detail: {
          price,
        },
      }));
    });

    window.addEventListener(EVENT.다시시작, () => {
      this.$input.value = 0;
    });
  }
}

window.customElements.define('lotto-purchase', LottoPurchase);
