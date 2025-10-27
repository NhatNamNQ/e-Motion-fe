import SuccessPaymentCard from '@/components/SuccessPaymentCard'
import FailedPaymentCard from '@/components/FailedPaymentCard'
import { useLocation } from 'react-router-dom'

const SuccessPaymentPage = () => {
  const location = useLocation()
  const status = location?.state?.status
  const txnRef = location?.state?.txnRef

  return (
    <div>
      {status === 'success' ? <SuccessPaymentCard txnRef={txnRef} /> : <FailedPaymentCard />}
    </div>
  )
}

export default SuccessPaymentPage
