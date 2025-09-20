import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { loginSchema } from '../schemas/authSchemas'
import { loginConfig } from '../constants'

const LoginPage = () => {
  usePageTitle('Login')

  const onLoginSubmit = (values) => {
    console.log(values)
  }

  return (
    <main className='flex flex-1 items-center justify-center bg-[#51C09F] py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <AuthForm
            config={loginConfig}
            formSchema={loginSchema}
            onSubmit={onLoginSubmit}
            formType='login'
          />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
