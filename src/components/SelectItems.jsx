import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const SelectItems = ({ children }) => {
  return (
    <Select>
      <SelectTrigger>
        {children}
        <SelectValue placeholder='Hồ Chí Minh' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='xavalo'>Hồ Chí Minh</SelectItem>
        <SelectItem value='hola'>Hà Nội</SelectItem>
        <SelectItem value='hovilo'>Đà Nẵng</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectItems
