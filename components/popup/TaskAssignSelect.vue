<script setup lang="ts">
import { gsap } from "gsap"
import { onClickOutside } from "@vueuse/core"
import type { User } from "@/types/tasks"

const usersStore = useUsersStore()

const props = defineProps({
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  triggerElement: {
    type: Object as PropType<{ $el: HTMLElement }>,
    default: null,
  },
})
const emit = defineEmits(["update:modelValue", "close"])

const popup = ref<HTMLElement | null>(null)
const search = ref("")
const selected = ref<User | null>(null)

const getAvatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`

// Charge les users depuis le store au montage
onMounted(async () => {
  if (usersStore.users.length === 0) {
    await usersStore.fetchUsers()
  }
  // Synchroniser le modelValue avec le selected
  selected.value = usersStore.users.find(u => u.id === props.modelValue) || null

  // Animation d’entrée
  gsap.from(popup.value, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: "power2.out",
  })
})

// Fermer le popup si on clique en dehors
onClickOutside(popup, () => emit("close"))

// Filtrer les utilisateurs selon la recherche
const filteredUsers = computed(() =>
  usersStore.users.filter((u) =>
    u.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const selectUser = (user: User) => {
  selected.value = user
  gsap.to(popup.value, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      emit("update:modelValue", user.id) // émettre l'id du user sélectionné
      emit("close")
    },
  })
}
</script>

<template>
  <div
    ref="popup"
    class="absolute items-center gap-2 bg-primary border border-b border-bordercolor rounded-lg shadow-lg p-3 z-[999] w-64 top-10"
  >
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
      <div
        v-if="usersStore.loading"
        class="text-gray-500 text-center py-2"
      >
        Loading users...
      </div>
      <div
        v-else-if="usersStore.error"
        class="text-red-500 text-center py-2"
      >
        {{ usersStore.error }}
      </div>
      <button
        v-else
        v-for="user in filteredUsers"
        :key="user.id"
        class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer text-sm transition"
        @click="selectUser(user)"
      >
        <div class="flex items-center gap-3">
          <img
            :src="user.avatar_url || getAvatarUrl(user.name)"
            class="w-8 h-8 rounded-full"
            :alt="user.name"
          />
          <span>{{ user.name }} {{ user.last_name }}</span>
        </div>
        <UIcon
          v-if="selected?.id === user.id"
          name="uil:check"
          class="text-green-500"
        />
      </button>
    </div>
  </div>
</template>
