export const handleError = (error) => {
  if (!error.response) {
    return {
      status: null,
      message: error.message || 'Failed to connect internet'
    }
  }
  return {
    message: error.response?.data?.message || 'Server error',
    status: error.response?.status,
    data: error.response?.data?.data
  }
}
