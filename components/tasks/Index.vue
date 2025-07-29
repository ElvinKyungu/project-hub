<script setup lang="ts">
import type { Task } from '@/types/tasks'

const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const componentsStore = useComponentsStore()

const isdisplayModalOpen = ref(false)
const displayMode = ref<'list' | 'grid'>('list')
const filterOpen = ref(false)
const assigneeModalOpen = ref(false)
const currentTask = ref<Task | null>(null)
const showTaskPopup = ref(false)
const displayTriggerElement = ref<HTMLElement | null>(null)
// 🏃‍♂️ Reactive store values
const { tasks, loading: tasksLoading } = storeToRefs(tasksStore)
const { users, loading: usersLoading } = storeToRefs(usersStore)

const { components } = storeToRefs(componentsStore)

const taskStatuses = [
  { key: 'In progress', label: 'In Progress', color: '#facc15' },
  { key: 'Technical Review', label: 'Technical Review', color: '#22c55e' },
  { key: 'Completed', label: 'Completed', color: '#8b5cf6' },
  { key: 'Todo', label: 'To Do', color: '#0ea5e9' },
  { key: 'Backlog', label: 'Backlog', color: '#f97316' },
  { key: 'Paused', label: 'Paused', color: '#e11d48' },
]

const groupedTasks = computed(() =>
  taskStatuses.map((status) => ({
    ...status,
    tasks: tasks.value.filter((task: Task) => task.status === status.key),
  }))
)

function openAssigneeModal(task: Task) {
  currentTask.value = task
  assigneeModalOpen.value = true
}

const openDisplayMode = () => {
  isdisplayModalOpen.value = true
}

onMounted(async () => {
  await tasksStore.fetchTasks()
  if (!tasks.value.length) await tasksStore.fetchTasks()
  if (!users.value.length) await usersStore.fetchUsers()
  if (!components.value.length) await componentsStore.fetchComponents()
})
</script>

<template>
  <div class="task-management-app">
    <header class="flex justify-between items-center p-4 border-b border-bordercolor text-white">
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
      <div class="flex gap-3 items-center relative">
        <UButton
          ref="displayTriggerElement"
          class="flex gap-1a cursor-pointer items-center"
          variant="ghost"
          @click="openDisplayMode"
        >
          <UIcon name="uil:sliders-v" class="text-xl" />

          <span class="text-base">Display</span>
        </UButton>
        <DisplayMode
          v-if="isdisplayModalOpen"
          :trigger-element="displayTriggerElement"
          @close="isdisplayModalOpen = false"
          @update:model-value="(val: 'list' | 'grid') => (displayMode = val)"
        />
      </div>
    </header>

    <main class="p-4">
      <div v-if="tasksLoading || usersLoading" class="text-center text-gray-400">
        Loading tasks and users...
      </div>
      <template v-else>
        <div class="relative w-full flex flex-end justify-end">
          <UButton
            variant="ghost"
            class="hover:bg-white/10 p-2 cursor-pointer rounded-xl mr-2"
            @click="showTaskPopup = true"
          >
            <UIcon name="uil:plus" class="text-2xl" />
          </UButton>
        </div>
        <div v-if="displayMode === 'list'">
          <div v-for="status in groupedTasks" :key="status.key" :title="status.label">
            <h1
              class="text-xl text-white flex items-center justify-between gap-2 my-5 py-3 px-5 rounded"
              :style="{ backgroundColor: status.color + '10' }"
            >
              <div class="flex items-center gap-4 relative">
                <IconTaskStatus :stroke-color="status.color" transform-status="rotate(-90 7 7)" />

                <span class="flex gap-4"
                  ><span>{{ status.label }}</span> <span>{{ status.tasks.length }}</span></span
                >
              </div>
            </h1>

            <CreateTask v-if="showTaskPopup" :users="users" @close="showTaskPopup = false" />
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
          </div>
        </div>
        <div v-if="displayMode === 'grid'">
          <div class="flex gap-4 overflow-x-auto overflow-y-auto pb-4 mt-3">
            <div v-for="status in groupedTasks" :key="status.key" class="min-w-80 flex-shrink-0">
              <div class="mb-4">
                <div
                  class="flex items-center justify-between p-3 rounded-lg"
                  :style="{ backgroundColor: status.color + '20' }"
                >
                  <div class="flex items-center gap-3">
                    <IconTaskStatus
                      :stroke-color="status.color"
                      transform-status="rotate(-90 7 7)"
                    />
                    <span class="text-white font-medium">{{ status.label }}</span>
                    <span class="text-gray-400 text-sm">{{ status.tasks.length }}</span>
                  </div>
                  <UButton
                    variant="ghost"
                    class="hover:bg-white/10 p-1 cursor-pointer rounded"
                    @click="showTaskPopup = true"
                  >
                    <UIcon name="uil:plus" class="text-lg" />
                  </UButton>
                </div>
              </div>

              <div class="space-y-3 min-h-96">
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

                <div
                  v-if="status.tasks.length === 0"
                  class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center text-gray-400"
                >
                  No tasks in {{ status.label }}
                </div>
              </div>
            </div>
          </div>
          <CreateTask v-if="showTaskPopup" :users="users" @close="showTaskPopup = false" />
        </div>
      </template>
    </main>
  </div>
</template>
