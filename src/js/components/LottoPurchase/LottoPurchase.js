import { Component } from '../../@lib/Component.js';
import { validator } from '../../domain/LottoValidator.js';
import { eventHandler } from '../../event/EventHandler.js';
import { LottoPurchaseTemplate } from './LottoPurchase.template.js';
import { store } from '../../store/Store.js';

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

      store.setState({ price });
    });

    eventHandler.onRestart(() => {
      this.reset();
    });
  }
}

window.customElements.define('lotto-purchase', LottoPurchase);
