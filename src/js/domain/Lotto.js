export class Lotto {
  create() {
    const lotto = [];

    const create = () => {
      const number = Math.floor(Math.random() * 44) + 1;
      return lotto.includes(number) ? create() : number;
    };

    for (let i = 0; i < 6; i++) {
      lotto.push(create());
    }

    lotto.sort((a, b) => a - b);

    return lotto;
  }

  createWithCount(count) {
    const result = [];

    const createNumbers = () => {
      const numbers = this.create();
      if (result.includes(numbers)) createNumbers();
      return numbers;
    };

    for (let i = 0; i < count; i++) {
      result.push(createNumbers());
    }

    return result;
  }
}

export const lotto = new Lotto();
