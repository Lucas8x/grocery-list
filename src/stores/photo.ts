import { defineStore } from 'pinia'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'
import { PHOTOS_INDEXED_DB_KEY } from '@/constants'

function formatKey(key: string) {
  return key.split(' ').join('_').toLowerCase()
}

export const usePhotoStore = defineStore('photos', () => {
  const { data, set } = useIDBKeyval<Record<string, string | null>>(
    PHOTOS_INDEXED_DB_KEY,
    {},
    {
      deep: false,
      shallow: true
    }
  )

  function getPhoto(name: string) {
    const key = formatKey(name)
    return data.value[key] || ''
  }

  async function addPhoto(name: string, base64: string) {
    const key = formatKey(name)

    await set({
      ...data.value,
      [key]: base64
    })
  }

  async function removePhoto(name: string) {
    const key = formatKey(name)

    if (!data.value[key]) return

    await set({
      ...data.value,
      [key]: null
    })
  }

  return { data, getPhoto, addPhoto, removePhoto }
})
