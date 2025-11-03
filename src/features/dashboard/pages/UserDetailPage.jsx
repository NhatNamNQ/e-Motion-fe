import { useState, useEffect } from 'react'
import { ArrowLeft, Edit2 } from 'lucide-react'
import StaffDetail from '../components/StaffDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { userService } from '../services/userService'
import Loader from '@/components/Loader'
import { toast } from 'sonner'

export default function UserDetail() {
  const { email } = useParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [transaction, setTransaction] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!email) return
      try {
        setLoading(true)
        const data = await userService.getUserByEmail(email)
        console.log(data)
        if (data.role === 'ROLE_STAFF') {
          const transactionData = await userService.getStaffTransactions(data.staffId)
          setTransaction(transactionData)
        }
        setUser(data)
      } catch (err) {
        toast.error('Error fetching rental: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUserDetail()
  }, [email])

  if (loading) return <Loader />

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='mx-auto max-w-6xl px-6 py-4'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/dashboard/users')}
            className='rounded-lg p-2 transition hover:bg-gray-100'
          >
            <ArrowLeft className='h-5 w-5' />
          </button>
          <div>
            <h1 className='text-2xl font-bold'>{user.fullName}</h1>
            <p className='text-sm text-gray-600'>{user.role}</p>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-6xl px-6 py-6'>
        {/* Renter */}

        {/* Staff */}
        <StaffDetail user={user} transaction={transaction} />
      </div>
    </div>
  )
}
