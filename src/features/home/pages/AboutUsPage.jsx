// eslint-disable-next-line
import { motion } from 'framer-motion'
import { Zap, Shield, Leaf, Users, Award, Heart, Car, CarFront } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const AboutUsPage = () => {
  const stats = [
    { icon: Users, label: 'Khách hàng', value: '20+' },
    { icon: Car, label: 'Xe điện', value: '40+' },
    { icon: Award, label: 'Trạm cho thuê', value: '6' },
    { icon: CarFront, label: 'Dòng xe đa dạng', value: '10+' }
  ]

  const values = [
    {
      icon: Shield,
      title: 'An toàn & Tin cậy',
      description: 'Tất cả xe đều được kiểm tra kỹ lưỡng và có bảo hiểm đầy đủ'
    },
    {
      icon: Leaf,
      title: 'Thân thiện môi trường',
      description: 'Góp phần giảm ô nhiễm và bảo vệ môi trường cho thế hệ tương lai'
    },
    {
      icon: Zap,
      title: 'Tiện lợi & Nhanh chóng',
      description: 'Đặt xe dễ dàng, nhận xe nhanh chóng, trả xe thuận tiện'
    },
    {
      icon: Heart,
      title: 'Khách hàng là trọng tâm',
      description: 'Hỗ trợ 24/7, luôn lắng nghe và đáp ứng nhu cầu của bạn'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='from-secondary/90 to-secondary relative bg-gradient-to-r py-20 text-white'>
        <div className='relative container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <h1 className='mb-6 text-5xl font-bold md:text-6xl'>Về e-Motion</h1>
            <p className='mx-auto max-w-3xl text-xl md:text-2xl'>
              Nền tảng cho thuê xe điện tiên phong tại Việt Nam, mang đến giải pháp di chuyển xanh,
              thông minh và bền vững
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='bg-white py-12'>
        <div className='container mx-auto px-4'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid grid-cols-2 gap-6 md:grid-cols-4'
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='text-center'
                whileHover={{ scale: 1.05 }}
              >
                <div className='bg-secondary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                  <stat.icon className='text-secondary h-8 w-8' />
                </div>
                <div className='text-3xl font-bold text-gray-800'>{stat.value}</div>
                <div className='text-gray-600'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mx-auto max-w-4xl'
          >
            <h2 className='text-secondary mb-8 text-center text-4xl font-bold'>
              Câu chuyện của chúng tôi
            </h2>
            <div className='space-y-6 text-lg leading-relaxed text-gray-700'>
              <p>
                e-Motion ra đời với sứ mệnh tiên phong trong việc phát triển hệ sinh thái xe điện
                tại Việt Nam. Chúng tôi tin rằng xe điện không chỉ là phương tiện di chuyển hiện đại
                mà còn là giải pháp bền vững cho tương lai xanh của đất nước.
              </p>
              <p>
                Hiện tại, e-Motion tự hào sở hữu hơn 40 xe điện đa dạng với 10+ dòng xe từ các
                thương hiệu uy tín, đáp ứng mọi nhu cầu di chuyển của khách hàng. Với mạng lưới 6
                trạm cho thuê tại Hồ Chí Minh và Hà Nội, chúng tôi cam kết mang đến sự tiện lợi tối
                đa cho khách hàng.
              </p>
              <p>
                Đội ngũ e-Motion bao gồm các chuyên gia giàu kinh nghiệm trong lĩnh vực công nghệ, ô
                tô và dịch vụ khách hàng. Chúng tôi không ngừng đổi mới, phát triển nền tảng và mở
                rộng đội xe để phục vụ ngày càng nhiều khách hàng tin tưởng lựa chọn.
              </p>
              <p>
                Với hơn 20 khách hàng đã tin dùng và số lượng ngày càng tăng, e-Motion đang từng
                bước khẳng định vị thế là đơn vị cho thuê xe điện uy tín và chất lượng tại Việt Nam.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-secondary mb-12 text-center text-4xl font-bold'
          >
            Giá trị cốt lõi
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className='h-full transition-shadow hover:shadow-lg'>
                  <CardContent className='p-6 text-center'>
                    <div className='bg-secondary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                      <value.icon className='text-secondary h-8 w-8' />
                    </div>
                    <h3 className='mb-3 text-xl font-bold text-gray-800'>{value.title}</h3>
                    <p className='text-gray-600'>{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='from-secondary/90 to-secondary bg-gradient-to-r py-16 text-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mx-auto max-w-4xl text-center'
          >
            <h2 className='mb-6 text-4xl font-bold'>Sứ mệnh của chúng tôi</h2>
            <p className='mb-8 text-xl leading-relaxed'>
              "Xây dựng hệ sinh thái xe điện toàn diện, góp phần bảo vệ môi trường và nâng cao chất
              lượng cuộc sống cho cộng đồng. Chúng tôi cam kết mang đến dịch vụ thuê xe điện chất
              lượng cao với đội xe đa dạng, giá cả hợp lý, quy trình thuê xe đơn giản và hỗ trợ
              khách hàng tận tâm, đồng thời khuyến khích người dân Việt Nam chuyển đổi sang phương
              tiện giao thông xanh."
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href='/cars'
                className='text-secondary inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold transition-colors hover:bg-gray-100'
              >
                Khám phá xe ngay
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage
