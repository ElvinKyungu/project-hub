<script setup lang="ts">
import type { Task } from "@/types/tasks"

const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const componentsStore = useComponentsStore()

const displayMode = ref("list")
const filterOpen = ref(false)
const assigneeModalOpen = ref(false)
const currentTask = ref<Task | null>(null)
const showTask = ref(false)

// 🏃‍♂️ Reactive store values
const {
  tasks,
  loading: tasksLoading,
} = storeToRefs(tasksStore);
const {
  users,
  loading: usersLoading,
} = storeToRefs(usersStore)

const {
  components,
} = storeToRefs(componentsStore)

const taskStatuses = [
  { key: "In progress", label: "In Progress", color: "#facc15" },
  { key: "Technical Review", label: "Technical Review", color: "#22c55e" },
  { key: "Completed", label: "Completed", color: "#8b5cf6" },
  { key: "Todo", label: "To Do", color: "#0ea5e9" },
  { key: "Backlog", label: "Backlog", color: "#f97316" },
  { key: "Paused", label: "Paused", color: "#e11d48" },
]

const groupedTasks = computed(() =>
  taskStatuses.map((status) => ({
    ...status,
    tasks: tasks.value.filter((task: Task) => task.status === status.key),
  })),
)

function openAssigneeModal(task: Task) {
  currentTask.value = task;
  assigneeModalOpen.value = true;
}

const createTask = () => {
  showTask.value = true;
};

onMounted(async () => {
  await tasksStore.fetchTasks()
  if (!tasks.value.length) await tasksStore.fetchTasks()
  if (!users.value.length) await usersStore.fetchUsers()
  if (!components.value.length) await componentsStore.fetchComponents()
})
</script>

<template>
  <div class="task-management-app">
    <header
      class="flex justify-between items-center p-4 border-b border-bordercolor text-white"
    >
      <div class="flex items-center gap-4">
        <UButton
          class="flex gap-3 cursor-pointer items-center"
          variant="ghost"
          @click="filterOpen = true"
        >
          <UIcon name="uil:filter" class="text-2xl" />
          <span class="text-base">Filter</span>
        </UButton>
      </div>
      <div class="flex gap-3 items-center">
        <UIcon
          name="uil:grid"
          class="text-2xl cursor-pointer text-gray-400"
          :class="{ 'text-white': displayMode === 'grid' }"
          @click="displayMode = 'grid'"
        />
        <UIcon
          name="uil:list-ul"
          class="text-2xl cursor-pointer text-gray-400"
          :class="{ 'text-white': displayMode === 'list' }"
          @click="displayMode = 'list'"
        />
      </div>
    </header>

    <main class="p-4">
      <div
        v-if="tasksLoading || usersLoading"
        class="text-center text-gray-400"
      >
        Loading tasks and users...
      </div>
      <template v-else>
        <div class="relative w-full flex flex-end">
          <UButton
            variant="ghost"
            class="hover:bg-white/10 p-2 cursor-pointer rounded-xl mr-2"
            @click="createTask"
          >
            <UIcon name="uil:plus" class="text-2xl" />
          </UButton>
        </div>
        <TaskSection
          v-for="status in groupedTasks"
          :key="status.key"
          :title="status.label"
          :count="status.tasks.length"
        >
          <h1
            class="text-xl text-white flex items-center justify-between gap-2 my-5 py-3 px-5 rounded"
            :style="{ backgroundColor: status.color + '10' }"
          >
            <div class="flex items-center gap-4">
              <TaskStatus
                :stroke-color="status.color"
                transform-status="rotate(-90 7 7)"
              />
              <span class="flex gap-4"><span>{{ status.label }}</span> <span>{{ status.tasks.length }}</span></span>
            </div>
          </h1>

          <TasksCreateTask v-if="showTask" @close="showTask = false" />
          <TaskItem
            v-for="task in status.tasks"
            :key="task.id"
            :task="task"
            :display-mode="displayMode"
            :users="users"
            :components="components"
            :status-color="status.color"
            @open-assignee="openAssigneeModal(task)"
          />
        </TaskSection>
      </template>
    </main>
  </div>
</template>
