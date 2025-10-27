import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from './Loader'

const PaymentResultHandler = () => {
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  useEffect(() => {
    const status = searchParams.get('status')
    const txnRef = searchParams.get('txnRef')
    const type = searchParams.get('type')

    if (type === 'RESERVATION')
      navigate('/booking/payment-result', {
        state: {
          status,
          txnRef
        }
      })
    if (type === 'RENTAL') {
      navigate('/dashboard/payment-result', {
        state: {
          status,
          txnRef
        }
      })
    }
  })
  return <Loader />
}

export default PaymentResultHandler
