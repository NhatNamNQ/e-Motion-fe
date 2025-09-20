import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { registerSchema } from '../schemas/authSchemas'
import { registerConfig } from '../constants'

const RegisterPage = () => {
  usePageTitle('Register')

  const onRegisterSubmit = (values) => {
    console.log('Register form values:', values)
    // Handle register logic here
  }

  return (
    <main className='flex flex-1 items-center justify-center bg-[#51C09F] py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <AuthForm
            config={registerConfig}
            formSchema={registerSchema}
            onSubmit={onRegisterSubmit}
            formType='register'
          />
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
