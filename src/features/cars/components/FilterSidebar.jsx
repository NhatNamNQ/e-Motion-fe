import { useEffect, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const FilterSidebar = ({ onFilterChange, selectedBrands, selectedCategories }) => {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [localBrands, setLocalBrands] = useState(selectedBrands || [])
  const [localCategories, setLocalCategories] = useState(selectedCategories || [])
  const [openPopover, setOpenPopover] = useState(null)

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setBrands([
          { id: 1, name: 'HYUNDAI' },
          { id: 2, name: 'KIA' },
          { id: 3, name: 'HONDA' },
          { id: 4, name: 'NISSAN' },
          { id: 5, name: 'BMW' },
          { id: 6, name: 'BYD' },
          { id: 7, name: 'MITSUBISHI' },
          { id: 8, name: 'VINFAST' },
          { id: 9, name: 'MERCEDES_BENZ' },
          { id: 10, name: 'SUZUKI' },
          { id: 11, name: 'LEXUS' },
          { id: 12, name: 'TOYOTA' },
          { id: 13, name: 'PEUGEOT' },
          { id: 14, name: 'TESLA' },
          { id: 15, name: 'FORD' },
          { id: 16, name: 'MAZDA' }
        ])
        setCategories([
          { id: 1, name: 'HATCHBACK' },
          { id: 2, name: 'SUV' },
          { id: 3, name: 'CROSSOVER' },
          { id: 4, name: 'SEDAN' }
        ])
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    }
    fetchFilters()
  }, [])

  const handleBrandChange = (brandName, checked) => {
    const newBrands = checked
      ? [...localBrands, brandName]
      : localBrands.filter((b) => b !== brandName)
    setLocalBrands(newBrands)
  }

  const handleCategoryChange = (categoryName, checked) => {
    const newCategories = checked
      ? [...localCategories, categoryName]
      : localCategories.filter((c) => c !== categoryName)
    setLocalCategories(newCategories)
  }

  const handleApplyFilters = () => {
    onFilterChange({
      brands: localBrands,
      categories: localCategories
    })
    setOpenPopover(null)
  }

  const handleClearAll = () => {
    setLocalBrands([])
    setLocalCategories([])
    onFilterChange({
      brands: [],
      categories: []
    })
  }

  const hasActiveFilters = localBrands.length > 0 || localCategories.length > 0

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <Button
        onClick={handleClearAll}
        variant={!hasActiveFilters ? 'default' : 'outline'}
        className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
          !hasActiveFilters
            ? 'bg-secondary hover:bg-secondary/80 text-white'
            : 'hover:bg-secondary/10 hover:text-secondary border border-gray-300 bg-white text-gray-700'
        }`}
      >
        Tất cả
      </Button>

      {/* Categories Popover */}
      <Popover
        open={openPopover === 'categories'}
        onOpenChange={(open) => setOpenPopover(open ? 'categories' : null)}
      >
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={`flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
              localCategories.length > 0
                ? 'border-secondary bg-secondary/10 text-secondary'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Loại xe
            {localCategories.length > 0 && (
              <span className='bg-secondary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white'>
                {localCategories.length}
              </span>
            )}
            <ChevronDown className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-80 p-4' align='start'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold text-gray-800'>Chọn loại xe</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setLocalCategories([])}
                className='text-sm text-gray-500 hover:text-gray-700'
              >
                Xóa
              </Button>
            </div>
            <div className='max-h-80 space-y-3 overflow-y-auto'>
              {categories.map((category) => (
                <div key={category.id} className='flex items-center space-x-3'>
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={localCategories.includes(category.name)}
                    onCheckedChange={(checked) => handleCategoryChange(category.name, checked)}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className='flex-1 cursor-pointer text-sm font-normal'
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
            <Button
              onClick={handleApplyFilters}
              className='bg-secondary hover:bg-secondary/80 w-full'
            >
              Áp dụng
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Brands Popover */}
      <Popover
        open={openPopover === 'brands'}
        onOpenChange={(open) => setOpenPopover(open ? 'brands' : null)}
      >
        <PopoverTrigger asChild>
          <Button
            variant={localBrands.length > 0 ? 'outline' : 'outline'}
            className={`flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
              localBrands.length > 0
                ? 'border-secondary bg-secondary/10 text-secondary'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Hãng xe
            {localBrands.length > 0 && (
              <span className='bg-secondary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white'>
                {localBrands.length}
              </span>
            )}
            <ChevronDown className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-80 p-4' align='start'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold text-gray-800'>Chọn hãng xe</h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setLocalBrands([])}
                className='text-sm text-gray-500 hover:text-gray-700'
              >
                Xóa
              </Button>
            </div>
            <div className='max-h-80 space-y-3 overflow-y-auto'>
              {brands.map((brand) => (
                <div key={brand.id} className='flex items-center space-x-3'>
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={localBrands.includes(brand.name)}
                    onCheckedChange={(checked) => handleBrandChange(brand.name, checked)}
                  />
                  <Label
                    htmlFor={`brand-${brand.id}`}
                    className='flex-1 cursor-pointer text-sm font-normal'
                  >
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
            <Button
              onClick={handleApplyFilters}
              className='bg-secondary hover:bg-secondary/80 w-full'
            >
              Áp dụng
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <Button
          variant='outline'
          onClick={handleClearAll}
          className='flex items-center gap-2 rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50'
        >
          <X className='h-4 w-4' />
          Xóa bộ lọc
        </Button>
      )}
    </div>
  )
}

export default FilterSidebar
