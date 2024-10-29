<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue'
</script>

<template>
  <div
    className="flex h-full flex-col items-center justify-center text-xl text-neutral-500 text-center gap-10"
  >
    <div class="flex flex-col">
      <span>Sem itens</span>
      <span>(◡︵◡)</span>
    </div>

    <div class="flex flex-col items-center text-center gap-1">
      <span>Toque no botão</span>

      <div
        class="flex items-center justify-center size-6 bg-green-500 rounded-full"
      >
        <IconPlus
          size="16"
          class="text-white"
        />
      </div>

      <div class="flex flex-col">
        <span>no canto da tela</span>
        <span>para adicionar suas compras.</span>
      </div>
    </div>
  </div>
</template>
