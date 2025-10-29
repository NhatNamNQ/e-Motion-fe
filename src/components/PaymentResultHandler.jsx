import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from './Loader'
import instance from '@/lib/axios'

const PaymentResultHandler = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const txnRef = searchParams.get('txnRef')
  const type = searchParams.get('type')

  useEffect(() => {
    if (!txnRef) return

    const getPaymentAndNavigate = async () => {
      try {
        const { data } = await instance.get(`/payment/vnpay/${txnRef}`)
        const paymentData = data.data

        if (paymentData) {
          if (type === 'RESERVATION') {
            navigate('/booking/payment-result', {
              state: { payment: paymentData }
            })
          } else if (type === 'RENTAL') {
            navigate('/dashboard/payment-result', {
              state: { payment: paymentData }
            })
          }
        } else {
          console.error('Không tìm thấy thông tin thanh toán cho txnRef:', txnRef)
          navigate('/error-page')
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin thanh toán:', error)
        navigate('/payment-error')
      }
    }

    getPaymentAndNavigate()
  }, [txnRef, type, navigate])
  return <Loader />
}

export default PaymentResultHandler
