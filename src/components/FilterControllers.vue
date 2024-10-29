<script setup lang="ts">
import { useFilterStore } from '@/stores/filter'
import FilterButton from './FilterButton.vue'

const store = useFilterStore()
</script>

<template>
  <div
    class="flex w-full items-center justify-evenly bg-white px-2 py-1 rounded-md"
  >
    <FilterButton
      name="Todos"
      :active="store.currentFilter === 'all'"
      @click="store.setFilter('all')"
    />

    <FilterButton
      name="Ativos"
      :active="store.currentFilter === 'active'"
      @click="store.setFilter('active')"
    />

    <FilterButton
      name="Completos"
      :active="store.currentFilter === 'completed'"
      @click="store.setFilter('completed')"
    />
  </div>
</template>
