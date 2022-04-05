import { BaseElement } from '../@lib/BaseElement.js';
import { EVENT } from '../Constant.js';
import { lotto } from '../domain/Lotto.js';

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

class LottoPurchaseResult extends BaseElement {
  detailMode = true;
  lottoList = [];

  $simpleContainer;
  $detailContainer;
  $purchaseCount;
  $toggleButton;

  template() {
    return template;
  }

  mounted() {
    this.hide();
    this.toggleDetail();
  }

  initElement() {
    this.$purchaseCount = this.$container.querySelector('.lotto-purchase-count');
    this.$toggleButton = this.$container.querySelector('.lotto-numbers-toggle-button');
    this.$simpleContainer = this.$container.querySelector('.simple');
    this.$detailContainer = this.$container.querySelector('.detail');
  }

  initEvent() {
    window.addEventListener(EVENT.구매금액입력, ({ detail: { price } }) => {
      this.lottoList = lotto.createList(price / 1000);
      this.$purchaseCount.innerHTML = this.lottoList.length;
      this.show();
      this.showSimple();

      window.dispatchEvent(new CustomEvent(EVENT.로또번호표생성, {
        detail: {
          lottoList: [...this.lottoList],
        },
      }));
    });

    window.addEventListener(EVENT.다시시작, () => {
      this.hide();
    });

    this.$toggleButton.addEventListener('change', () => {
      this.toggleDetail();
    });
  }

  toggleDetail() {
    this.detailMode = !this.detailMode;

    this.$simpleContainer.classList.add('hide');
    this.$detailContainer.classList.add('hide');

    this.detailMode ? this.showDetail() : this.showSimple();
  }

  showSimple() {
    this.$simpleContainer.classList.remove('hide');
    this.$simpleContainer.innerHTML = `
            ${this.lottoList
      .map(() => `<span class='mx-1 text-4xl'>🎟️ </span>`)
      .join('')} 
        `;
  }

  showDetail() {
    this.$detailContainer.classList.remove('hide');
    this.$detailContainer.innerHTML = `
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
