import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ArrowLeft, Car, ClipboardList, Upload, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { uploadImage } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'
import { checkListService } from '../services/checkListService'

const checkInSchema = z.object({
  type: z.string().default('CHECK_IN'),
  currentBattery: z
    .number()
    .min(0, 'Battery percentage must be at least 0')
    .max(100, 'Battery percentage must be at most 100'),
  img: z.string().min(1, 'Image is required'),
  maintain: z.boolean().default(true)
})

const CheckInPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { staffId, email } = useSelector(selectUser)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const form = useForm({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      type: 'CHECK_IN',
      currentBattery: 100,
      img: '',
      maintain: true
    }
  })

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, or WebP)')
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        toast.error('Image size should be less than 5MB')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    form.setValue('img', '')
  }

  const handleUploadImage = async () => {
    if (!imageFile) {
      toast.error('Please select an image first')
      return
    }

    try {
      setUploadingImage(true)
      const imageUrl = await uploadImage(imageFile, 'check-in')
      form.setValue('img', imageUrl)
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(`Failed to upload image: ${error.message}`)
    } finally {
      setUploadingImage(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      const res = await checkListService.createCheckIn({
        ...data,
        staffId: staffId,
        staffEmail: email,
        rentalId: id
      })
      if (res) navigate(`/dashboard/rentals/${id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => navigate(`/dashboard/rentals/${id}`)}
          className='text-secondary hover:text-secondary/80'
        >
          <ArrowLeft className='mr-1 h-4 w-4' />
          Back to Rental Details
        </Button>
      </div>

      {/* Page Title */}
      <div>
        <h1 className='flex items-center gap-2 text-2xl font-bold'>
          <ClipboardList className='h-6 w-6' />
          Vehicle Check-In
        </h1>
        <p className='text-muted-foreground'>
          Complete the vehicle check-in process for rental #{id}
        </p>
      </div>

      {/* Check-In Form */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Car className='h-5 w-5' />
            Check-In Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-8'>
                {/* Type */}
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='CHECK_IN' readOnly className='bg-gray-50' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Current Battery */}
                <FormField
                  control={form.control}
                  name='currentBattery'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Battery (%)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          min='0'
                          max='100'
                          placeholder='100'
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Upload */}
                <FormField
                  control={form.control}
                  name='img'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Image</FormLabel>
                      <FormControl>
                        <div className='space-y-4'>
                          {/* File Input */}
                          <div className='flex items-center gap-4'>
                            <Input
                              type='file'
                              accept='image/*'
                              onChange={handleImageChange}
                              className='file:bg-secondary hover:file:bg-secondary/90 file:mr-4 file:rounded-md file:border-0 file:px-4 file:text-sm file:font-medium file:text-white'
                              {...field}
                            />
                            {imageFile && (
                              <Button
                                type='button'
                                variant='outline'
                                size='sm'
                                onClick={handleUploadImage}
                                disabled={uploadingImage}
                              >
                                {uploadingImage ? (
                                  'Uploading...'
                                ) : (
                                  <>
                                    <Upload className='mr-2 h-4 w-4' />
                                    Upload
                                  </>
                                )}
                              </Button>
                            )}
                          </div>

                          {/* Image Preview */}
                          {imagePreview && (
                            <div className='relative inline-block'>
                              <img
                                src={imagePreview}
                                alt='Preview'
                                className='h-32 w-32 rounded-lg border object-cover'
                              />
                              <Button
                                type='button'
                                variant='destructive'
                                size='sm'
                                className='absolute -top-2 -right-2 h-6 w-6 rounded-full p-0'
                                onClick={handleRemoveImage}
                              >
                                <X className='h-4 w-4' />
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload an image of the vehicle. Supported formats: JPEG, PNG, WebP (max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Maintain Checkbox */}
                <FormField
                  control={form.control}
                  name='maintain'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-y-0 space-x-3'>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel>Maintain</FormLabel>
                        <FormDescription>Check if the vehicle requires maintenance</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className='flex justify-end space-x-4 pt-6'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => navigate(`/dashboard/rentals/${id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  disabled={form.formState.isSubmitting || uploadingImage}
                >
                  {form.formState.isSubmitting || uploadingImage
                    ? 'Processing...'
                    : 'Complete Check-In'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckInPage
