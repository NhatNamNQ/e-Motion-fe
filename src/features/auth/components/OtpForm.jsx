import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { otpSchema } from '../schemas/authSchemas'

const OtpForm = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      verificationCode: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='verificationCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <div className='flex flex-col items-center gap-4'>
                <FormControl>
                  <InputOTP maxLength={6} {...field} pattern={/^[0-9]*$/}>
                    <InputOTPGroup className='gap-4'>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription></FormDescription>
              </div>
              <FormMessage className='text-center' />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full bg-[#51C09F] hover:bg-[#51C09F]/80'>
          Xác nhận
        </Button>
      </form>
    </Form>
  )
}

export default OtpForm
