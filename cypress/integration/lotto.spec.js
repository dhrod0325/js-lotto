import { validator } from '../../src/js/domain/Validator.js';
import { lotto } from '../../src/js/domain/Lotto.js';
import { ERROR } from '../../src/js/Constant.js';
import { LottoResult } from '../../src/js/domain/LottoResult';

describe('Lotto 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const $LottoPurchase = () => cy.get('#LottoPurchase');
  const $LottoWinningInput = () => cy.get('#LottoWinningInput');
  const $LottoPurchaseResult = () => cy.get('#LottoPurchaseResult');

  it('시작할때는 금액 입력 화면만 보여야 한다.', () => {
    $LottoPurchase().should('be.visible');
    $LottoWinningInput().should('not.be.visible');
    $LottoPurchaseResult().should('not.be.visible');
  });

  it('금액을 입력하면 로또 구입 결과 화면이 나와야 한다.', () => {
    cy.inputPrice(3000);

    $LottoWinningInput().should('be.visible');
    $LottoPurchaseResult().should('be.visible');
  });

  it('토글 버튼을 클릭하면 번호보기 화면으로 전환된다', () => {
    cy.inputPrice(3000);

    $LottoPurchaseResult().get('.lotto-numbers-toggle-button').check({ force: true });
    $LottoPurchaseResult().get('.detail').should('be.visible');
  });

  it('당첨번호를 입력하고 결과 확인하기를 누르면 모달이 열린다', () => {
    cy.inputPrice(3000);

    cy.get('.winning-number').each((element, idx) => {
      cy.wrap(element).type(idx + 1);
    });
    cy.get('.bonus-number').type(7);
    cy.get('.open-result-modal-button').first().click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });
});

describe('Validator 테스트', () => {
  it('금액은 천원 단위로 입력하여야 한다.', () => {
    cy.on('fail', err => {
      expect(err.message).to.include(ERROR.PRICE.UNIT);
    });

    validator.validatePrice(100);
  });

  it('금액은 10만원 이하로 입력하여야 한다.', () => {
    cy.on('fail', err => {
      expect(err.message).to.include(ERROR.PRICE.OVER);
    });

    validator.validatePrice(100001);
  });

  it('로또 당첨번호 중복 검사', () => {
    cy.on('fail', err => {
      expect(err.message).to.include(ERROR.LOTTO.DUPLICATE);
    });

    validator.validateLottoNumber([1, 1, 3, 4, 5, 6, 7]);
  });

  it('로또 당첨번호 자리 수 검사', () => {
    cy.on('fail', err => {
      expect(err.message).to.include(ERROR.LOTTO.INVALID_LENGTH);
    });

    validator.validateLottoNumber([1, 1, 3, 4, 5, 6, 7, 8]);
  });
});

describe('Lotto 번호 생성 테스트', () => {
  it('로또번호를 카운트에 맞춰 생성한다.', () => {
    const list = lotto.createWithCount(5);
    cy.wrap(list).should('have.length', 5);
  });
});

describe('Lotto 당첨번호 테스트', () => {
  it('1등테스트', () => {
    const lottoResult = new LottoResult({
      values: [1, 2, 3, 4, 5, 6],
      bonus: 7,
    }, [
      [1, 2, 3, 4, 5, 6, 7],
    ]);

    expect(lottoResult.winnerPrice).to.eq(200000000);
  });

  it('2등테스트', () => {
    const lottoResult = new LottoResult({
      values: [1, 2, 3, 4, 5, 6],
      bonus: 7,
    }, [
      [1, 2, 3, 4, 5, 10, 7],
    ]);

    expect(lottoResult.winnerPrice).to.eq(30000000);
  });

  it('1,2등테스트', () => {
    const lottoResult = new LottoResult({
      values: [1, 2, 3, 4, 5, 6],
      bonus: 7,
    }, [
      [1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 10, 7],
    ]);

    expect(lottoResult.winnerPrice).to.eq(230000000);
  });
});
