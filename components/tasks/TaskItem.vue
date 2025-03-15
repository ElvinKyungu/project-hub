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

defineEmits(['open-assignee']);
</script>
<template>
  <div 
    class="task-item text-white rounded-md p-3  transition-colors"
    :class="{
      'grid grid-cols-1 sm:grid-cols-12 items-center gap-2': displayMode === 'list',
      'block': displayMode === 'grid'
    }"
  >
    <div class="flex items-center gap-2">
      <!-- Left side with icons - Always visible -->
      <div class="flex items-center col-span-1 sm:col-span-2 gap-2">
        <IconsTaskLevel
          :first-fill-opacity="task.iconLevelOpacity.firstFillOpacity"
          :second-fill-opacity="task.iconLevelOpacity.secondFillOpacity"
          :third-fill-opacity="task.iconLevelOpacity.thirdFillOpacity"
        />
        <span class="text-gray-500">{{ task.id }}</span>
      </div>
      
      
      <div class="col-span-1 sm:col-span-4 font-medium">{{ task.name }}</div>
    </div>
    
    <!-- Tags - Hidden on mobile -->
    <!-- <div class="hidden sm:flex col-span-2 gap-1">
      <UBadge 
        v-for="tag in task.tags" 
        :key="tag" 
        :color="getTagColor(tag)" 
        variant="subtle" 
        size="xs"
      >
        {{ tag }}
      </UBadge> 
    </div>-->
    
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