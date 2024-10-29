import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FILTERS } from '@/constants'

type IFilters = (typeof FILTERS)[number]

function getCurrentFilter() {
  const filter = localStorage.getItem('filter')
  if (filter) {
    return filter as IFilters
  }
  return 'all'
}

export const useFilterStore = defineStore('filter', () => {
  const currentFilter = ref<IFilters>(getCurrentFilter())

  function setFilter(filter: IFilters) {
    if (filter === currentFilter.value) return

    if (!FILTERS.includes(filter)) return

    currentFilter.value = filter
    localStorage.setItem('filter', filter)
  }

  return { currentFilter, setFilter }
})
