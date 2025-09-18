import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from './ui/input'

const FormFieldInput = ({ control, name, label, description, placeholder, ...props }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const combinedProps = { ...props, ...field }
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...combinedProps} />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldInput
