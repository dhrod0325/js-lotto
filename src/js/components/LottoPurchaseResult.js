import { BaseElement } from '../@lib/BaseElement.js';
import { lotto } from '../domain/Lotto.js';
import { eventHandler } from '../domain/EventHandler.js';

class LottoPurchaseResult extends BaseElement {
  lottoList = [];
  detailMode = true;

  $simpleElem;
  $detailElem;
  $toggleButtonElem;
  $purchaseCountElem;

  template() {
    return template;
  }

  mounted() {
    this.hide();
    this.toggleDetail();
  }

  initElement() {
    this.$purchaseCountElem = this.$container.querySelector('.lotto-purchase-count');
    this.$toggleButtonElem = this.$container.querySelector('.lotto-numbers-toggle-button');
    this.$simpleElem = this.$container.querySelector('.simple');
    this.$detailElem = this.$container.querySelector('.detail');
  }

  initEvent() {
    eventHandler.on_구매금액입력(price => {
      this.lottoList = lotto.createList(price / 1000);
      this.$purchaseCountElem.innerHTML = this.lottoList.length;

      this.show();
      this.showSimple();

      eventHandler.emit_로또번호표생성(this.lottoList);
    });

    eventHandler.on_다시시작(() => {
      this.detailMode = true;
      this.reset();
    });

    this.$toggleButtonElem.addEventListener('change', () => {
      this.toggleDetail();
    });
  }

  toggleDetail() {
    this.detailMode = !this.detailMode;

    this.$simpleElem.classList.add('hide');
    this.$detailElem.classList.add('hide');

    this.detailMode ? this.showDetail() : this.showSimple();
  }

  showSimple() {
    this.$simpleElem.classList.remove('hide');
    this.$simpleElem.innerHTML = `${this.lottoList.map(() => `<span class='mx-1 text-4xl'>🎟️ </span>`).join('')}`;
  }

  showDetail() {
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

const template = `
<section class='mt-9' >
    <div class='d-flex'>
      <label class='flex-auto my-0'>총 <span class='lotto-purchase-count'></span>개를 구매하였습니다.</label>
      <div class='flex-auto d-flex justify-end pr-1'>
        <label class='switch'>
          <input type='checkbox' class='lotto-numbers-toggle-button' />
          <span class='text-base font-normal'>번호보기</span>
        </label>
      </div>
    </div>
    <div class='d-flex flex-wrap simple'>.</div>
    <div class='detail'>.</div>
</section>
`;

window.customElements.define('lotto-purchase-result', LottoPurchaseResult);
