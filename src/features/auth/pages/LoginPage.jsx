import usePageTitle from '@/hooks/usePageTitle'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  usePageTitle('Login')

  return (
    <main className='flex flex-1 items-center justify-center bg-[#51C09F] py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
