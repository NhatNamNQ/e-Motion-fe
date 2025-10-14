import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormFieldCheckbox from '@/components/FormFieldCheckbox'
import { Link } from 'react-router-dom'
import FormFieldInput from '@/components/FormFieldInput'
import { useEffect } from 'react'

const AuthForm = ({ config, formSchema, onSubmit, formType, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: config.defaultValues
  })

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      form.setValue('email', rememberedEmail)
      form.setValue('rememberMe', true)
    }
  }, [form])

  const handleSubmit = (values) => {
    values.rememberMe
      ? localStorage.setItem('rememberedEmail', values.email)
      : localStorage.removeItem('rememberedEmail')
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>{config.title}</h1>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        {config.fields.map((field) => (
          <FormFieldInput
            name={field.name}
            key={field.name}
            control={form.control}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
          />
        ))}
        {/* Remember me (Login) */}
        {formType === 'login' && (
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <FormFieldCheckbox control={form.control} name='rememberMe' label='Remember Me' />
            </div>
            <Link
              to='/auth/forgot-password'
              className='text-secondary/80 hover:text-secondary text-sm font-medium transition-colors'
            >
              Forgot password ?
            </Link>
          </div>
        )}
        {/* Agree to Terms (Register) */}
        {formType === 'register' && (
          <FormFieldCheckbox
            control={form.control}
            name='agreeToTerms'
            label={
              <span>
                Tôi đồng ý với{' '}
                <Link to='/terms' className='hover:underline'>
                  Điều khoản và Hợp đồng
                </Link>
              </span>
            }
          />
        )}

        <Button
          type='submit'
          className='bg-secondary hover:bg-secondary/80 w-full'
          disabled={isLoading}
        >
          {isLoading ? (
            'Đang xác thực...'
          ) : (
            <div className='flex items-center gap-1'>
              {config.buttonText}
              <ArrowRight />
            </div>
          )}
        </Button>
        {/* Dont have account (Login)*/}
        {formType === 'login' && (
          <p className='mt-8 text-center text-sm text-gray-600'>
            Không có tài khoản?{' '}
            <Link
              to='/auth/register'
              className='text-secondary/80 hover:text-secondary font-medium transition-colors'
            >
              Đăng ký
            </Link>
          </p>
        )}
      </form>
    </Form>
  )
}

export default AuthForm
