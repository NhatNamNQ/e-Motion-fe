import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormFieldCheckbox from '@/components/FormFieldCheckbox'
import { Link } from 'react-router-dom'
import FormFieldInput from '@/components/FormFieldInput'
import { useEffect } from 'react'

const AuthForm = ({ config, formSchema, onSubmit, formType }) => {
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
              className='text-sm font-medium text-teal-500 transition-colors hover:text-teal-600'
            >
              Forgot password ?
            </Link>
          </div>
        )}
        <Button type='submit' className='w-full bg-[#51C09F] hover:bg-[#51C09F]/80'>
          {config.buttonText}
          <ArrowRight className='' />
        </Button>
        {/* Sign Up Link (Login)*/}
        {formType === 'login' && (
          <p className='mt-8 text-center text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link
              to='/auth/signup'
              className='font-medium text-teal-500 transition-colors hover:text-teal-600'
            >
              Sign up
            </Link>
          </p>
        )}
      </form>
    </Form>
  )
}

export default AuthForm
