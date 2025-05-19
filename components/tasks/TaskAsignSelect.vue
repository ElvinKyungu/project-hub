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
  { id: 0, name: 'Elvin.code', seed: 'elvin', count: 3 },
  { id: 1, name: 'Gabriel.delattre', seed: 'gabriel', count: 11 },
  { id: 2, name: 'Deborah.yambenu', seed: 'deborah', count: 10 },
  { id: 3, name: 'Bienfaits.shomari', seed: 'bienfaits', count: 6 },
  { id: 4, name: 'John.kat', seed: 'john', count: 0 },
]

// Fonction pour générer une couleur aléatoire
const getRandomColor = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FF6F61', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
  return colors[Math.floor(Math.random() * colors.length)]
}

// Fonction pour générer l'URL de l'avatar
const getAvatarUrl = (seed: string) => {
  const color = getRandomColor()
  return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${color}`
}

const selected = ref(priorities[1])

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
  	<div class="flex items-center gap-2">
      <UPopover class="z-[999]">
        <UButton color="white" class="border w-44 justify-between text-gray-700">
          <span>{{ selected.name }}</span>
          <NuxtIcon name="uil:angle-down" class="w-4 h-4" />
        </UButton>

				<template #panel>
					<div class="bg-white rounded-lg shadow-lg p-3 w-64 border border-gray-200">
						<div class="flex items-center gap-2 mb-3">
							<h2 class="text-sm font-medium">Assign to</h2>
							<UInput v-model="search" trailing-icon="uil:search" placeholder="Search users..." size="md" class="flex-1" />
						</div>
						
						<div class="space-y-1">
							<button
								v-for="item in filtered"
								:key="item.id"
								@click="selectLevel(item)"
								class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-100 text-sm transition"
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
									<span class="text-xs text-gray-500">{{ item.count }} tasks</span>
									<NuxtIcon
										name="uil:check"
										class="w-4 h-4 text-primary"
										v-if="selected.id === item.id"
									/>
								</div>
							</button>
						</div>
					</div>
				</template>
			</UPopover>
		</div>
	</div>
</template>
