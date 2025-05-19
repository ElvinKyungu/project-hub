<script setup lang="ts">
import { useClickOutside } from '@vueuse/core'
import { gsap } from 'gsap'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const popup = ref<HTMLElement | null>(null)
const searchInput = ref('')
const isOpen = ref(false)

// Close popup when clicking outside
useClickOutside(popup, () => {
  if (isOpen.value) {
    emit('close')
  }
})

// Sample task level icons data (you might want to replace this with your actual data)
const taskLevels = [
  { id: 1, name: 'Low', icon: 'i-heroicons-arrow-down' },
  { id: 2, name: 'Medium', icon: 'i-heroicons-arrow-down-triangle' },
  { id: 3, name: 'High', icon: 'i-heroicons-arrow-up' },
  { id: 4, name: 'Critical', icon: 'i-heroicons-exclamation-circle' },
  // Add more task levels as needed
]

const filteredLevels = computed(() => {
  return taskLevels.filter(level => 
    level.name.toLowerCase().includes(searchInput.value.toLowerCase())
  )
})

const selectLevel = (level: any) => {
  emit('update:modelValue', level)
  emit('close')
}

// Animation when opening the popup
onMounted(() => {
  if (isOpen.value) {
    gsap.from(popup.value, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
})

// Animation when closing the popup
watch(isOpen, (newVal) => {
  if (!newVal) {
    gsap.to(popup.value, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        emit('close')
      }
    })
  }
})
</script>

<template>
  <!-- ref="popup" -->
  <div  class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg p-4 z-[999]">
    <div class="flex items-center gap-2 mb-4">
      <!-- <input
        v-model="searchInput"
        type="text"
        placeholder="Search task levels..."
        class="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
      /> -->
      <UIcon name="i-heroicons-magnifying-glass" class="text-gray-400" />
    </div>
    
    <div class="space-y-2">
      <!-- <button
        v-for="level in filteredLevels"
        :key="level.id"
        @click="selectLevel(level)"
        class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <UIcon :name="level.icon" class="w-5 h-5" />
        <span>{{ level.name }}</span>
      </button> -->
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
