import FailedPaymentCard from '@/components/FailedPaymentCard'
import SuccessPaymentCard from '@/components/SuccessPaymentCard'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { payment } = location.state || {}

  const handleNavigate = () => {
    switch (payment.type) {
      case 'RENTAL':
      case 'RENTAL_EXTENSION':
        navigate(`/account/rentals/${payment.rentalResponse.id}`)
        break
      default:
        break
    }
  }

  return (
    <div className='container mx-auto my-10'>
      {payment?.status === 'SUCCESS' ? (
        <SuccessPaymentCard onNavigate={handleNavigate} />
      ) : (
        <FailedPaymentCard onNavigate={handleNavigate} />
      )}
    </div>
  )
}

export default PaymentResultPage
