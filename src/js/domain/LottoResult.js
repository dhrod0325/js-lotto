export class LottoResult {
  winnerCounts = [0, 0, 0, 0, 0];
  winnerPrices = [5000, 50000, 1500000, 30000000, 200000000];

  winnerPrice = 0;
  benefit = 0;

  lottoNumber;
  lottoList;

  constructor(lottoNumber, lottoList) {
    if (!this.validate(lottoNumber, lottoList)) return;

    this.lottoNumber = lottoNumber;
    this.lottoList = lottoList;

    this.calculate();
  }

  validate(lottoNumber, lottoList) {
    return lottoNumber && lottoList;
  }

  calculate() {
    this.lottoList.forEach(lotto => {
      this.calcWinnerCounts(lotto);
    });

    this.calcWinnerPrice();
    this.calcBenefit();
  }

  calcWinnerCounts(lotto) {
    const { numbers, bonus } = this.lottoNumber;
    const winningCount = numbers.filter(number => lotto.includes(number)).length;

     if (winningCount === 3) {
      this.winnerCounts[0]++;
    } else if (winningCount === 4) {
      this.winnerCounts[1]++;
    } else if (winningCount === 5) {
      if (lotto.includes(bonus)) {
        this.winnerCounts[3]++;
      } else {
        this.winnerCounts[2]++;
      }
    } else if (winningCount === 6) {
      this.winnerCounts[4]++;
    }
  }

  calcWinnerPrice() {
    this.winnerPrice = this.winnerCounts.reduce((previousValue, currentValue, index) => {
      const price = this.winnerPrices[index];
      return previousValue + (price * currentValue);
    }, 0);
  }

  calcBenefit() {
    const buyPrice = this.lottoList.length * 1000;
    this.benefit = Math.floor((this.winnerPrice / buyPrice) * 100) - 100;
  }
}
