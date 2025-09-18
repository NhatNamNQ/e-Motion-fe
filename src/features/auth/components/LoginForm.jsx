import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormFieldInput from '@/components/FormFieldInput'
import FormFieldCheckbox from '@/components/FormFieldCheckbox'
import { loginSchema } from '../schemas/authSchemas'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      form.setValue('email', rememberedEmail)
      form.setValue('rememberMe', true)
    } else {
      localStorage.removeItem('rememberedEmail')
    }
  }, [form])

  const onSubmit = (values) => {
    console.log(values)
    values.rememberMe
      ? localStorage.setItem('rememberedEmail', values.email)
      : localStorage.removeItem('rememberedEmail')
  }

  return (
    <Form {...form}>
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>Đăng nhập</h1>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormFieldInput
          control={form.control}
          name='email'
          label='Email'
          placeholder='Nhập email'
        />
        <FormFieldInput
          control={form.control}
          name='password'
          label='Mật khẩu'
          placeholder='Nhập mật khẩu'
          type='password'
          autoComplete='new-password' // turn off auto complete
        />
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <FormFieldCheckbox control={form.control} name='rememberMe' label='Remember Me' />
          </div>
          <Link
            to='/auth/forgot-password'
            className='text-sm font-medium text-teal-500 transition-colors hover:text-teal-600'
          >
            Forgot password ?
          </Link>
        </div>
        <Button type='submit' className='w-full bg-[#51C09F] hover:bg-[#51C09F]/80'>
          Đăng nhập
          <ArrowRight className='' />
        </Button>
        {/* Sign Up Link */}
        <p className='mt-8 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link
            to='/auth/signup'
            className='font-medium text-teal-500 transition-colors hover:text-teal-600'
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  )
}

export default LoginForm
