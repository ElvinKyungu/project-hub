<script setup lang="ts">
import { storeToRefs } from "pinia"
import type { Task } from "@/types/tasks"
import type { User } from "@/types/user"

const tasksStore = useTasksStore()
const usersStore = useUsersStore()

const displayMode = ref("list")
const filterOpen = ref(false)
const assigneeModalOpen = ref(false)
const currentTask = ref<Task | null>(null)
const showTask = ref(false)

// 🏃‍♂️ Reactive store values
const { tasks, loading: tasksLoading, error: tasksError } = storeToRefs(tasksStore)
const { users, loading: usersLoading, error: usersError } = storeToRefs(usersStore)

// 🖼️ Avatar enrichi une seule fois (si pas d’avatar_url → avatar généré)
const enrichedUsers = computed(() =>
  users.value.map((user: User) => ({
    ...user,
    avatarUrl:
      user.avatar_url || `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(user.name)}`
  }))
)

// 📂 Filtrage par état
const inProgressTasks = computed(() =>
  tasks.value.filter((task: Task) => task.state === "in-progress")
)
const technicalReviewTasks = computed(() =>
  tasks.value.filter((task: Task) => task.state === "review")
)
const completedTasks = computed(() =>
  tasks.value.filter((task: Task) => task.state === "completed")
)

function openAssigneeModal(task: Task) {
  currentTask.value = task
  assigneeModalOpen.value = true
}

const createTask = () => {
  showTask.value = true
}

// ⬇️ Chargement initial des données
onMounted(async () => {
  if (!tasks.value.length) await tasksStore.fetchTasks()
  if (!users.value.length) await usersStore.fetchUsers()
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
      <!-- ✅ Loading and error states -->
      <div v-if="tasksLoading || usersLoading" class="text-center text-gray-400">
        Loading tasks and users...
      </div>
      <div v-else-if="tasksError || usersError" class="text-red-500 text-center">
        {{ tasksError || usersError }}
      </div>
      <template v-else>
        <!-- 📦 In Progress Section -->
        <TaskSection title="In Progress" :count="inProgressTasks.length">
          <h1 class="text-xl text-white flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <IconsTaskStatus
                stroke-color="#facc15"
                transform-status="rotate(-90 7 7)"
              />
              <span>In progress {{ inProgressTasks.length }}</span>
            </div>
            <UButton
              variant="ghost"
              class="hover:bg-white/10 p-2 cursor-pointer rounded-xl mr-2"
              @click="createTask"
            >
              <UIcon name="uil:plus" class="text-2xl" />
            </UButton>
          </h1>
          <TasksCreateTask v-if="showTask" @close="showTask = false" />
          <TasksTaskItem
            v-for="task in inProgressTasks"
            :key="task.id"
            :task="task"
            :display-mode="displayMode"
            :users="enrichedUsers"
            status-color="#facc15"
            @open-assignee="openAssigneeModal(task)"
          />
        </TaskSection>

        <!-- 📦 Technical Review Section -->
        <TaskSection
          title="Technical Review"
          :count="technicalReviewTasks.length"
        >
          <h1 class="text-xl text-white flex items-center gap-2">
            <IconsTaskStatus
              stroke-color="#22c55e"
              transform-status="rotate(-90 7 7)"
            />
            <span>Technical Review {{ technicalReviewTasks.length }}</span>
          </h1>
          <TasksTaskItem
            v-for="task in technicalReviewTasks"
            :key="task.id"
            :task="task"
            :display-mode="displayMode"
            :users="enrichedUsers"
            status-color="#22c55e"
            @open-assignee="openAssigneeModal(task)"
          />
        </TaskSection>

        <!-- 📦 Completed Section -->
        <TaskSection title="Completed" :count="completedTasks.length">
          <h1 class="text-xl text-white flex items-center gap-2">
            <IconsTaskStatus
              stroke-color="#8b5cf6"
              transform-status="rotate(-90 7 7)"
            />
            <span>Completed {{ completedTasks.length }}</span>
          </h1>
          <TasksTaskItem
            v-for="task in completedTasks"
            :key="task.id"
            :task="task"
            :display-mode="displayMode"
            :users="enrichedUsers"
            status-color="#8b5cf6"
            @open-assignee="openAssigneeModal(task)"
          />
        </TaskSection>
      </template>
    </main>
  </div>
</template>
