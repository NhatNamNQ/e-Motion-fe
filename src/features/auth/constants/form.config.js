export const loginConfig = {
  title: 'Đăng Nhập',
  buttonText: 'Đăng Nhập',
  defaultValues: {
    email: '',
    password: '',
    rememberMe: false
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Nhập email',
      autoComplete: 'email'
    },
    {
      name: 'password',
      label: 'Mật khẩu',
      type: 'password',
      placeholder: 'Nhập mật khẩu',
      autoComplete: 'current-password'
    }
  ]
}

export const registerConfig = {
  title: 'Đăng Ký',
  buttonText: 'Tạo tài khoản',
  defaultValues: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  },
  fields: [
    {
      name: 'fullName',
      label: 'Họ và tên',
      type: 'text',
      placeholder: 'Nhập họ và tên của bạn'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Nhập email'
    },
    {
      name: 'password',
      label: 'Mật khẩu',
      type: 'password',
      placeholder: 'Nhập mật khẩu'
    },
    {
      name: 'confirmPassword',
      label: 'Xác nhận mật khẩu',
      type: 'password',
      placeholder: 'Nhập lại mật khẩu'
    }
  ]
}
