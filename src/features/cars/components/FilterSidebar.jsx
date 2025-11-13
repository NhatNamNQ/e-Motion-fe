import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FilterPopover from './FilterPopover'
import PriceFilter from './PriceFilter'
import SeatsFilter from './SeatsFilter'

const FilterSidebar = ({
  onFilterChange,
  selectedBrands,
  selectedCategories,
  priceRange = [],
  selectedSeat = null
}) => {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [localBrands, setLocalBrands] = useState(selectedBrands || [])
  const [localCategories, setLocalCategories] = useState(selectedCategories || [])
  const [localPriceRange, setLocalPriceRange] = useState(priceRange)
  const [localSeat, setLocalSeat] = useState(selectedSeat)
  const [openPopover, setOpenPopover] = useState(null)

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setBrands([
          { id: 1, name: 'HYUNDAI' },
          { id: 2, name: 'HONDA' },
          { id: 3, name: 'BMW' },
          { id: 4, name: 'BYD' },
          { id: 5, name: 'VINFAST' },
          { id: 6, name: 'MERCEDES_BENZ' },
          { id: 7, name: 'TESLA' },
          { id: 8, name: 'FORD' }
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
      categories: localCategories,
      priceRange: localPriceRange,
      seat: localSeat
    })
    setOpenPopover(null)
  }

  const handlePriceChange = (newPriceRange) => {
    setLocalPriceRange(newPriceRange)
    onFilterChange({
      brands: localBrands,
      categories: localCategories,
      priceRange: newPriceRange,
      seat: localSeat
    })
  }

  const handleSeatChange = (newSeat) => {
    setLocalSeat(newSeat)
    onFilterChange({
      brands: localBrands,
      categories: localCategories,
      priceRange: localPriceRange,
      seat: newSeat
    })
  }

  const handleClearAll = () => {
    setLocalBrands([])
    setLocalCategories([])
    setLocalPriceRange([0, 1000000])
    setLocalSeat(null)
    onFilterChange({
      brands: [],
      categories: [],
      priceRange: [0, 1000000],
      seat: null
    })
  }

  const hasActiveFilters =
    localBrands.length > 0 ||
    localCategories.length > 0 ||
    localPriceRange[0] > 0 ||
    localPriceRange[1] < 1000000 ||
    localSeat !== null

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

      {/* Categories Filter */}
      <FilterPopover
        label='Loại xe'
        items={categories}
        selectedItems={localCategories}
        onItemChange={handleCategoryChange}
        onClear={() => setLocalCategories([])}
        onApply={handleApplyFilters}
        isOpen={openPopover === 'categories'}
        onOpenChange={(open) => setOpenPopover(open ? 'categories' : null)}
      />

      {/* Brands Filter */}
      <FilterPopover
        label='Hãng xe'
        items={brands}
        selectedItems={localBrands}
        onItemChange={handleBrandChange}
        onClear={() => setLocalBrands([])}
        onApply={handleApplyFilters}
        isOpen={openPopover === 'brands'}
        onOpenChange={(open) => setOpenPopover(open ? 'brands' : null)}
      />

      {/* Price Filter */}
      <PriceFilter
        priceRange={localPriceRange}
        onPriceChange={handlePriceChange}
        isOpen={openPopover === 'price'}
        onOpenChange={(open) => setOpenPopover(open ? 'price' : null)}
      />

      {/* Seats Filter */}
      <SeatsFilter
        selectedSeat={localSeat}
        onSeatChange={handleSeatChange}
        isOpen={openPopover === 'seats'}
        onOpenChange={(open) => setOpenPopover(open ? 'seats' : null)}
      />

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
