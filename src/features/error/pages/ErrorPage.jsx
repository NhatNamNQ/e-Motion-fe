import { useRouteError, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <section className='bg-background text-foreground h-full p-10'>
      <div>
        <div className='mx-auto mb-1 h-[400px] w-[70%] rounded-2xl bg-[url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnpkcmtsdXBxN3JkYjJ2MHoxNTNqMnJrOGI4aXNheHg0NnU1bXl0aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1KQ5Wyuf4jEGW7KEU/giphy.gif)] bg-cover bg-center bg-no-repeat'>
          <h1 className='text-center text-[70px]'>{error.status}</h1>
        </div>
        <h2 className='text-center text-[30px]'>Look like you are lost</h2>
        <p className='text-center'>{error.statusText || error.message}</p>
        <div className='mt-3 flex justify-center'>
          <Button onClick={() => navigate(-1)}>Go home</Button>
        </div>
      </div>
    </section>
  )
}
