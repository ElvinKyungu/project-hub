<script setup lang="ts">
defineProps({
  task: {
    type: Object,
    required: true
  },
  displayMode: {
    type: String,
    default: 'list'
  }
})

defineEmits(['open-assignee'])

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
  <div 
    class="flex justify-between text-white rounded-md p-3  transition-colors"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center col-span-1 sm:col-span-2 gap-2">
        <IconsTaskLevel
          :first-fill-opacity="task.iconLevelOpacity.firstFillOpacity"
          :second-fill-opacity="task.iconLevelOpacity.secondFillOpacity"
          :third-fill-opacity="task.iconLevelOpacity.thirdFillOpacity"
        />
        <span class="text-gray-500">{{ task.id }}</span>
      </div>
      <div class="col-span-1 flex items-center gap-2 sm:col-span-4 font-medium">
        <UButton variant="ghost" class="hover:bg-white/10 p-2 cursor-pointer rounded-xl">
          <IconsTaskStatus
            stroke-color="#facc15"
            transform-status="rotate(-90 7 7)"
          />
        </UButton>
        <span>{{ task.name }}</span>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="hidden sm:flex col-span-2 gap-1">
        <UBadge 
          v-for="tag in task.tags"
          :key="tag"
          color="neutral"
          variant="outline"
          size="xs"
          class="border border-bordercolor flex items-center gap-2 px-3 text-xs py-1 rounded-full"
        >
        <span class="w-2 h-2 rounded-full" :class="getTagBgClass(tag)"/>
          {{ tag }}
        </UBadge> 
      </div>
      <div class="hidden sm:block col-span-2 text-sm">
        <UIcon v-if="task.component" name="i-heroicons-puzzle-piece" class="mr-1" />
        <span>{{ task.component }}</span>
      </div>
      <div class="hidden sm:block col-span-1 text-sm text-gray-500">{{ task.dueDate }}</div>
      <div class="col-span-1 flex justify-end">
        <UAvatar 
          v-if="task.assignee" 
          :src="task.assignee.avatar" 
          size="sm" 
          class="cursor-pointer hover:ring-2 hover:ring-primary"
          @click="$emit('open-assignee', task)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>