import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
// eslint-disable-next-line
import { motion } from 'framer-motion'

const faqs = [
  {
    question: 'e-Motion là gì?',
    answer:
      'e-Motion là nền tảng cho thuê xe điện hàng đầu, kết nối người dùng với các chủ xe một cách tiện lợi, nhanh chóng và an toàn.'
  },
  {
    question: 'Làm thế nào để thuê xe?',
    answer:
      'Bạn chỉ cần chọn địa điểm, thời gian nhận và trả xe, sau đó chọn chiếc xe phù hợp từ danh sách có sẵn và tiến hành đặt xe. Thanh toán trực tuyến và nhận xe tại trạm.'
  },
  {
    question: 'Chi phí thuê xe được tính như thế nào?',
    answer:
      'Chi phí thuê xe phụ thuộc vào loại xe, thời gian thuê và các dịch vụ đi kèm. Bạn sẽ thấy chi tiết chi phí bao gồm phí thuê, phí cọc, VAT trước khi xác nhận đặt xe.'
  },
  {
    question: 'Tôi cần chuẩn bị gì khi nhận xe?',
    answer:
      'Bạn cần mang theo CCCD/CMND, giấy phép lái xe hợp lệ và điện thoại có mã đặt xe. Nhân viên sẽ hướng dẫn kiểm tra xe và ký biên bản bàn giao.'
  },
  {
    question: 'Nếu xe gặp sự cố trong quá trình thuê thì sao?',
    answer:
      'Hãy liên hệ ngay với tổng đài hỗ trợ 24/7 của e-Motion. Chúng tôi sẽ hỗ trợ sửa chữa hoặc cung cấp xe thay thế nếu cần thiết.'
  },
  {
    question: 'Tôi có thể hủy đặt xe không?',
    answer:
      'Có, bạn có thể hủy đặt xe trước thời gian nhận xe. Hủy trước 5 ngày sẽ được hoàn lại 100% phí cọc.'
  },
  {
    question: 'Tôi có thể thuê xe cho người khác lái không?',
    answer:
      'Không, người thuê xe phải là người trực tiếp lái xe và có giấy phép lái xe hợp lệ. Điều này đảm bảo an toàn và trách nhiệm pháp lý.'
  },
  {
    question: 'Làm sao để nạp điện cho xe điện?',
    answer:
      'e-Motion có hệ thống trạm sạc tại các địa điểm thuê xe. Bạn cũng có thể sử dụng các trạm sạc công cộng. Phí nạp điện sẽ được thanh toán riêng.'
  },
  {
    question: 'Tôi có thể gia hạn thêm thời gian thuê không?',
    answer:
      'Có, bạn có thể yêu cầu gia hạn trực tiếp trên app hoặc liên hệ tổng đài. Việc gia hạn phụ thuộc vào tình trạng đặt xe tiếp theo của xe đó.'
  },
  {
    question: 'Làm thế nào để trở thành đối tác cho thuê xe?',
    answer:
      'Bạn có thể đăng ký làm đối tác bằng cách điền form trên website hoặc liên hệ hotline. Xe cần đáp ứng các tiêu chuẩn về chất lượng và giấy tờ hợp lệ.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

export function FaqSection() {
  return (
    <section>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-secondary mb-8 text-center text-4xl font-bold md:text-5xl'
      >
        Câu hỏi thường gặp
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        <Accordion type='single' collapsible className='w-full space-y-4'>
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem
                value={`item-${index}`}
                className='rounded-lg border bg-white px-6 shadow-sm transition-shadow hover:shadow-md'
              >
                <AccordionTrigger className='text-left font-semibold hover:no-underline'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='text-gray-600'>{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
