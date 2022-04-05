export class LottoNumber {
  numbers = [];
  bonus;

  constructor(numbers, bonus) {
    this.numbers = numbers;
    this.bonus = bonus;
  }

  getNumbersAndBonus() {
    const result = [...this.numbers];
    this.bonus && result.push(+this.bonus);

    return result;
  }
}
