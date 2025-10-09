const CarTerms = () => {
  return (
    <section>
      <h2 className='text-2xl text-gray-700'>Điều khoản</h2>
      <div className='bg-secondary mt-2 h-1 w-10 rounded-full' />
      <div className='space-y-4'>
        <p className='font-medium text-gray-700'>Quy định khác:</p>
        <ul className='space-y-2 text-gray-700'>
          <li>- Sử dụng xe đúng mục đích.</li>
          <li>- Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</li>
          <li>- Không sử dụng xe thuê để cầm cố, thế chấp.</li>
          <li>- Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
          <li>- Không chở hàng quốc cấm dễ cháy nổ.</li>
          <li>- Không chở hoa quả, thực phẩm nặng mùi trong xe.</li>
        </ul>
        <p className='mt-4 font-medium text-gray-700'>
          Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
        </p>
      </div>
    </section>
  )
}

export default CarTerms
