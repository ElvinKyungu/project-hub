<script setup lang="ts">
import type { Task } from "@/types/tasks"
import type { User } from "@/types/user"
import type { Components } from "@/types/components"

const props = defineProps<{
  task: Task;
  users: User[]
  components: Components[]
  displayMode: string
  statusColor: string
}>()
const leadId = ref<string | null>(null);
const emit = defineEmits(["open-assignee", "update-assignee"]);

const assigneeUser = computed(() => {
  if (!props.users || !props.task?.lead_id) return null;
  return (
    props.users.find((user: User) => user.id === props.task.lead_id) || null
  )
})

const taskComponent = computed(() => {
  return props.components.find((c: Components) => c.id === props.task.component_id) || null
})

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
const triggerElementRef = ref<HTMLElement | null>(null);

const openLevelSelector = () => {
  isLevelSelectorOpen.value = true;
};

const handleLevelSelect = () => {
  isLevelSelectorOpen.value = false;
}

const priorityIcon = computed(() => {
  const priorityMap: Record<string, any> = {
    "No priority": resolveComponent("IconsNoPriority"),
    Low: resolveComponent("IconsLow"),
    Medium: resolveComponent("IconsMedium"),
    High: resolveComponent("IconsHigh"),
    Urgent: resolveComponent("IconsUrgent"),
  }
  return priorityMap[props.task.priority] || resolveComponent("IconsNoPriority")
})
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
    class="flex justify-between text-white hover:bg-white/5 rounded-md p-2 transition-colors"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 relative">
        <UButton
          ref="triggerElementRef"
          variant="ghost"
          class="hover:bg-white/10 p-2 cursor-pointer rounded-xl"
          @click="openLevelSelector"
        >
          <component :is="priorityIcon" />
        </UButton>
        <PopupTaskPrioritySelector
          v-if="isLevelSelectorOpen"
          :tasks="[props.task]"
          :trigger-element="triggerElementRef?.$el ?? triggerElementRef"
          @update:model-value="handleLevelSelect"
          @close="isLevelSelectorOpen = false"
        />
        <span class="text-gray-500 hidden md:block">{{ task?.status }}</span>
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
        <span>{{ task?.title }}</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="hidden sm:flex gap-1">
        <UBadge
          :key="task.type"
          color="neutral"
          variant="outline"
          size="xs"
          class="border border-bordercolor flex items-center gap-2 px-3 text-xs py-1 rounded-full"
        >
          <span class="w-2 h-2 rounded-full" :class="getTagBgClass(task.type)" />
          {{ task.type }}
        </UBadge>
      </div>

      <div class="hidden sm:block text-sm">
        <UBadge
          :key="task.type"
          color="neutral"
          variant="outline"
          size="xs"
          class="border flex items-center gap-2 px-3 text-xs py-1 rounded-full"
          :style="{ borderColor: taskComponent?.color || 'var(--border-bordercolor)' }"
        >
          <UIcon
            v-if="taskComponent?.name"
            name="i-heroicons-puzzle-piece"
            class="mr-1"
          />
          Elvin UI {{ taskComponent?.name }}
        </UBadge>
      </div>

      <div class="hidden sm:block text-sm text-gray-500">
        {{ task.target_date
          ? new Date(task.target_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : "No due date" }}
      </div>

      <div class="flex justify-end relative">
        <UAvatar
          ref="assigneeTrigger"
          :src="assigneeUser?.avatarUrl"
          :alt="assigneeUser?.name || 'default'"
          size="sm"
          class="cursor-pointer hover:ring-2 hover:ring-primary"
          @click="openAssigneePopup"
        >
          <template #badge>
            <UIcon
              v-if="task?.lead_id"
              name="i-heroicons-check-circle-20-solid"
              class="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-primary"
            />
          </template>
        </UAvatar>
        <PopupTaskAssignSelect
          v-if="isAssigneePopupOpen"
          :users="props.users"
          :model-value="leadId"
          :trigger-element="assigneeTrigger ? { $el: assigneeTrigger } : undefined"
          @update:model-value="handleAssigneeSelect"
          @close="isAssigneePopupOpen = false"
        />
      </div>
    </div>
  </div>
</template>
