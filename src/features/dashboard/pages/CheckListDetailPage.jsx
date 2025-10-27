import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { checkListService } from '../services/checkListService'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Loader from '@/components/Loader'

const CheckListDetailPage = () => {
  const { id } = useParams()
  const [checkList, setCheckList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCheckListDetail = async () => {
      try {
        setLoading(true)
        const data = await checkListService.getCheckListDetail(id)
        setCheckList(data)
      } catch (error) {
        console.error(error)
        setError('Failed to load checklist details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      getCheckListDetail()
    }
  }, [id])

  if (loading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardContent className='pt-6'>
            <p className='text-center text-red-500'>{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!checkList) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardContent className='pt-6'>
            <p className='text-center text-gray-500'>Checklist not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <Card className='mx-auto w-full max-w-4xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Checklist Details</CardTitle>
          <CardDescription>Complete vehicle inspection checklist</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Basic Information */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-500'>ID</label>
              <p className='text-lg font-semibold'>{checkList.id || 'N/A'}</p>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-500'>Type</label>
              <Badge variant='secondary' className='text-sm'>
                {checkList.type || 'N/A'}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Financial Information */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-500'>Fee</label>
              <p className='text-lg font-semibold text-green-600'>
                ${checkList.fee?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-500'>Current Battery</label>
              <div className='flex items-center space-x-2'>
                <p className='text-lg font-semibold'>
                  {checkList.currentBattery?.toFixed(1) || '0.0'}%
                </p>
                <Badge
                  variant={
                    checkList.currentBattery >= 80
                      ? 'default'
                      : checkList.currentBattery >= 50
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {checkList.currentBattery >= 80
                    ? 'Good'
                    : checkList.currentBattery >= 50
                      ? 'Medium'
                      : 'Low'}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vehicle Information */}
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-500'>Vehicle Image</label>
              {checkList.img ? (
                <div className='w-full max-w-md'>
                  <img
                    src={checkList.img}
                    alt='Vehicle'
                    className='h-auto w-full rounded-lg border shadow-sm'
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              ) : (
                <p className='text-gray-400 italic'>No image available</p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-500'>Rental ID</label>
              <p className='text-lg font-semibold'>{checkList.rentalId || 'N/A'}</p>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-500'>Staff Email</label>
              <p className='text-lg'>{checkList.staffEmail || 'N/A'}</p>
            </div>
          </div>

          <Separator />

          {/* Timestamp */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-500'>Created At</label>
            <p className='text-lg'>
              {checkList.createdAt ? new Date(checkList.createdAt).toLocaleString() : 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckListDetailPage
