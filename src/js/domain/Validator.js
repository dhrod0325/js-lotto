import { ERROR, LOTTO } from '../Constant.js';

const Validator = () => {
  const validatePrice = price => {
    if (!price) throw Error(ERROR.PRICE.REQUIRED);
    if (price <= LOTTO.MIN_PRICE) throw Error(ERROR.PRICE.REQUIRED);
    if (price > LOTTO.MAX_PRICE) throw Error(ERROR.PRICE.OVER);
    if (price % LOTTO.UNIT !== 0) throw Error(ERROR.PRICE.UNIT);
  };

  const validateLottoNumber = numbers => {
    if (numbers.length !== LOTTO.MAX_LENGTH) {
      throw Error(ERROR.LOTTO.INVALID_LENGTH);
    }

    const isUnique = [...new Set(numbers)].length === numbers.length;
    if (!isUnique) throw Error(ERROR.LOTTO.DUPLICATE);
  };

  return {
    validatePrice,
    validateLottoNumber,
  };
};

export const validator = Validator();
