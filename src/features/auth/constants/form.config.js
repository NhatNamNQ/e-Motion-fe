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
      placeholder: 'Nhập email'
    },
    {
      name: 'password',
      label: 'Mật khẩu',
      type: 'password',
      placeholder: 'Nhập mật khẩu'
    }
  ]
}
