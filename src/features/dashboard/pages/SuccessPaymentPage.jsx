import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SuccessPaymentCard from '@/components/SuccessPaymentCard'
import FailedPaymentCard from '@/components/FailedPaymentCard'
import Loader from '@/components/Loader'

const SuccessPaymentPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { payment } = location.state || {}

  useEffect(() => {
    if (!payment) {
      console.warn('Không có dữ liệu thanh toán. Điều hướng về dashboard.')
      navigate('/dashboard/rentals')
    }
  }, [payment, navigate])

  const handleNavigateBack = () => {
    navigate(`/dashboard/rentals/${payment.rentalResponse.id}`)
  }

  if (!payment) {
    return <Loader />
  }

  const status = payment.status
  const txnRef = payment.txnRef

  return (
    <div>
      {status === 'SUCCESS' ? (
        <SuccessPaymentCard txnRef={txnRef} onNavigate={handleNavigateBack} />
      ) : (
        <FailedPaymentCard onNavigate={handleNavigateBack} />
      )}
    </div>
  )
}

export default SuccessPaymentPage
