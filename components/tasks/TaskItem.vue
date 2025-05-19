<script setup lang="ts">

const props = defineProps({
  task: Object,
  displayMode: String,
  statusColor: String,
})

const emit = defineEmits(['open-assignee', 'update-assignee'])

function getAvatarUrl (seed: string) {
  const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEEAD', 'FF6F61']
  const color = colors[Math.floor(Math.random() * colors.length)]
  return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}&backgroundColor=${color}`
}

const isAssigneePopupOpen = ref(false)
const assigneeTrigger = ref<HTMLElement | null>(null)

const openAssigneePopup = () => {
  isAssigneePopupOpen.value = true
}

const handleAssigneeSelect = (assignee: any) => {
  emit('update-assignee', { taskId: props.task.id, assignee })
  isAssigneePopupOpen.value = false
} 

const isLevelSelectorOpen = ref(false)
const selectedLevel = ref(props.task.iconLevelOpacity)
const triggerElementRef = ref<HTMLElement | null>(null)

const openLevelSelector = () => {
  isLevelSelectorOpen.value = true
}

const handleLevelSelect = (level: any) => {
  selectedLevel.value = level
  isLevelSelectorOpen.value = false
}

const handleClose = () => {
  isLevelSelectorOpen.value = false
}
const getTagBgClass = (tag: string) => {
  const tagColors: Record<string, string> = {
    Bug: "bg-testing",
    Testing: "bg-development",
    Design: "bg-design",
    Documentation: "bg-deployment",
    Performance: "bg-research",
    Accessibility: "bg-marketing",
    Refactor: "bg-review",
    Other: "bg-other",
  };
  return tagColors[tag] || "bg-other";
}; 
</script>

<template>
  <div class="flex justify-between text-white hover:bg-white/5 rounded-md p-3 transition-colors">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 relative">
        <UButton
          variant="ghost"
          class="hover:bg-white/10 p-2 cursor-pointer rounded-xl"
          ref="triggerElementRef"
          @click="openLevelSelector"
        >
          <IconsTaskLevel
            :first-fill-opacity="task.iconLevelOpacity.firstFillOpacity"
            :second-fill-opacity="task.iconLevelOpacity.secondFillOpacity"
            :third-fill-opacity="task.iconLevelOpacity.thirdFillOpacity"
          />
        </UButton>

        <TasksTaskLevelSelector
          v-if="isLevelSelectorOpen"
          :model-value="selectedLevel"
          :trigger-element="triggerElementRef?.$el ?? triggerElementRef"
          @update:model-value="handleLevelSelect"
          @close="isLevelSelectorOpen = false"
        />


        <span class="text-gray-500">{{ task.id }}</span>
      </div>

      <div class="flex items-center gap-2 font-medium">
        <UButton variant="ghost" class="hover:bg-white/10 p-2 cursor-pointer rounded-xl">
          <IconsTaskStatus :stroke-color="statusColor" transform-status="rotate(-90 7 7)" />
        </UButton>
        <span>{{ task.name }}</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="hidden sm:flex gap-1">
        <UBadge
          v-for="tag in task.tags"
          :key="tag"
          color="neutral"
          variant="outline"
          size="xs"
          class="border border-bordercolor flex items-center gap-2 px-3 text-xs py-1 rounded-full"
        >
          <span class="w-2 h-2 rounded-full" :class="getTagBgClass(tag)" />
          {{ tag }}
        </UBadge>
      </div>

      <div class="hidden sm:block text-sm">
        <UIcon v-if="task.component" name="i-heroicons-puzzle-piece" class="mr-1" />
        <span>{{ task.component }}</span>
      </div>

      <div class="hidden sm:block text-sm text-gray-500">{{ task.dueDate }}</div>

      <div class="flex justify-end relative">
        <UAvatar
          ref="assigneeTrigger"
          :src="getAvatarUrl(task.assignee?.seed || 'default')"
          size="sm"
          class="cursor-pointer hover:ring-2 hover:ring-primary"
          @click="openAssigneePopup"
        >
          <template #badge>
            <UIcon
              name="i-heroicons-check-circle-20-solid"
              class="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-primary"
              v-if="task.assignee"
            />
          </template>
        </UAvatar>
        <TasksTaskAsignSelect
          v-if="isAssigneePopupOpen"
          :model-value="task.assignee"
          :trigger-element="assigneeTrigger?.$el ?? assigneeTrigger"
          @update:model-value="handleAssigneeSelect"
          @close="isAssigneePopupOpen = false"
        />
      </div>
    </div>
  </div>
</template>
