import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'e-Motion là gì?',
    answer:
      'e-Motion là một nền tảng cho thuê xe điện, kết nối người dùng với các chủ xe một cách tiện lợi và nhanh chóng.'
  },
  {
    question: 'Làm thế nào để thuê xe?',
    answer:
      'Bạn chỉ cần chọn địa điểm, thời gian nhận và trả xe, sau đó chọn chiếc xe phù hợp từ danh sách có sẵn và tiến hành đặt xe.'
  },
  {
    question: 'Chi phí thuê xe được tính như thế nào?',
    answer:
      'Chi phí thuê xe phụ thuộc vào loại xe, thời gian thuê và các dịch vụ đi kèm. Bạn sẽ thấy chi tiết chi phí trước khi xác nhận đặt xe.'
  },
  {
    question: 'Tôi có cần đặt cọc không?',
    answer: 'Tùy thuộc vào chính sách của chủ xe, một số xe có thể yêu cầu một khoản đặt cọc nhỏ.'
  }
]

export function FaqSection() {
  return (
    <section className='my-10'>
      <h1 className='mb-4 text-center text-3xl font-bold'>Câu hỏi thường gặp</h1>
      <Accordion type='single' collapsible className='w-full'>
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
