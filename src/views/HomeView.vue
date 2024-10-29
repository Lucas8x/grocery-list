<script setup lang="ts">
import { computed, ref } from 'vue'
import { LIST_LOCAL_STORAGE_KEY } from '@/constants'
import { useListStore, useFilterStore, usePhotoStore } from '@/stores'
import AddModal from '@/modals/AddModal.vue'
import AddModalButton from '@/components/AddModalButton.vue'
import ListItem from '@/components/ListItem.vue'
import FilterControllers from '@/components/FilterControllers.vue'
import SettingsContainer from '@/components/SettingsContainer.vue'
import NoItemsMessage from '@/components/NoItemsMessage.vue'

const isModalOpen = ref(false)

const listStore = useListStore()
const filterStore = useFilterStore()
const photoStore = usePhotoStore()

listStore.$subscribe(
  (_, state) => {
    localStorage.setItem(LIST_LOCAL_STORAGE_KEY, JSON.stringify(state.items))
  },
  { detached: true }
)

const filteredItems = computed(() => {
  if (filterStore.currentFilter === 'active') {
    return listStore.items.filter((i) => !i.checked)
  }

  if (filterStore.currentFilter === 'completed') {
    return listStore.items.filter((i) => i.checked)
  }

  return listStore.items
    .slice()
    .sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0))
})

const hasCompletedItems = computed(() => listStore.items.some((i) => i.checked))
</script>

<template>
  <main
    class="flex w-full items-center flex-col h-full justify-center gap-3 mx-4"
  >
    <FilterControllers />

    <div class="bg-white rounded-md w-full min-h-80 max-h-96 overflow-y-auto">
      <ul
        class="list-none w-full divide-y overflow-y-auto"
        v-if="listStore.items.length > 0"
      >
        <ListItem
          v-for="item in filteredItems"
          :key="item.name"
          :name="item.name"
          :checked="item.checked"
          :imgSrc="photoStore.getPhoto(item.name)"
          @check="() => listStore.toggleCheck(item.name)"
          @remove="
            () => {
              listStore.remove(item.name)
              photoStore.removePhoto(item.name)
            }
          "
        />
      </ul>

      <NoItemsMessage v-else />
    </div>

    <!-- <SettingsContainer /> -->

    <div
      class="flex w-full items-center justify-evenly bg-white px-2 py-1 rounded-md"
      :class="{ 'opacity-80': !hasCompletedItems }"
      v-if="filterStore.currentFilter === 'completed'"
    >
      <button
        class="w-full text-black rounded-md p-2 font-bold disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50"
        @click="() => listStore.uncheckAll()"
        :disabled="!hasCompletedItems"
      >
        Desmarcar todos os completos
      </button>
    </div>

    <!-- <div class="">b</div> -->
  </main>

  <AddModalButton @click="isModalOpen = true" />

  <AddModal
    @close="isModalOpen = false"
    v-if="isModalOpen"
  />
</template>
