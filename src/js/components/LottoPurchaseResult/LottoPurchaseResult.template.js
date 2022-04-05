export const LottoPurchaseResultTemplate = () => `
<section class='mt-9' >
    <div class='d-flex'>
      <label class='flex-auto my-0'>총 <span class='lotto-purchase-count'></span>개를 구매하였습니다.</label>
      <div class='flex-auto d-flex justify-end pr-1'>
        <label class='switch'>
          <input type='checkbox' class='lotto-numbers-toggle-button' />
          <span class='text-base font-normal'>번호보기</span>
        </label>
      </div>
    </div>
    <div class='d-flex flex-wrap simple'>.</div>
    <div class='detail'>.</div>
</section>
`;
