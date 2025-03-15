<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  displayMode: {
    type: String,
    default: 'list'
  }
});
console.log(props);

defineEmits(['open-assignee']);

// Return appropriate icon based on task state
function getStateIcon(state) {
  switch (state) {
    case 'in-progress':
      return 'i-heroicons-play-circle';
    case 'review':
      return 'i-heroicons-document-magnifying-glass';
    case 'completed':
      return 'i-heroicons-check-circle';
    default:
      return 'i-heroicons-circle';
  }
}

// Return appropriate color based on task state
function getStateColor(state) {
  switch (state) {
    case 'in-progress':
      return 'yellow-500';
    case 'review':
      return 'green-500';
    case 'completed':
      return 'blue-500';
    default:
      return 'gray-500';
  }
}

// Return appropriate color based on tag
function getTagColor(tag) {
  switch (tag) {
    case 'Bug':
      return 'red';
    case 'Testing':
      return 'blue';
    case 'Documentation':
      return 'purple';
    case 'Performance':
      return 'orange';
    case 'Accessibility':
      return 'teal';
    case 'Design':
      return 'pink';
    case 'Refactor':
      return 'yellow';
    default:
      return 'gray';
  }
}
</script>
<template>
  <div 
    class="task-item text-white rounded-md p-3  transition-colors"
    :class="{
      'grid grid-cols-1 sm:grid-cols-12 items-center gap-2': displayMode === 'list',
      'block': displayMode === 'grid'
    }"
  >
    <!-- Left side with icons - Always visible -->
    <div class="flex items-center col-span-1 sm:col-span-2 gap-2">
      <UIcon :name="getStateIcon(task.state)" :class="`text-${getStateColor(task.state)}`" />
      <span class="text-gray-500">{{ task.id }}</span>
    </div>
    
    <!-- Task name - Always visible -->
    <div class="col-span-1 sm:col-span-4 font-medium">{{ task.name }}</div>
    
    <!-- Tags - Hidden on mobile -->
    <div class="hidden sm:flex col-span-2 gap-1">
      <UBadge 
        v-for="tag in task.tags" 
        :key="tag" 
        :color="getTagColor(tag)" 
        variant="subtle" 
        size="xs"
      >
        {{ tag }}
      </UBadge>
    </div>
    
    <!-- Component - Hidden on mobile -->
    <div class="hidden sm:block col-span-2 text-sm">
      <UIcon v-if="task.component" name="i-heroicons-puzzle-piece" class="mr-1" />
      <span>{{ task.component }}</span>
    </div>
    
    <!-- Due date - Hidden on mobile -->
    <div class="hidden sm:block col-span-1 text-sm text-gray-500">{{ task.dueDate }}</div>
    
    <!-- Assignee - Always visible -->
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
</template>

<style scoped>
/* Grid layout styles */
.task-item.grid {
  grid-template-columns: auto 1fr auto auto auto auto;
}

@media (max-width: 640px) {
  .task-item.grid {
    grid-template-columns: auto 1fr auto;
  }
}
</style>