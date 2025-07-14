<script setup lang="ts">
import type { Task, User } from "@/types/tasks";

const displayMode = ref("list");
const filterOpen = ref(false);
const assigneeModalOpen = ref(false);
const currentTask = ref<Task | null>(null);
const showTask = ref(false);
const users = ref<User[]>([
  { id: 1, name: "Elvin.code", avatar: "", teams: [1] },
  { id: 2, name: "Gabriel.delattre", avatar: "", teams: [1] },
  { id: 3, name: "Deb.yambenu", avatar: "", teams: [1] },
  { id: 4, name: "Bienfaits.shomari", avatar: "", teams: [2] },
  { id: 5, name: "Astrid.code", avatar: "", teams: [2] },
]);

const enrichedUsers = computed(() =>
  users.value.map((user: User) => ({
    ...user,
    avatarUrl:
      user.avatar || `https://api.dicebear.com/9.x/glass/svg?seed=${user.name}`,
  })),
);
const tasks = ref<Task[]>([
  {
    id: "ElvinCODE-508",
    name: "Update Modal animations",
    state: "in-progress",
    tags: ["Testing"],
    type: "improvement",
    component: "Gabriel UI - Dropdown",
    dueDate: "Mar 17",
    assigneeId: 12,
    iconLevelOpacity: {
      firstFillOpacity: "0.8",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.3",
    },
  },
])

const inProgressTasks = computed(() =>
  tasks.value.filter((task: Task) => task.state === "in-progress"),
);

const technicalReviewTasks = computed(() =>
  tasks.value.filter((task: Task) => task.state === "review"),
);
const completedTasks = computed(() =>
  tasks.value.filter((task: Task) => task.state === "completed"),
);
function openAssigneeModal(task: Task) {
  currentTask.value = task;
  assigneeModalOpen.value = true;
}
const createTask = () => {
  // Logic to create a new task
  console.log("Create new task");
  showTask.value = true;
};
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
          variant="ghost"
          :class="{ 'text-white': displayMode === 'list' }"
          @click="displayMode = 'list'"
        />
      </div>
    </header>

    <main class="p-4">
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
        <TasksCreateTask v-if="showTask" @close="showTask.value = false" />
        <TasksTaskItem
          v-for="task in inProgressTasks"
          :key="task.id"
          :task="task"
          :display-mode="displayMode"
          :users="enrichedUsers"
          status-color="#22c55e"
          @open-assignee="openAssigneeModal(task)"
        />
      </TaskSection>

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
    </main>
  </div>
</template>
