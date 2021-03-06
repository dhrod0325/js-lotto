import { validator } from '../../src/js/domain/LottoValidator.js';
import { lotto } from '../../src/js/domain/Lotto.js';
import { ERROR } from '../../src/js/Constant.js';
import { LottoResult } from '../../src/js/domain/LottoResult.js';
import { LottoNumber } from '../../src/js/domain/LottoNumber.js';

describe('Lotto 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const $LottoPurchase = () => cy.get('#LottoPurchase');
  const $LottoNumberInput = () => cy.get('#LottoNumberInput');
  const $LottoPurchaseResult = () => cy.get('#LottoPurchaseResult');

  it('시작할때는 금액 입력 화면만 보여야 한다.', () => {
    $LottoPurchase().should('be.visible');
    $LottoNumberInput().should('not.be.visible');
    $LottoPurchaseResult().should('not.be.visible');
  });

  it('금액을 입력하면 로또 구입 결과 화면이 나와야 한다.', () => {
    cy.inputPrice(3000);

    $LottoNumberInput().should('be.visible');
    $LottoPurchaseResult().should('be.visible');
  });

  it('토글 버튼을 클릭하면 번호보기 화면으로 전환된다', () => {
    cy.inputPrice(3000);

    $LottoPurchaseResult().get('.lotto-numbers-toggle-button').check({ force: true });
    $LottoPurchaseResult().get('.detail').should('be.visible');
  });

  it('당첨번호를 입력하고 결과 확인하기를 누르면 모달기', () => {
    cy.openModal();

    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('다시하기 테스트', () => {
    cy.openModal();

    cy.get('.lotto-replay').click();

    $LottoNumberInput().should('not.be.visible');
    $LottoPurchaseResult().should('not.be.visible');
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
    const list = lotto.createList(5);
    cy.wrap(list).should('have.length', 5);
  });
});

describe('Lotto 당첨 테스트', () => {
  const lottoNumber = new LottoNumber([1, 2, 3, 4, 5, 6], 7);

  it('1등테스트', () => {
    const lottoResult = new LottoResult(lottoNumber,
      [[1, 2, 3, 4, 5, 6, 7]],
    );

    expect(lottoResult.winnerPrice).to.eq(200000000);
  });

  it('2등테스트', () => {
    const lottoResult = new LottoResult(lottoNumber,
      [[1, 2, 3, 4, 5, 8, 7]],
    );
    expect(lottoResult.winnerPrice).to.eq(30000000);
  });

  it('1,2등테스트', () => {
    const lottoResult = new LottoResult(lottoNumber,
      [[1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 8, 7]],
    );

    expect(lottoResult.winnerPrice).to.eq(230000000);
  });

  it('3등테스트', () => {
    const lottoResult = new LottoResult(lottoNumber,
      [[1, 2, 3, 4, 5, 11, 12]],
    );
    expect(lottoResult.winnerPrice).to.eq(1500000);
  });

  it('4등테스트', () => {
    const lottoResult = new LottoResult(lottoNumber,
      [[1, 2, 3, 4, 10, 11, 12]],
    );
    expect(lottoResult.winnerPrice).to.eq(50000);
  });

  it('5등테스트', () => {
    const lottoResult = new LottoResult(lottoNumber,
      [[1, 2, 3, 9, 10, 11, 12]],
    );
    expect(lottoResult.winnerPrice).to.eq(5000);
  });

  it('꽝 테스트', () => {
    const lottoResult = new LottoResult(lottoNumber,
      [[8, 9, 10, 11, 12, 13, 14]],
    );

    expect(lottoResult.winnerPrice).to.eq(0);
  });
});
