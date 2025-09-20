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

export const forgotPasswordConfig = {
  title: 'Quên mật khẩu',
  buttonText: 'Nhập email đặt lại mật khẩu',
  defaultValues: {
    email: ''
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Nhập email của bạn'
    }
  ]
}

export const resetPasswordConfig = {
  title: 'Đặt lại mật khẩu',
  buttonText: 'Xác nhận',
  defaultValues: {
    password: '',
    confirmPassword: ''
  },
  fields: [
    {
      name: 'password',
      label: 'Mật khẩu mới',
      type: 'password',
      placeholder: 'Nhập mật khẩu mới'
    },
    {
      name: 'confirmPassword',
      label: 'Xác nhận mật khẩu mới',
      type: 'password',
      placeholder: 'Nhập lại mật khẩu mới'
    }
  ]
}
