export class LottoNumber {
  values = [];
  bonus;

  constructor({ values, bonus }) {
    this.values = values;
    this.bonus = bonus;
  }

  getValues() {
    const result = [...this.values];
    this.bonus && result.push(+this.bonus);

    return result;
  }
}
