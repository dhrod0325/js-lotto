import { Component } from '../../@lib/Component.js';
import { lotto } from '../../domain/Lotto.js';
import { eventHandler } from '../../domain/EventHandler.js';
import { LottoPurchaseResultTemplate } from './LottoPurchaseResult.template.js';

class LottoPurchaseResult extends Component {
  lottoList = [];
  detailMode = true;

  $simpleElem;
  $detailElem;
  $toggleButtonElem;
  $purchaseCountElem;

  template() {
    return LottoPurchaseResultTemplate();
  }

  mounted() {
    this.hide();
    this.toggleView();
  }

  initElement() {
    this.$purchaseCountElem = this.$container.querySelector('.lotto-purchase-count');
    this.$toggleButtonElem = this.$container.querySelector('.lotto-numbers-toggle-button');
    this.$simpleElem = this.$container.querySelector('.simple');
    this.$detailElem = this.$container.querySelector('.detail');
  }

  initEvent() {
    eventHandler.onInputPurchasePrice(price => {
      this.lottoList = lotto.createList(price / 1000);
      this.$purchaseCountElem.innerHTML = this.lottoList.length;

      this.show();
      this.simpleView();

      eventHandler.emitCreatedLottoList(this.lottoList);
    });

    eventHandler.onRestart(() => {
      this.detailMode = true;
      this.reset();
    });

    this.$toggleButtonElem.addEventListener('change', () => {
      this.toggleView();
    });
  }

  toggleView() {
    this.detailMode = !this.detailMode;

    this.$simpleElem.classList.add('hide');
    this.$detailElem.classList.add('hide');

    this.detailMode ? this.detailView() : this.simpleView();
  }

  simpleView() {
    this.$simpleElem.classList.remove('hide');
    this.$simpleElem.innerHTML = `${this.lottoList.map(() => `<span class='mx-1 text-4xl'>🎟️ </span>`).join('')}`;
  }

  detailView() {
    this.$detailElem.classList.remove('hide');
    this.$detailElem.innerHTML = `
            <ul>
            ${this.lottoList.map((item) => `
              <li class='flex-auto'>
                  <span class='mx-1 text-4xl'>🎟️ </span> 
                  ${item.map((number) => `<span class='text-2xl lotto-number'>${number}</span>`).join(' ')}
              </li>
          `).join('')}
            </ul> 
        `;
  }
}

window.customElements.define('lotto-purchase-result', LottoPurchaseResult);
