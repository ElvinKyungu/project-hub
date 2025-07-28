<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps({
  items: {
    type: Array as PropType<{ id: number; name: string; icon: any; count?: number }[]>,
    required: true,
  },
  title: {
    type: String,
    default: 'Select Item',
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
  triggerElement: {
    type: Object as PropType<{ $el: HTMLElement }>,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const popup = ref<HTMLElement | null>(null)
const search = ref('')
const isOpen = ref(false)

const filtered = computed(() =>
  props.items.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))
)

const selectItem = (item: any) => {
  gsap.to(popup.value, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      emit('update:modelValue', item)
      emit('close')
    },
  })
}

onMounted(() => {
  isOpen.value = true
  gsap.from(popup.value, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: 'power2.out',
  })
})

onClickOutside(popup, () => {
  emit('close')
})
</script>

<template>
  <div
    ref="popup"
    class="absolute items-center gap-2 bg-primary border border-bordercolor rounded-lg shadow-lg p-3 z-[999] w-64 top-10"
  >
    <div class="flex flex-col gap-2 mb-3">
      <h2 class="text-sm font-medium">{{ title }}</h2>
      <UInput
        v-model="search"
        trailing-icon="uil:search"
        :placeholder="searchPlaceholder"
        size="md"
        class="text-sm"
      />
    </div>

    <div class="space-y-1 max-h-64 overflow-y-auto">
      <button
        v-for="item in filtered"
        :key="item.id"
        class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-800 cursor-pointer text-sm transition"
        @click="selectItem(item)"
      >
        <div class="flex items-center gap-3">
          <component :is="item.icon" class="w-4 h-4" />
          <span>{{ item.name }}</span>
        </div>
        <div v-if="item.count !== undefined" class="flex items-center gap-1">
          <span class="text-xs text-gray-500">{{ item.count }}</span>
        </div>
      </button>
    </div>
  </div>
</template>
