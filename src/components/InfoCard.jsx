import { Card, CardContent, CardTitle } from '@/components/ui/card'

// eslint-disable-next-line no-unused-vars
const InfoCard = ({ feature, Icon }) => {
  return (
    <Card className='border-0 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
      <CardContent className='p-8 text-center'>
        <div className='mb-6 flex justify-center'>
          <div className='bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full'>
            <Icon className='text-primary h-8 w-8' />
          </div>
        </div>
        <CardTitle>{feature.title}</CardTitle>
        <p className='text-muted-foreground leading-relaxed'>{feature.description}</p>
      </CardContent>
    </Card>
  )
}
export default InfoCard
