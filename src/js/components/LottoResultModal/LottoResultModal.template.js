export const LottoResultModalTemplate = (lottoResult) => {
  const [win5, win4, win3, win2, win1] = lottoResult.winnerCounts;
  const { benefit } = lottoResult;

  return `<div class='modal'>
    <div class='modal-inner p-10'>
      <div class='modal-close'>
        <svg viewbox='0 0 40 40'>
          <path class='close-x' d='M 10,10 L 30,30 M 30,10 L 10,30' />
        </svg>
      </div>
      <h2 class='text-center'>🏆 당첨 통계 🏆</h2>
      <div class='d-flex justify-center'>
        <table class='result-table border-collapse border border-black'>
          <thead>
            <tr class='text-center'>
              <th class='p-3'>일치 갯수</th>
              <th class='p-3'>당첨금</th>
              <th class='p-3'>당첨 갯수</th>
            </tr>
          </thead>
          <tbody class='lotto-result-table'>
            <tr class='text-center'>
              <td class='p-3'>3개</td>
              <td class='p-3'>5,000</td>
              <td class='p-3'>${win5}개</td>
            </tr>
            <tr class='text-center'>
              <td class='p-3'>4개</td>
              <td class='p-3'>50,000</td>
              <td class='p-3'>${win4}개</td>
            </tr>
            <tr class='text-center'>
              <td class='p-3'>5개</td>
              <td class='p-3'>1,500,000</td>
              <td class='p-3'>${win3}개</td>
            </tr>
            <tr class='text-center'>
              <td class='p-3'>5개 + 보너스볼</td>
              <td class='p-3'>30,000,000</td>
              <td class='p-3'>${win2}개</td>
            </tr>
            <tr class='text-center'>
              <td class='p-3'>6개</td>
              <td class='p-3'>2,000,000,000</td>
              <td class='p-3'>${win1}개</td>
            </tr>
          </tbody>
          
        </table>
      </div>
      <p class='text-center font-bold'>당신의 총 수익률은 ${benefit}%입니다.</p>
      <div class='d-flex justify-center mt-5'>
        <button type='button' class='btn btn-cyan lotto-replay'>다시 시작하기</button>
      </div>
    </div>
</div>
`;
};
