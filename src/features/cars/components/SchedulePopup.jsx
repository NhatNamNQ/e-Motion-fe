import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { formatHourDate } from '@/lib/utils'
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion'

const SchedulePopup = ({ isOpen, onClose, loading, error, data }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className='relative w-full max-w-2xl rounded-xl bg-white shadow-2xl'
          >
            {/* Header */}
            <div className='from-secondary to-secondary/80 flex items-center justify-between rounded-t-xl border-b bg-gradient-to-r px-6 py-4'>
              <h2 className='text-2xl font-bold text-white'>Lịch cho thuê của xe</h2>
              <button
                className='rounded-full p-2 text-white transition-colors hover:bg-white/20'
                onClick={onClose}
              >
                <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className='max-h-[500px] overflow-y-auto p-6'>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='flex flex-col items-center justify-center py-12'
                >
                  <Spinner className='text-secondary h-12 w-12' />
                  <p className='mt-4 text-gray-500'>Đang tải lịch trình...</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className='flex flex-col items-center justify-center py-12'
                >
                  <div className='rounded-full bg-red-100 p-3'>
                    <svg
                      className='h-8 w-8 text-red-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <p className='mt-4 font-medium text-red-500'>{error}</p>
                </motion.div>
              )}

              {data && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Array.isArray(data) && data.length > 0 ? (
                    <div className='space-y-4'>
                      <p className='mb-4 text-sm text-gray-600'>
                        Có <span className='text-secondary font-bold'>{data.length}</span> lượt thuê
                        trong thời gian này
                      </p>
                      <ul className='space-y-3'>
                        {data.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className='border-secondary bg-secondary/10 rounded-lg border-l-4 p-4 shadow-sm transition-shadow hover:shadow-md'
                          >
                            <div className='flex items-start justify-between'>
                              <div className='flex-1'>
                                <div className='mb-2 flex items-center'>
                                  <svg
                                    className='text-secondary mr-2 h-5 w-5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={2}
                                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                    />
                                  </svg>
                                  <span className='text-sm font-semibold text-gray-700'>
                                    Lượt thuê #{idx + 1}
                                  </span>
                                </div>
                                <div className='ml-7 space-y-1'>
                                  <div className='flex items-center text-sm'>
                                    <span className='font-medium text-gray-600'>Bắt đầu:</span>
                                    <span className='ml-2 text-gray-800'>
                                      {formatHourDate(item.startTime)}
                                    </span>
                                  </div>
                                  <div className='flex items-center text-sm'>
                                    <span className='font-medium text-gray-600'>Kết thúc:</span>
                                    <span className='ml-2 text-gray-800'>
                                      {formatHourDate(item.endTime)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className='flex flex-col items-center justify-center py-12'
                    >
                      <div className='rounded-full bg-gray-100 p-4'>
                        <svg
                          className='h-12 w-12 text-gray-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                          />
                        </svg>
                      </div>
                      <p className='mt-4 font-medium text-gray-500'>
                        Không có lịch trình nào trong thời gian này
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className='rounded-b-xl px-6 py-4'>
              <Button
                onClick={onClose}
                className='bg-secondary text-background hover:bg-secondary/80 w-full'
              >
                Đóng
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SchedulePopup
