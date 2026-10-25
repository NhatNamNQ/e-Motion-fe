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
  const orderCode = searchParams.get('orderCode')
  const cancel = searchParams.get('cancel')
  const code = searchParams.get('code')

  useEffect(() => {
    if (status === 'failed' || status === 'CANCELLED' || cancel === 'true') {
      if (type === 'RESERVATION') {
        navigate('/booking/payment-result', {
          state: {
            status: 'failed'
          }
        })
      } else {
        navigate('/payment-result', {
          state: {
            type,
            txnRef,
            status: 'failed'
          }
        })
      }
      return
    }

    if (orderCode) {
      const checkPayOS = async () => {
        try {
          const { data } = await instance.post(`/payment/payos/check/${orderCode}`)
          const paymentData = data.data
          if (paymentData) {
            if (paymentData.type === 'RESERVATION') {
              navigate('/booking/payment-result', {
                state: { payment: paymentData }
              })
            } else {
              navigate('/payment-result', {
                state: { payment: paymentData }
              })
            }
          } else {
            navigate('/payment-result')
          }
        } catch (error) {
          console.error('Lỗi khi kiểm tra thanh toán PayOS:', error)
          navigate('/payment-result')
        }
      }
      checkPayOS()
      return
    }

    const getPaymentAndNavigate = async () => {
      try {
        if (!txnRef) {
          navigate('/payment-result')
          return
        }
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
  }, [txnRef, type, navigate, status, orderCode, cancel, code])
  return <Loader />
}

export default PaymentResultHandler
