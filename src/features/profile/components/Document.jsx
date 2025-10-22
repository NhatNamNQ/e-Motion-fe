import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { FileText, Upload, Eye, X, Plus, Trash2 } from 'lucide-react'

import { selectUser } from '@/store/selectors/authSelectors'
import { getCurrentUser } from '@/store/actions/authActions'
import { uploadImage } from '@/lib/utils'
import { documentService } from '../service/documentService'
import { documentConfigs } from '../constants/documentConfig'
import { documentSchema } from '@/features/profile/schemas/documentSchemas'
import Loader from '@/components/Loader'

const Document = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(documentSchema),
    mode: 'onBlur',
    defaultValues: { documentNumber: '' }
  })

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [viewImage, setViewImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const openModal = (type) => {
    setModalType(type)
    setFile(null)
    setPreview(null)
    setShowModal(true)
    reset({ documentNumber: '' })
  }

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (!f.type.startsWith('image/')) return toast.error('Chỉ chọn file hình ảnh')
    if (f.size > 5 * 1024 * 1024) return toast.error('Kích thước max 5MB')
    setFile(f)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(f)
  }

  const handleSave = async (data) => {
    if (!file) return toast.warning('Vui lòng chọn hình ảnh')
    setIsLoading(true)
    try {
      const uploadedUrl = await uploadImage(file, modalType)
      await documentService.createDoc({
        type: modalType,
        number: data.documentNumber,
        imgUrl: uploadedUrl,
        email: user.email
      })
      dispatch(getCurrentUser())
      toast.success('Thêm thành công')
      setShowModal(false)
    } catch (err) {
      toast.error('Thêm thất bại: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteImgInModel = () => {
    setFile(null)
    setPreview(null)
  }

  const handleDeleteDocument = async (type) => {
    if (!confirm(`Bạn có chắc muốn xóa ${type === 'CCCD' ? 'CCCD/CMND' : 'GPLX'}?`)) {
      return
    }

    try {
      // TODO: Gọi API xóa document
      await documentService.deleteDoc(user.documents.find((d) => d.type === type).id)
      dispatch(getCurrentUser())

      toast.success(`Delete ${type} successful`)
    } catch (error) {
      toast.error('Delete failed: ' + error.message)
    }
  }

  return (
    <div className='mt-6'>
      <h3 className='mb-6 text-xl font-bold'>ID Documents</h3>
      <div className='grid gap-6 md:grid-cols-2'>
        {documentConfigs.map((config) => {
          const doc = user.documents?.find((d) => d.type === config.type)
          return (
            <div key={config.type} className='rounded-lg border-2 bg-gray-50 p-6'>
              <div className='mb-4 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <FileText className='h-5 w-5 text-blue-600' />
                  <h4 className='font-semibold'>{config.label}</h4>
                </div>
                {doc && (
                  <button
                    className='text-red-600 hover:cursor-pointer hover:text-red-700'
                    onClick={() => handleDeleteDocument('CCCD')}
                  >
                    <Trash2 className='h-4 w-4' />
                  </button>
                )}
              </div>

              {doc ? (
                <div>
                  <div className='mb-3 flex gap-3'>
                    <p className='text-lg text-gray-500'>Number {config.label}:</p>
                    <p className='text-lg'>{doc.number}</p>
                  </div>
                  <img
                    src={doc.imgUrl}
                    alt={doc.type}
                    className='mb-3 h-40 w-full rounded-lg object-cover'
                  />
                  <button
                    onClick={() => setViewImage(doc.imgUrl)}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-white bg-${config.color}-600 hover:bg-${config.color}-700`}
                  >
                    <Eye className='h-4 w-4' /> View
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openModal(config.type)}
                  className={`flex w-full justify-center gap-2 rounded-lg border-2 border-dashed py-8 hover:border-${config.color}-500 hover:bg-${config.color}-50`}
                >
                  <Plus className='h-6 w-6 text-gray-400' />
                  Add {config.label}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          {isLoading ? (
            <Loader />
          ) : (
            <form
              onSubmit={handleSubmit(handleSave)}
              className='w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl'
            >
              <h3 className='mb-6 text-2xl font-bold'>Add {modalType}</h3>

              <div className='space-y-4'>
                <div>
                  <label>Number {modalType}</label>
                  <input
                    type='number'
                    {...register('documentNumber')}
                    className='w-full rounded-lg border px-4 py-3'
                  />
                  {errors.documentNumber && (
                    <p className='text-red-500'>{errors.documentNumber.message}</p>
                  )}
                </div>

                <div>
                  {preview ? (
                    <div className='relative'>
                      <img
                        src={preview}
                        alt='Preview'
                        className='h-48 w-full rounded-lg object-cover'
                      />
                      <button
                        type='button'
                        onClick={handleDeleteImgInModel}
                        className='absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  ) : (
                    <label className='flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 transition hover:bg-gray-100'>
                      <Upload className='mb-2 h-12 w-12 text-gray-400' />
                      <span className='text-sm text-gray-600'>Choose Image</span>
                      <span className='mt-1 text-xs text-gray-400'>PNG, JPG (Max 5MB)</span>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        className='hidden'
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className='mt-6 flex gap-3'>
                <button type='submit' className='flex-1 rounded-lg bg-blue-600 py-3 text-white'>
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  className='flex-1 rounded-lg bg-gray-200 py-3'
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {viewImage && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='relative'>
            <img src={viewImage} alt='Chi tiết' className='max-h-[80vh] rounded-lg' />
            <button
              onClick={() => setViewImage(null)}
              className='absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Document
