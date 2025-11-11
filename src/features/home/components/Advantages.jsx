// eslint-disable-next-line
import { motion } from 'framer-motion'

const advantages = [
  {
    title: 'An tâm đặt xe',
    description: 'Hoàn tiền giữ chỗ nếu hủy chuyến trong vòng 5 ngày trước chuyến đi.',
    image: '/advantages/safe.svg',
    color: 'bg-blue-100'
  },
  {
    title: 'Thủ tục đơn giản',
    description: 'Chỉ cần có CCCD gắn chip & Giấy phép lái xe là bạn đủ điều kiện thuê xe.',
    image: '/advantages/document.svg',
    color: 'bg-blue-100'
  },
  {
    title: 'Dòng xe đa dạng',
    description:
      'Có nhiều dòng xe cho bạn tự do lựa chọn: Sedan, SUV, MPV, Bán tải và nhiều loại khác để phù hợp với mục đích sử dụng.',
    image: '/advantages/types.svg',
    color: 'bg-blue-100'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, //delay each children appear
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
}

const Advantages = () => {
  return (
    <div className='container mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className='mb-16 text-center'
      >
        <h2 className='text-secondary mb-4 text-4xl font-bold md:text-5xl'>Ưu Điểm Của e-Motion</h2>
        <p className='text-lg text-gray-600'>Tại sao bạn nên chọn chúng tôi để thuê xe </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        className='grid grid-cols-1 gap-8 md:grid-cols-3'
      >
        {advantages.map((advantage, index) => {
          const Icon = advantage.icon
          return (
            <motion.div
              key={advantage.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className='flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl'
            >
              <motion.div
                variants={iconVariants}
                whileHover='hover'
                className={`${advantage.color} mb-6 rounded-full p-4`}
              >
                <img src={advantage.image} alt='' />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className='mb-3 text-2xl font-bold text-gray-900'
              >
                {advantage.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className='text-sm leading-relaxed text-gray-600'
              >
                {advantage.description}
              </motion.p>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Advantages
