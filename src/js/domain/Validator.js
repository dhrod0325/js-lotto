import { ERROR } from '../Constant.js';

const Validator = () => {
  const validatePrice = price => {
    if (!price) throw Error(ERROR.PRICE.REQUIRED);
    if (price <= 0) throw Error(ERROR.PRICE.REQUIRED);
    if (price > 100000) throw Error(ERROR.PRICE.OVER);
    if (price % 1000 !== 0) throw Error(ERROR.PRICE.UNIT);
  };

  const validateLottoNumber = numbers => {
    if (numbers.length !== 7) {
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
