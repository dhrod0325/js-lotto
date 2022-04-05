export const EVENT = Object.freeze({
  구매금액입력: '구매금액입력',
  다시시작: '다시시작',
  결과확인: '결과확인',
  로또번호표생성: '로또번호표생성',
});

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

export const LOTTO = {
  MAX_LENGTH: 7,
  MIN_PRICE: 0,
  MAX_PRICE: 100000,
  UNIT: 1000,
};
