import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

const FormFieldCheckbox = ({ control, name, label, description }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex items-center'>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className='data-[state=checked]:bg-secondary cursor-pointer'
            />
          </FormControl>
          <div className='text-sm text-gray-700'>
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  )
}

export default FormFieldCheckbox
