import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from './Loader'
import instance from '@/lib/axios'

const PaymentResultHandler = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const txnRef = searchParams.get('txnRef')
  const type = searchParams.get('type')
  const status = searchParams.get('status')

  useEffect(() => {
    if (status === 'failed') {
      if (type === 'RESERVATION') {
        navigate('/booking/payment-result', {
          state: {
            status
          }
        })
      } else {
        navigate('/payment-result', {
          state: {
            type,
            txnRef,
            status
          }
        })
      }
      return
    }
    const getPaymentAndNavigate = async () => {
      try {
        const { data } = await instance.get(`/payment/vnpay/${txnRef}`)
        const paymentData = data.data

        if (paymentData) {
          if (type === 'RESERVATION') {
            navigate('/booking/payment-result', {
              state: { payment: paymentData }
            })
          } else {
            navigate('/payment-result', {
              state: { payment: paymentData }
            })
          }
        } else {
          console.error('Không tìm thấy thông tin thanh toán cho txnRef:', txnRef)
          navigate('/payment-result')
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin thanh toán:', error)
        navigate('/payment-result')
      }
    }

    getPaymentAndNavigate()
  }, [txnRef, type, navigate, status])
  return <Loader />
}

export default PaymentResultHandler
