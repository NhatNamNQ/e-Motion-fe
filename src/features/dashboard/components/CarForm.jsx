import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Upload, X } from 'lucide-react'
import { toast } from 'sonner'

import { carBrands, carCategories } from '../constants/carConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import { carSchema } from '../schemas/carSchema'
import { uploadImage } from '@/lib/utils'
import Loader from '@/components/Loader'

const CarForm = ({ mode, handleSubmitCar, setShowCarForm, stations }) => {
  const isAdd = mode.type === 'add'
  const [isLoading, setIsLoading] = useState(false)

  // Initialize existing car images
  const initializeExistingImages = () => {
    if (mode.car?.images && mode.car.images.length > 0) {
      return mode.car.images.map((img, index) => ({
        id: `existing-${index}`,
        url: img.url,
        main: img.main || false,
        isExisting: true
      }))
    }
    return []
  }

  const getMainImageIdFromExisting = () => {
    if (!mode.car?.images || mode.car.images.length === 0) return null
    const mainImgIndex = mode.car.images.findIndex((img) => img.main === true)

    if (mainImgIndex !== -1) {
      const mainId = `existing-${mainImgIndex}`
      console.log('✅ Tìm thấy ảnh main tại index:', mainImgIndex, '-> ID:', mainId)
      return mainId
    }
    const firstId = `existing-0`
    return firstId
  }

  const [uploadedImages, setUploadedImages] = useState(initializeExistingImages())
  const [imagePreviews, setImagePreviews] = useState({})
  const [mainImageId, setMainImageId] = useState(getMainImageIdFromExisting())
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(carSchema),
    mode: 'onBlur',
    defaultValues: {
      name: mode.car?.name || '',
      description: mode.car?.description || '',
      brand: mode.car?.brand || '',
      category: mode.car?.category || '',
      seats: mode.car?.seats || 2,
      pricePer4Hours: mode.car?.pricePer4Hours || 0,
      depositFee: mode.car?.depositFee || 0,
      point: mode.car?.point || 0,
      consumptionRate: mode.car?.consumptionRate || 0,
      batteryLevel: mode.car?.batteryLevel || 0,
      batteryCapacity: mode.car?.batteryCapacity || 0,
      plateNumber: mode.car?.plateNumber || '',
      stationId: mode.car?.stationId || 1,
      images: mode.car?.images || []
    }
  })

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (!f.type.startsWith('image/')) {
      toast.error('Chỉ chọn file hình ảnh')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error('Kích thước max 5MB')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      const id = Math.random()
      setImagePreviews((prev) => ({
        ...prev,
        [id]: { file: f, preview: reader.result }
      }))
      if (!mainImageId) {
        setMainImageId(id)
      }
    }
    reader.readAsDataURL(f)
  }

  const handleRemoveImage = (id) => {
    setImagePreviews((prev) => {
      const updated = { ...prev }
      delete updated[id]
      return updated
    })
    if (mainImageId === id) {
      setMainImageId(null)
    }
  }

  const handleRemoveUploadedImage = async (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id))
    if (mainImageId === id) {
      setMainImageId(null)
    }
  }

  const handleSetMainImage = (id) => {
    setMainImageId(id)
  }

  const handleSubmitWithImages = async (data) => {
    const totalImages = Object.keys(imagePreviews).length + uploadedImages.length
    if (totalImages === 0) {
      toast.error('Phải có ít nhất 1 ảnh xe')
      return
    }
    if (!mainImageId) {
      toast.error('Vui lòng chọn ảnh chính')
      return
    }

    setIsLoading(true)
    try {
      // Upload các ảnh mới (không phải ảnh có sẵn)
      const newImages = await Promise.all(
        Object.entries(imagePreviews).map(async ([id]) => {
          const { file } = imagePreviews[id]
          const url = await uploadImage(file, 'cars', data.name)
          return {
            url,
            main: parseFloat(id) === mainImageId
          }
        })
      )
      const updatedUploadedImages = uploadedImages.map((img) => ({
        url: img.url,
        main: img.id === mainImageId
      }))
      const allImages = [...updatedUploadedImages, ...newImages]
      await handleSubmitCar({
        ...data,
        id: mode.car.id,
        images: allImages.map(({ url, main }) => ({ url, main }))
      })
      toast.success(isAdd ? 'Thêm xe thành công' : 'Cập nhật xe thành công')
      setShowCarForm(false)
    } catch (error) {
      toast.error('Lỗi: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={setShowCarForm}>
      <DialogContent className='max-h-[95vh] w-full max-w-4xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{isAdd ? 'Thêm xe mới' : 'Chỉnh sửa xe'}</DialogTitle>
          <DialogDescription>
            {isAdd ? 'Nhập thông tin chi tiết về xe' : 'Cập nhật thông tin xe'}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(handleSubmitWithImages)} className='space-y-6 px-6 py-4'>
            {/* Hàng 1: Thông tin cơ bản */}
            <div className='grid gap-4 md:grid-cols-2'>
              {/* Name */}
              <div>
                <Label className='text-sm font-medium' htmlFor='name'>
                  Tên xe
                </Label>
                <Input
                  disabled={mode.car}
                  id='name'
                  {...register('name')}
                  placeholder='VD: VinFast Evo200'
                  className='mt-1'
                />
                {errors.name && <p className='mt-1 text-xs text-red-500'>{errors.name.message}</p>}
              </div>

              {/* Brand */}
              <div>
                <Label className='text-sm font-medium' htmlFor='brand'>
                  Hãng xe
                </Label>
                <Select value={watch('brand')} onValueChange={(value) => setValue('brand', value)}>
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Chọn hãng' />
                  </SelectTrigger>
                  <SelectContent>
                    {carBrands.map((b) => (
                      <SelectItem key={b.value} value={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.brand && (
                  <p className='mt-1 text-xs text-red-500'>{errors.brand.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label className='text-sm font-medium' htmlFor='category'>
                  Loại xe
                </Label>
                <Select
                  value={watch('category')}
                  onValueChange={(value) => setValue('category', value)}
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Chọn loại' />
                  </SelectTrigger>
                  <SelectContent>
                    {carCategories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className='mt-1 text-xs text-red-500'>{errors.category.message}</p>
                )}
              </div>

              <div>
                <Label className='text-sm font-medium' htmlFor='stationId'>
                  Trạm
                </Label>
                <Select
                  value={String(watch('stationId'))}
                  onValueChange={(value) => setValue('stationId', Number(value))}
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Chọn trạm' />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Seats */}
              <div>
                <Label className='text-sm font-medium' htmlFor='seats'>
                  Số ghế
                </Label>
                <Input
                  id='seats'
                  type='number'
                  {...register('seats', { valueAsNumber: true })}
                  className='mt-1'
                />
                {errors.seats && (
                  <p className='mt-1 text-xs text-red-500'>{errors.seats.message}</p>
                )}
              </div>

              <div>
                <Label className='text-sm font-medium' htmlFor='plateNumber'>
                  Biển số xe
                </Label>
                <Input
                  id='plateNumber'
                  {...register('plateNumber')}
                  placeholder='VD: 29A-12345'
                  className='mt-1'
                />
                {errors.plateNumber && (
                  <p className='mt-1 text-xs text-red-500'>{errors.plateNumber.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className='text-sm font-medium' htmlFor='description'>
                Mô tả
              </Label>
              <textarea
                id='description'
                {...register('description')}
                placeholder='Nhập mô tả chi tiết về xe...'
                className='border-input mt-1 min-h-[60px] w-full rounded-md border px-3 py-2 text-sm'
              />
              {errors.description && (
                <p className='mt-1 text-xs text-red-500'>{errors.description.message}</p>
              )}
            </div>

            {/* Hàng 2: Thông tin giá */}
            <div className='grid gap-4 md:grid-cols-3'>
              <div>
                <Label className='text-sm font-medium' htmlFor='pricePer4Hours'>
                  Giá (4 giờ)
                </Label>
                <Input
                  id='pricePer4Hours'
                  type='number'
                  step='any'
                  {...register('pricePer4Hours', { valueAsNumber: true })}
                  className='mt-1'
                />
                {errors.pricePer4Hours && (
                  <p className='mt-1 text-xs text-red-500'>{errors.pricePer4Hours.message}</p>
                )}
              </div>

              <div>
                <Label className='text-sm font-medium' htmlFor='depositFee'>
                  Tiền đặt cọc
                </Label>
                <Input
                  id='depositFee'
                  type='number'
                  step='any'
                  {...register('depositFee', { valueAsNumber: true })}
                  className='mt-1'
                />
                {errors.depositFee && (
                  <p className='mt-1 text-xs text-red-500'>{errors.depositFee.message}</p>
                )}
              </div>

              <div>
                <Label className='text-sm font-medium' htmlFor='consumptionRate'>
                  Điểm giảm giá
                </Label>
                <Input
                  id='consumptionRate'
                  type='number'
                  step='any'
                  {...register('point', { valueAsNumber: true })}
                  className='mt-1'
                />
                {errors.point && (
                  <p className='mt-1 text-xs text-red-500'>{errors.point.message}</p>
                )}
              </div>
            </div>

            {/* Hàng 3: Thông tin pin */}
            <div className='grid gap-4 md:grid-cols-3'>
              <div>
                <Label className='text-sm font-medium' htmlFor='batteryLevel'>
                  Mức pin (%)
                </Label>
                <Input
                  id='batteryLevel'
                  type='number'
                  step='any'
                  {...register('batteryLevel', { valueAsNumber: true })}
                  className='mt-1'
                />
                {errors.batteryLevel && (
                  <p className='mt-1 text-xs text-red-500'>{errors.batteryLevel.message}</p>
                )}
              </div>

              <div>
                <Label className='text-sm font-medium' htmlFor='batteryCapacity'>
                  Dung lượng pin
                </Label>
                <Input
                  id='batteryCapacity'
                  type='number'
                  step='any'
                  {...register('batteryCapacity', { valueAsNumber: true })}
                  className='mt-1'
                />
                {errors.batteryCapacity && (
                  <p className='mt-1 text-xs text-red-500'>{errors.batteryCapacity.message}</p>
                )}
              </div>
              <div>
                <Label className='text-sm font-medium' htmlFor='consumptionRate'>
                  Mức tiêu thụ
                </Label>
                <Input
                  id='consumptionRate'
                  type='number'
                  step='any'
                  {...register('consumptionRate', { valueAsNumber: true })}
                  className='mt-1'
                />
                {errors.consumptionRate && (
                  <p className='mt-1 text-xs text-red-500'>{errors.consumptionRate.message}</p>
                )}
              </div>
            </div>

            {/* Images */}
            <div className='border-t border-gray-200 pt-6'>
              <Label className='text-sm font-medium'>Hình ảnh xe *</Label>

              {/* Ảnh sẵn từ DB (khi edit) */}
              {uploadedImages.length > 0 && (
                <div>
                  <p className='mt-3 text-xs font-medium text-gray-600'>
                    📸 Ảnh đã lưu ({uploadedImages.length})
                  </p>
                  <div className='mt-2 grid gap-3 md:grid-cols-4'>
                    {uploadedImages.map((img) => (
                      <div key={img.id} className='group relative'>
                        <img
                          src={img.url}
                          alt='Uploaded'
                          className={`h-24 w-full cursor-pointer rounded-lg object-cover transition ${
                            mainImageId === img.id ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                          }`}
                          onClick={() => handleSetMainImage(img.id)}
                        />
                        {mainImageId === img.id && (
                          <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-blue-500/20'>
                            <span className='rounded bg-white px-2 py-1 text-xs font-semibold text-blue-600'>
                              Main
                            </span>
                          </div>
                        )}
                        <button
                          type='button'
                          onClick={() => handleRemoveUploadedImage(img.id)}
                          className='absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100'
                          title='Xóa ảnh'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ảnh preview chưa upload */}
              {Object.entries(imagePreviews).length > 0 && (
                <div>
                  <p className='mt-3 text-xs font-medium text-gray-600'>
                    ⏳ Ảnh chưa upload ({Object.entries(imagePreviews).length})
                  </p>
                  <div className='mt-2 grid gap-3 md:grid-cols-4'>
                    {Object.entries(imagePreviews).map(([id, { preview }]) => (
                      <div key={id} className='group relative'>
                        <img
                          src={preview}
                          alt='Preview'
                          className={`h-24 w-full cursor-pointer rounded-lg object-cover transition ${
                            mainImageId === parseFloat(id)
                              ? 'ring-2 ring-blue-500'
                              : 'hover:opacity-80'
                          }`}
                          onClick={() => handleSetMainImage(parseFloat(id))}
                        />
                        {mainImageId === parseFloat(id) && (
                          <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-blue-500/20'>
                            <span className='rounded bg-white px-2 py-1 text-xs font-semibold text-blue-600'>
                              Main
                            </span>
                          </div>
                        )}
                        <button
                          type='button'
                          onClick={() => handleRemoveImage(id)}
                          className='absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100'
                          title='Xóa ảnh'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload input */}
              <label className='mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-8 transition hover:bg-gray-100'>
                <Upload className='mb-2 h-8 w-8 text-gray-400' />
                <span className='text-sm text-gray-600'>Chọn ảnh để thêm</span>
                <span className='mt-1 text-xs text-gray-400'>PNG, JPG (Max 5MB)</span>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='hidden'
                />
              </label>
              <p className='mt-2 text-xs text-gray-500'>💡 Click vào ảnh để chọn làm ảnh chính</p>
              {!mainImageId && Object.keys(imagePreviews).length + uploadedImages.length > 0 && (
                <p className='mt-2 text-xs text-red-500'>⚠️ Vui lòng chọn 1 ảnh làm ảnh chính</p>
              )}
            </div>

            {/* Actions */}
            <div className='flex justify-end gap-3 border-t border-gray-200 pt-6'>
              <Button type='button' variant='outline' onClick={() => setShowCarForm(false)}>
                Hủy
              </Button>
              <Button type='submit'>{isAdd ? 'Thêm xe' : 'Cập nhật'}</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CarForm
