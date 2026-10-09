import React from 'react';
import { Category, SessionFormat, SwapPreference } from '../types';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  selectedNeighborhood: string;
  onSelectNeighborhood: (neighborhood: string) => void;
  selectedFormat: string;
  onSelectFormat: (format: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

const CATEGORIES: Category[] = [
  'All',
  'Repair & Making',
  'Music & Arts',
  'Career & Digital',
  'Food & Cooking',
  'Language & Learning',
  'Home & Garden'
];

const NEIGHBORHOODS = [
  'All Neighborhoods',
  'Maplewood Green',
  'Eastside Lofts',
  'River North',
  'Arts District'
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedNeighborhood,
  onSelectNeighborhood,
  selectedFormat,
  onSelectFormat,
  searchQuery,
  onSearchChange,
  totalCount
}) => {
  return (
    <div className="space-y-4 pt-6 pb-2">
      {/* Search and Secondary Selectors */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search skills, tools, or neighbor offerings (e.g., guitar, derailleur, resume)..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-white border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Neighborhood Selector */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedNeighborhood}
              onChange={e => onSelectNeighborhood(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              {NEIGHBORHOODS.map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Format Selector */}
          <select
            value={selectedFormat}
            onChange={e => onSelectFormat(e.target.value)}
            className="px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            <option value="All">All Formats</option>
            <option value="In-person">In-person only</option>
            <option value="Virtual">Virtual / Remote</option>
          </select>
        </div>
      </div>

      {/* Category Segmented Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map(category => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Active similar skills search banner */}
      {searchQuery && (
        <div className="flex items-center justify-between gap-2 text-xs text-stone-700 bg-amber-50/80 border border-amber-200/70 px-3 py-1.5 rounded-lg">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span className="text-amber-900 font-semibold">Active search:</span>
            <span className="truncate">Showing similar skills matching <strong className="text-stone-900">"{searchQuery}"</strong> {selectedCategory !== 'All' ? `in ${selectedCategory}` : ''}</span>
          </div>
          <button
            onClick={() => onSearchChange('')}
            className="text-stone-500 hover:text-stone-900 font-medium text-[11px] shrink-0 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Result Count and Active Filter Indicators */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
        <span>
          Showing <strong className="text-stone-900 tabular-nums">{totalCount}</strong> available skill offerings
        </span>
        {(selectedCategory !== 'All' || selectedNeighborhood !== 'All Neighborhoods' || selectedFormat !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              onSelectCategory('All');
              onSelectNeighborhood('All Neighborhoods');
              onSelectFormat('All');
              onSearchChange('');
            }}
            className="text-amber-800 hover:underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>
    </div>
  );
};
