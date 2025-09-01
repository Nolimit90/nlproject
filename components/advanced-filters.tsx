"use client"

import { useState, useCallback } from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface FilterOptions {
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  availability: string[]
  brands: string[]
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
const availableColors = ['Noir', 'Blanc', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Rose', 'Gris', 'Marron', 'Orange']
const availabilityOptions = ['En stock', 'Rupture de stock', 'Précommande']
const brandOptions = ['Nike', 'Patta', 'Adidas', 'Puma', 'New Balance']

export default function AdvancedFilters({ onFiltersChange, isOpen, onOpenChange }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    availability: [],
    brands: []
  })

  const handleFilterChange = useCallback((newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }, [filters, onFiltersChange])

  const handleSizeToggle = useCallback((size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size]
    handleFilterChange({ sizes: newSizes })
  }, [filters.sizes, handleFilterChange])

  const handleColorToggle = useCallback((color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color]
    handleFilterChange({ colors: newColors })
  }, [filters.colors, handleFilterChange])

  const handleAvailabilityToggle = useCallback((availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability]
    handleFilterChange({ availability: newAvailability })
  }, [filters.availability, handleFilterChange])

  const handleBrandToggle = useCallback((brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand]
    handleFilterChange({ brands: newBrands })
  }, [filters.brands, handleFilterChange])

  const clearAllFilters = useCallback(() => {
    const clearedFilters: FilterOptions = {
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      availability: [],
      brands: []
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }, [onFiltersChange])

  const activeFiltersCount = [
    filters.sizes.length,
    filters.colors.length,
    filters.availability.length,
    filters.brands.length,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0
  ].reduce((sum, count) => sum + count, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtres
          {activeFiltersCount > 0 && (
            <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-left">Filtres avancés</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-semibold">Prix</h3>
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
                max={500}
                step={10}
                className="w-full"
              />
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-600">Min</label>
                  <Input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => handleFilterChange({ 
                      priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
                    })}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-600">Max</label>
                  <Input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange({ 
                      priceRange: [filters.priceRange[0], parseInt(e.target.value) || 500] 
                    })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tailles</h3>
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={() => handleSizeToggle(size)}
                  />
                  <label htmlFor={`size-${size}`} className="text-sm">{size}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <h3 className="font-semibold">Couleurs</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableColors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => handleColorToggle(color)}
                  />
                  <label htmlFor={`color-${color}`} className="text-sm">{color}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="font-semibold">Disponibilité</h3>
            <div className="space-y-2">
              {availabilityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`availability-${option}`}
                    checked={filters.availability.includes(option)}
                    onCheckedChange={() => handleAvailabilityToggle(option)}
                  />
                  <label htmlFor={`availability-${option}`} className="text-sm">{option}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-4">
            <h3 className="font-semibold">Marques</h3>
            <div className="space-y-2">
              {brandOptions.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm">{brand}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={clearAllFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Effacer tous les filtres
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

