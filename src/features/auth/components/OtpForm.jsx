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
import { useEffect, useState } from 'react'
import { authService } from '../services/authService'
import { toast } from 'sonner'

const OtpForm = ({ onSubmit, isLoading, email }) => {
  const [countdown, setCountDown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      verificationCode: ''
    }
  })

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleResendOtp = async () => {
    if (canResend) {
      try {
        await authService.resendOtp(email)
        setCountDown(30)
        setCanResend(false)
        form.reset()
      } catch (error) {
        toast.error(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='verificationCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <div className='flex w-full flex-col items-center gap-4'>
                <FormControl>
                  <InputOTP maxLength={6} {...field} pattern={/^[0-9]*$/}>
                    <InputOTPGroup className='w-full gap-4'>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className='text-center'></FormDescription>
              </div>
              <FormMessage className='text-center' />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='bg-secondary hover:bg-secondary/80 w-full'
          disabled={isLoading}
        >
          {isLoading ? 'Đang xác thực...' : 'Xác nhận'}
        </Button>
      </form>
      <div className='my-3 text-center'>
        <p className='text-sm text-gray-600'>Không nhận được mã?</p>
        <Button
          type='button'
          variant='outline'
          onClick={handleResendOtp}
          disabled={!canResend || isLoading}
          className='border-none shadow-none'
        >
          {canResend ? 'Gửi lại mã OTP' : `Gửi lại sau ${countdown}s`}
        </Button>
      </div>
    </Form>
  )
}

export default OtpForm
