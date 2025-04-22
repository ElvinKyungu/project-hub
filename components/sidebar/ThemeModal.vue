<!-- components/sidebar/ThemeModal.vue -->
<script setup lang="ts">
import { useGsapModal } from '@/composables/useGsapModal'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const modal = ref<HTMLElement | null>(null)
const { showModal, hideModal } = useGsapModal()

watch(
  () => props.modelValue,
  (val) => {
    if (val && modal.value) showModal(modal.value)
  }
)

const close = () => {
  if (modal.value) hideModal(modal.value, () => emit('update:modelValue', false))
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div ref="modal" class="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-lg p-6 w-[300px]">
        <h2 class="text-lg font-semibold mb-4">Choisir un thème</h2>
        <ul>
          <li class="hidden lg:block">
            <UButton icon="uil:sun" variant="ghost" />
          </li>
          <li class="hidden lg:block">
            <UButton icon="uil:moon" variant="ghost" />
          </li>
          <li>
            <UButton icon="uil:desktop" variant="ghost" class="" />
          </li>
          <li>
            <UButton icon="uil:film" variant="ghost" class="" />
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>
