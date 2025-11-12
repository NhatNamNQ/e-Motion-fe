import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PriceFilter = ({ priceRange, onPriceChange, isOpen, onOpenChange }) => {
  const [localMinPrice, setLocalMinPrice] = useState(priceRange[0])
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange[1])
  const [error, setError] = useState('')

  const handleMinPriceChange = (e) => {
    const value = e.target.value
    if (value === '' || parseInt(value) >= 0) {
      setLocalMinPrice(value)
      setError('')
    }
  }

  const handleMaxPriceChange = (e) => {
    const value = e.target.value
    if (value === '' || parseInt(value) >= 0) {
      setLocalMaxPrice(value)
      setError('')
    }
  }

  const handleApply = () => {
    const minPrice = Math.max(0, parseInt(localMinPrice) || 0)
    const maxPrice = parseInt(localMaxPrice) || 1000000

    if (maxPrice < minPrice) {
      setError('Giá cao nhất phải lớn hơn hoặc bằng giá thấp nhất')
      return
    }

    onPriceChange([minPrice, Math.min(1000000, maxPrice)])
    onOpenChange(false)
    setError('')
  }

  const handleClear = () => {
    setLocalMinPrice(0)
    setLocalMaxPrice(1000000)
    setError('')
  }

  const formatPrice = (price) => {
    return parseInt(price || 0).toLocaleString('vi-VN')
  }

  const hasValue = priceRange[0] > 0 || priceRange[1] < 1000000

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={`flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
            hasValue
              ? 'border-secondary bg-secondary/10 text-secondary'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Giá thuê
          {hasValue && (
            <span className='bg-secondary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white'>
              1
            </span>
          )}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-4' align='start'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-gray-800'>Giá thuê (VNĐ/giờ)</h3>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleClear}
              className='text-sm text-gray-500 hover:text-gray-700'
            >
              Xóa
            </Button>
          </div>

          <div className='space-y-4'>
            {/* Min Price Input */}
            <div className='space-y-2'>
              <Label htmlFor='minPrice' className='text-sm font-medium'>
                Giá thấp nhất
              </Label>
              <div className='relative'>
                <Input
                  id='minPrice'
                  type='number'
                  min='0'
                  max='1000000'
                  step='10000'
                  value={localMinPrice}
                  onChange={handleMinPriceChange}
                  onKeyDown={(e) => {
                    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                      e.preventDefault()
                    }
                  }}
                  className='pr-12'
                  placeholder='0'
                />
                <span className='absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500'>
                  đ
                </span>
              </div>
              <p className='text-xs text-gray-500'>{formatPrice(localMinPrice)}đ</p>
            </div>

            {/* Max Price Input */}
            <div className='space-y-2'>
              <Label htmlFor='maxPrice' className='text-sm font-medium'>
                Giá cao nhất
              </Label>
              <div className='relative'>
                <Input
                  id='maxPrice'
                  type='number'
                  min='0'
                  max='1000000'
                  step='10000'
                  value={localMaxPrice}
                  onChange={handleMaxPriceChange}
                  onKeyDown={(e) => {
                    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                      e.preventDefault()
                    }
                  }}
                  className='pr-12'
                  placeholder='1000000'
                />
                <span className='absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500'>
                  đ
                </span>
              </div>
              <p className='text-xs text-gray-500'>{formatPrice(localMaxPrice)}đ</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className='rounded-md bg-red-50 p-2'>
                <p className='text-xs text-red-600'>{error}</p>
              </div>
            )}

            {/* Quick Select Buttons */}
            <div className='space-y-2'>
              <Label className='text-sm font-medium'>Chọn nhanh</Label>
              <div className='grid grid-cols-2 gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setLocalMinPrice(0)
                    setLocalMaxPrice(200000)
                    setError('')
                  }}
                  className='text-xs'
                >
                  Dưới 200k
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setLocalMinPrice(200000)
                    setLocalMaxPrice(500000)
                    setError('')
                  }}
                  className='text-xs'
                >
                  200k - 500k
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setLocalMinPrice(500000)
                    setLocalMaxPrice(1000000)
                    setError('')
                  }}
                  className='text-xs'
                >
                  500k - 1tr
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setLocalMinPrice(1000000)
                    setLocalMaxPrice(1000000)
                    setError('')
                  }}
                  className='text-xs'
                >
                  Trên 1tr
                </Button>
              </div>
            </div>
          </div>

          <Button onClick={handleApply} className='bg-secondary hover:bg-secondary/80 w-full'>
            Áp dụng
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PriceFilter
