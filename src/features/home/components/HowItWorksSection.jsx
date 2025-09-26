import { Car, Calendar, Key } from 'lucide-react'

const steps = [
  {
    icon: Car,
    title: 'Choose a car',
    description: 'Browse our catalog and choose the car that suits you.'
  },
  {
    icon: Calendar,
    title: 'Book it',
    description: 'Select your dates and confirm your booking.'
  },
  {
    icon: Key,
    title: 'Enjoy the ride',
    description: 'Pick up your car and enjoy the ride.'
  }
]

export function HowItWorksSection() {
  return (
    <section className='my-10'>
      <h1 className='mb-8 text-center text-3xl font-bold'>3 Bước đặt xe dễ dàng</h1>
      <div className='grid gap-8 md:grid-cols-3'>
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={index} className='flex flex-col items-center text-center'>
              <div className='bg-primary text-primary-foreground mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                <Icon size={32} />
              </div>
              <h2 className='mb-2 text-xl font-semibold'>{step.title}</h2>
              <p className='text-muted-foreground'>{step.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
