import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LIST_LOCAL_STORAGE_KEY } from '@/constants'

function getSavedItems() {
  try {
    const items = localStorage.getItem(LIST_LOCAL_STORAGE_KEY)

    if (!items) {
      return []
    }

    return JSON.parse(items)
  } catch (error) {
    console.error('Failed to get saved items:', error)
    return []
  }
}

export const useListStore = defineStore('list', () => {
  const items = ref<IListItem[]>(getSavedItems())

  function add(name: string) {
    if (name === '') return

    if (items.value.find((item) => item.name === name)) return

    items.value.unshift({ name, checked: false })
  }

  function remove(name: string) {
    items.value = items.value.filter((item) => item.name !== name)
  }

  function toggleCheck(name: string) {
    const item = items.value.find((item) => item.name === name)

    if (item) {
      item.checked = !item.checked
    }
  }

  function uncheckAll() {
    items.value = items.value.map((item) => ({ ...item, checked: false }))
  }

  return { items, add, remove, toggleCheck, uncheckAll }
})
