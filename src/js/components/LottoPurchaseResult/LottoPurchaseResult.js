import { Component } from '../../@lib/Component.js';
import { lotto } from '../../domain/Lotto.js';
import { LottoPurchaseResultTemplate } from './LottoPurchaseResult.template.js';
import { elem } from '../../utils/Elem.js';
import { LOTTO } from '../../Constant.js';
import { store } from '../../store/Store.js';

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
    this.$toggleButtonElem.addEventListener('change', () => {
      this.toggleView();
    });
  }

  initLottoList(price) {
    this.lottoList = lotto.createList(price / LOTTO.UNIT);
  }

  toggleView() {
    this.detailMode = !this.detailMode;
    elem.hide(this.$simpleElem);
    elem.hide(this.$detailElem);
    this.detailMode ? this.detailView() : this.simpleView();
  }

  simpleView() {
    elem.show(this.$simpleElem);
    this.$simpleElem.innerHTML = `${this.lottoList.map(() => `<span class='mx-1 text-4xl'>🎟️ </span>`).join('')}`;
  }

  detailView() {
    elem.show(this.$detailElem);
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

  setPurchaseCount(count) {
    this.$purchaseCountElem.innerHTML = count;
  }

  onChangeState(state) {
    this.show();
    this.initLottoList(state.price);
    this.setPurchaseCount(this.lottoList.length);
    this.simpleView();

    const lottoList = this.lottoList;
    store.setState({ lottoList }, this);
  }

  restart() {
    super.restart();
    this.detailMode = true;
  }
}

window.customElements.define('lotto-purchase-result', LottoPurchaseResult);
