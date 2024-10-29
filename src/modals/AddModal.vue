<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { IconCamera, IconX } from '@tabler/icons-vue'
import Camera from 'simple-vue-camera'
import { useBase64 } from '@vueuse/core'
import { useListStore } from '@/stores/list'
import { usePhotoStore } from '@/stores/photo'
import LoaderCircle from '@/ui/LoaderCircle.vue'

const emit = defineEmits(['close'])

const store = useListStore()
const photoStore = usePhotoStore()

const cameraObject = ref<InstanceType<typeof Camera>>()
const isCameraOpen = ref(false)
const isCameraLoading = ref(false)

const preview = ref('')
const blob = ref() as Ref<Blob>
const photoBase64 = useBase64(blob).base64

const dialog = ref<HTMLDialogElement>()

const itemInput = ref('')

function handleAddItem() {
  if (photoBase64.value) {
    photoStore.addPhoto(itemInput.value, photoBase64.value)
  }

  store.add(itemInput.value)

  emit('close')
}

async function capture() {
  const snapshotBlob = await cameraObject.value?.snapshot(
    { width: 1000, height: 1000 },
    'image/webp',
    0.5
  )

  if (!snapshotBlob) {
    return
  }

  blob.value = snapshotBlob
  preview.value = URL.createObjectURL(snapshotBlob)
  isCameraOpen.value = false
}
</script>

<template>
  <dialog
    ref="dialog"
    id="add-modal"
    open
    @close="emit('close')"
    class="absolute w-full h-screen bg-black/50 overflow-y-auto"
  >
    <form
      method="dialog"
      class="flex items-center justify-center w-full h-full overflow-y-auto"
      @submit.prevent="handleAddItem"
      @reset="emit('close')"
    >
      <div
        class="relative flex flex-col gap-4 bg-white rounded-md p-5 shadow-xl w-11/12 max-w-xl"
      >
        <div class="absolute right-0 top-0 pt-4 pr-4">
          <button
            class="hover:scale-110 active:scale-95"
            type="reset"
            @click="emit('close')"
          >
            <IconX size="22" />
          </button>
        </div>

        <h3 class="text-lg font-semibold">Adicionar novo item</h3>

        <input
          class="rounded-md p-2 ring-1 ring-neutral-400"
          placeholder="Digite o nome do item"
          type="text"
          autofocus
          v-model="itemInput"
        />

        <button
          class="flex items-center flex-col justify-center ring-1 rounded-md ring-neutral-400 aspect-video"
          type="button"
        >
          <div
            class="flex flex-col items-center justify-center text-neutral-500 max-w-52"
            @click="isCameraOpen = true"
            v-if="!preview && !isCameraOpen && !isCameraLoading"
          >
            <IconCamera />
            <span>Toque aqui se quiser adicionar uma foto</span>
          </div>

          <div
            class="flex items-center justify-center max-w-52"
            v-if="isCameraLoading"
          >
            <LoaderCircle />
          </div>

          <camera
            ref="cameraObject"
            :playsinline="false"
            :autoplay="isCameraOpen"
            :resolution="{ width: 1080, height: 1080 }"
            @loading="isCameraLoading = true"
            @started="isCameraLoading = false"
            @error="console.error"
            v-if="isCameraOpen"
          >
            <div class="flex w-full h-full items-end justify-center pb-4">
              <button
                class="bg-white rounded-full p-2 size-14"
                type="button"
                aria-label="Capturar imagem"
                @click="capture"
                v-if="isCameraOpen && !isCameraLoading"
              >
                <div class="rounded-full w-full h-full ring-4 ring-black"></div>
              </button>
            </div>
          </camera>

          <img
            class="aspect-square"
            alt=""
            :src="preview"
            v-if="preview"
          />
        </button>

        <div class="flex flex-col gap-3">
          <button
            class="bg-green-500 py-2 rounded-md font-semibold text-white cursor-pointer enabled:hover:bg-green-600 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!itemInput"
            @click="handleAddItem"
            type="button"
          >
            Adicionar
          </button>

          <button
            class="rounded-md ring-1 py-2 ring-neutral-400 font-semibold cursor-pointer hover:bg-neutral-100"
            type="reset"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </dialog>
</template>
