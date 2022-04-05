export const EVENT = {
  LottoPurchaseButtonClick: 'LottoPurchase.buttonClick',
};

export const ERROR = Object.freeze({
  PRICE: {
    REQUIRED: '금액을 입력하세요',
    UNIT: '1,000원 단위로 입력하셔야 합니다',
    OVER: '금액은 10만원 이하로 입력하셔야 합니다',
  },
  LOTTO: {
    DUPLICATE: '당첨번호는 중복된 숫자가 들어갈 수 없습니다',
    INVALID_LENGTH: '로또 당첨번호는 7자리 입니다',
  },
});
