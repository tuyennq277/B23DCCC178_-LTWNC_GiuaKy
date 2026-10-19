import { create } from 'zustand'
import type { CategoryFilter } from '../../types/books'

interface FilterState {
  query: string
  category: CategoryFilter
  setQuery: (query: string) => void
  setCategory: (category: CategoryFilter) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  query: '',
  category: 'Tất cả',
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category })
}))
