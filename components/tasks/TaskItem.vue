<script setup lang="ts">
import type { Task, User } from "@/types/tasks";
const props = defineProps<({
  task: Task;
  users: User[];
  displayMode: string;
  statusColor: string;
})>();

const emit = defineEmits(["open-assignee", "update-assignee"]);

const assigneeUser = computed(() => {
  if (!props.users || !props.task?.assigneeId) return null;
  return props.users.find((user: User) => user.id === props.task.assigneeId) || null;
});

const isAssigneePopupOpen = ref(false);
const assigneeTrigger = ref<HTMLElement | null>(null);

const openAssigneePopup = () => {
  isAssigneePopupOpen.value = true;
};
onMounted(() => {
  console.log("Users + ", props.users);
});
const handleAssigneeSelect = (assignee: User) => {
  emit("update-assignee", { taskId: props.task?.id, assignee });
  isAssigneePopupOpen.value = false;
};

const isLevelSelectorOpen = ref(false);
const selectedLevel = ref(props.task?.iconLevelOpacity);
const triggerElementRef = ref<HTMLElement | null>(null);

const openLevelSelector = () => {
  isLevelSelectorOpen.value = true;
};

const handleLevelSelect = (level: any) => {
  selectedLevel.value = level;
  isLevelSelectorOpen.value = false;
};

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
    class="flex justify-between text-white hover:bg-white/5 rounded-md p-3 transition-colors"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 relative">
        <UButton
          ref="triggerElementRef"
          variant="ghost"
          class="hover:bg-white/10 p-2 cursor-pointer rounded-xl"
          @click="openLevelSelector"
        >
          <IconsTaskLevel
            :first-fill-opacity="task?.iconLevelOpacity.firstFillOpacity"
            :second-fill-opacity="task?.iconLevelOpacity.secondFillOpacity"
            :third-fill-opacity="task?.iconLevelOpacity.thirdFillOpacity"
          />
        </UButton>

        <TasksTaskLevelSelector
          v-if="isLevelSelectorOpen"
          :model-value="selectedLevel"
          :trigger-element="triggerElementRef?.$el ?? triggerElementRef"
          @update:model-value="handleLevelSelect"
          @close="isLevelSelectorOpen = false"
        />
        <span class="text-gray-500">{{ task?.id }}</span>
      </div>
      <div class="flex items-center gap-2 font-medium">
        <UButton
          variant="ghost"
          class="hover:bg-white/10 p-2 cursor-pointer rounded-xl"
        >
          <IconsTaskStatus
            :stroke-color="statusColor"
            transform-status="rotate(-90 7 7)"
          />
        </UButton>
        <span>{{ task?.name }}</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="hidden sm:flex gap-1">
        <UBadge
          v-for="tag in task?.tags"
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
        <UIcon
          v-if="task?.component"
          name="i-heroicons-puzzle-piece"
          class="mr-1"
        />
        <span>{{ task?.component }}</span>
      </div>

      <div class="hidden sm:block text-sm text-gray-500">
        {{ task.dueDate }}
      </div>

      <div class="flex justify-end relative">
        <UAvatar
          ref="assigneeTrigger"
          :src="assigneeUser?.avatar || 'https://i.pravatar.cc/300'"
          :alt="assigneeUser?.name || 'default'"
          size="sm"
          class="cursor-pointer hover:ring-2 hover:ring-primary"
          @click="openAssigneePopup"
        >
          <template #badge>
            <UIcon
              v-if="task?.assigneeId"
              name="i-heroicons-check-circle-20-solid"
              class="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-primary"
            />
          </template>
        </UAvatar>
        <TasksTaskAsignSelect
          v-if="isAssigneePopupOpen"
          :user="props.users"
          :model-value="task?.assigneeId"
          :trigger-element="assigneeTrigger?.$el ?? assigneeTrigger"
          @update:model-value="handleAssigneeSelect"
          @close="isAssigneePopupOpen = false"
        />
      </div>
    </div>
  </div>
</template>
