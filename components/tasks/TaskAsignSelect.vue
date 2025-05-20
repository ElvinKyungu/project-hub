<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps({
  modelValue: Object,
  triggerElement: { type: Object as PropType<{ $el: HTMLElement }>, default: null }
})

const emit = defineEmits(['update:modelValue', 'close'])

const popup = ref<HTMLElement | null>(null)
const search = ref('')
const isOpen = ref(false)

const priorities = [
  { id: 0, name: 'Elvin.code', seed: 'elvin' },
  { id: 1, name: 'Gabriel.delattre', seed: 'gabriel' },
  { id: 2, name: 'Deborah.yambenu', seed: 'deborah' },
  { id: 3, name: 'Bienfaits.shomari', seed: 'bienfaits' },
  { id: 4, name: 'John.kat', seed: 'john' },
]

const selected = ref(priorities[1])
const getRandomColor = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FF6F61']
  return colors[Math.floor(Math.random() * colors.length)]
}

const getAvatarUrl = (seed: string) => {
  const color = getRandomColor()
  return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${color.replace('#', '')}`
}

const filtered = computed(() =>
  priorities.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const selectLevel = (level: any) => {
  selected.value = level
  gsap.to(popup.value, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      emit('update:modelValue', level)
      emit('close')
    }
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
    class="absolute items-center gap-2 bg-primary border border-b border-bordercolor rounded-lg shadow-lg p-3 z-[999] w-64 top-10"
  >

    <div>
			<div class="flex flex-col gap-2 mb-3">
				<h2 class="text-sm text-left font-medium">Assign to...</h2>
				<UInput
					v-model="search"
					trailing-icon="uil:search"
					placeholder="Search users..."
					size="md"
					class="flex-1 w-full"
				/>
			</div>

			<div class="space-y-1 max-h-64 overflow-y-auto">
				<button
					v-for="item in filtered"
					:key="item.id"
					@click="selectLevel(item)"
					class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-800 cursor-pointer text-sm transition"
					>
						<div class="flex items-center gap-3">
							<img
								:src="getAvatarUrl(item.seed)"
								class="w-8 h-8 rounded-full"
								:alt="item.name"
							/>
							<span>{{ item.name }}</span>
						</div>
						<div class="flex items-center gap-1">
							<NuxtIcon
								name="uil:check"
								class="w-4 h-4 text-primary"
								v-if="selected.id === item.id"
							/>
						</div>
					</button>
				</div>
			</div>
  </div>
</template>
