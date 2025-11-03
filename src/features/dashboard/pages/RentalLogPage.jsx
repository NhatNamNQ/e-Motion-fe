import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Trash2, Upload, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { toast } from 'sonner'
import { rentalService } from '../services/rentalService'
import { uploadImage } from '@/lib/utils'
import Loader from '@/components/Loader'

export default function RentalLogPage() {
  const { rentalId, logId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [imagePreviews, setImagePreviews] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [existingLog, setExistingLog] = useState(null)

  const { staffId } = useSelector(selectUser)
  const vehicleId = location.state?.carId
  console.log(location.state)

  // Check if this is edit mode
  const isEditMode = !!logId

  const form = useForm({
    defaultValues: {
      repairItems: [{ description: '', cost: 0 }],
      imgs: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'repairItems'
  })

  // Load existing vehicle log data if in edit mode
  useEffect(() => {
    const loadExistingLog = async () => {
      if (!isEditMode || !logId) return

      try {
        setLoading(true)
        const logData = await rentalService.getVehicleLogDetail(logId)
        setExistingLog(logData)

        // Populate form with existing data
        const repairItems =
          logData.repairItems && logData.repairItems.length > 0
            ? logData.repairItems
            : [{ description: '', cost: 0 }]

        form.reset({
          repairItems: repairItems,
          imgs: logData.imgs || []
        })

        // Set image previews for existing images
        if (logData.imgs && logData.imgs.length > 0) {
          const existingPreviews = logData.imgs.map((url, index) => ({
            url: url,
            name: `existing-image-${index}`,
            isExisting: true
          }))
          setImagePreviews(existingPreviews)
        }
      } catch (error) {
        toast.error(`Lỗi khi tải dữ liệu: ${error.message}`)
        navigate(`/dashboard/rentals/${rentalId}`)
      } finally {
        setLoading(false)
      }
    }

    loadExistingLog()
  }, [isEditMode, logId, form, navigate, rentalId])

  const repairItems = form.watch('repairItems')
  const totalCost = repairItems.reduce((acc, item) => acc + (Number(item.cost) || 0), 0)

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files)

    if (files.length > 0) {
      // Validate file types and sizes
      const validFiles = files.filter((file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        const maxSize = 5 * 1024 * 1024 // 5MB

        if (!validTypes.includes(file.type)) {
          toast.error(`${file.name} không phải là file hình ảnh hợp lệ`)
          return false
        }

        if (file.size > maxSize) {
          toast.error(`${file.name} vượt quá 5MB`)
          return false
        }

        return true
      })

      if (validFiles.length > 0) {
        setImageFiles((prev) => [...prev, ...validFiles])

        // Create previews
        const newPreviews = validFiles.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          isExisting: false
        }))
        setImagePreviews((prev) => [...prev, ...newPreviews])
      }
    }
  }

  const handleRemoveImage = (index) => {
    const imageToRemove = imagePreviews[index]

    if (imageToRemove.isExisting) {
      // Remove from existing images in form
      const currentUrls = form.getValues('imgs')
      const existingImagesBeforeIndex = imagePreviews
        .slice(0, index)
        .filter((img) => img.isExisting).length
      const updatedUrls = currentUrls.filter((_, i) => i !== existingImagesBeforeIndex)
      form.setValue('imgs', updatedUrls)
    } else {
      // Remove from new uploaded files
      const newFilesIndex = imagePreviews.slice(0, index).filter((img) => !img.isExisting).length
      setImageFiles((prev) => prev.filter((_, i) => i !== newFilesIndex))

      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(imageToRemove.url)
    }

    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUploadImages = async () => {
    if (imageFiles.length === 0) {
      toast.error('Vui lòng chọn hình ảnh trước')
      return
    }

    try {
      setUploadingImages(true)
      const uploadPromises = imageFiles.map((file) => uploadImage(file, 'vehicle log'))
      const uploadedUrls = await Promise.all(uploadPromises)

      // Update form with uploaded URLs
      const currentUrls = form.getValues('imgs') || []
      form.setValue('imgs', [...currentUrls, ...uploadedUrls])

      // Update previews to mark new files as existing
      setImagePreviews((prev) =>
        prev.map((preview) => (preview.isExisting ? preview : { ...preview, isExisting: true }))
      )

      // Clear files after successful upload
      setImageFiles([])

      toast.success(`Upload thành công ${uploadedUrls.length} hình ảnh`)
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(`Upload thất bại: ${error.message}`)
    } finally {
      setUploadingImages(false)
    }
  }

  const onSubmit = async (values) => {
    // Check if images are uploaded for new files
    if (imageFiles.length > 0) {
      toast.error('Vui lòng upload hình ảnh trước khi lưu')
      return
    }

    // For create mode, require at least one image
    if (!isEditMode && values.imgs.length === 0) {
      toast.error('Vui lòng upload hình ảnh trước khi lưu')
      return
    }

    try {
      const submitData = {
        rentalId: rentalId,
        vehicleId: vehicleId || existingLog?.vehicleId,
        staffId: staffId,
        repairItems: values.repairItems,
        imgs: values.imgs
      }

      let data
      if (isEditMode) {
        data = await rentalService.updateVehicleLog(logId, submitData)
        toast.success('Cập nhật vehicle log thành công!')
      } else {
        data = await rentalService.createVehicleLog(submitData)
        toast.success('Tạo vehicle log thành công!')
      }

      if (data) {
        form.reset()
        setImagePreviews([])
        setImageFiles([])
        navigate(`/dashboard/rentals/${rentalId}`)
      }
    } catch (error) {
      toast.error(`Lỗi khi ${isEditMode ? 'cập nhật' : 'tạo'} log: ${error.message}`)
    }
  }

  if (loading) return <Loader />

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditMode
            ? `Chỉnh sửa Vehicle Log #${logId}`
            : `Tạo Vehicle Log cho Rental #${rentalId}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div>
              <h3 className='mb-4 text-lg font-medium'>Chi tiết hư hỏng</h3>
              <div className='space-y-4'>
                {fields.map((field, index) => (
                  <div key={field.id} className='flex items-end gap-4 rounded-md'>
                    <FormField
                      control={form.control}
                      name={`repairItems.${index}.description`}
                      render={({ field }) => (
                        <FormItem className='flex-grow'>
                          <FormLabel>Mô tả hư hỏng</FormLabel>
                          <FormControl>
                            <Input placeholder='Vd: Trầy xước cửa trước' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`repairItems.${index}.cost`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chi phí (VND)</FormLabel>
                          <FormControl>
                            <Input type='number' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      size='icon'
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='mt-4'
                onClick={() => append({ description: '', cost: 0 })}
              >
                Thêm mục hư hỏng
              </Button>
            </div>

            {/* Image Upload Section */}
            <div className='space-y-4'>
              <FormLabel>Hình ảnh hư hỏng</FormLabel>

              {/* File Input */}
              <div className='flex items-center gap-4'>
                <Input
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={handleImageChange}
                  className='file:bg-secondary hover:file:bg-secondary/90 file:mr-4 file:rounded-md file:border-0 file:px-4 file:text-sm file:font-medium file:text-white'
                />
                {imageFiles.length > 0 && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={handleUploadImages}
                    disabled={uploadingImages}
                  >
                    {uploadingImages ? (
                      'Đang upload...'
                    ) : (
                      <>
                        <Upload className='mr-2 h-4 w-4' />
                        Upload {imageFiles.length} ảnh
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5'>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className='relative'>
                      <img
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        className='h-24 w-full rounded-md border object-cover'
                      />
                      <Button
                        type='button'
                        variant='destructive'
                        size='sm'
                        className='absolute -top-2 -right-2 h-6 w-6 rounded-full p-0'
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                      {preview.isExisting && (
                        <div className='absolute bottom-1 left-1 rounded bg-green-500 px-1 text-xs text-white'>
                          ✓
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Status */}
              {form.watch('imgs')?.length > 0 && (
                <div className='mt-4'>
                  <p className='mb-2 text-sm text-green-600'>
                    ✓ Có {form.watch('imgs').length} hình ảnh đã lưu
                  </p>
                </div>
              )}
            </div>

            <div className='text-right'>
              <p className='text-xl font-semibold'>
                Tổng chi phí: {totalCost.toLocaleString()} VND
              </p>
            </div>

            <CardFooter className='flex justify-end gap-4 px-0'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate(`/dashboard/rentals/${rentalId}`)}
              >
                Hủy
              </Button>
              <Button type='submit' disabled={uploadingImages || imageFiles.length > 0}>
                {isEditMode ? 'Cập nhật' : 'Lưu'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
