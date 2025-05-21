<script setup lang="ts">
import type { Task, User } from "@/types/tasks";
const breakpoints = useBreakpoints({
  mobile: 640,
  tablet: 768,
  desktop: 1024,
});

const isMobile = breakpoints.smaller("tablet");

const displayMode = ref("list");
const filterOpen = ref(false);
const assigneeModalOpen = ref(false);
const currentTask = ref(null);

const filters = ref({
  status: {
    inProgress: true,
    technicalReview: true,
    completed: true,
  },
  type: {
    bug: true,
    feature: true,
    improvement: true,
  },
});

const users = ref<User[]>([
  { id: 1, name: "Alex Smith", avatar: "/avatar1.png", teams: [1] },
  { id: 2, name: "Jordan Lee", avatar: "/avatar2.png", teams: [1] },
  { id: 3, name: "Taylor Kim", avatar: "/avatar3.png", teams: [1] },
  { id: 4, name: "Morgan Chen", avatar: "/avatar4.png", teams: [2] },
  { id: 5, name: "Riley Patel", avatar: "/avatar5.png", teams: [2] },
]);

const tasks = ref<Task[]>([
  {
    id: "ElvinCODE-508",
    name: "Update Modal animations",
    state: "in-progress",
    tags: ["Testing"],
    type: "improvement",
    component: "Gabriel UI - Dropdown",
    dueDate: "Mar 17",
    assigneeId: 1,
    iconLevelOpacity: {
      firstFillOpacity: "0.8",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.3",
    },
  },
  {
    id: "ElvinCODE-512",
    name: "Enhance Breadcrumb navigation usability",
    state: "in-progress",
    tags: ["Performance"],
    type: "improvement",
    component: "",
    dueDate: "Mar 21",
    assigneeId: 1,
    iconLevelOpacity: {
      firstFillOpacity: "0.8",
      secondFillOpacity: "0.3",
      thirdFillOpacity: "0.3",
    },
  },
  {
    id: "ElvinCODE-520",
    name: "Enhance Loading indicator performance",
    state: "in-progress",
    tags: ["Testing"],
    type: "improvement",
    component: "Gabriel UI - Navigation",
    dueDate: "Mar 29",
    assigneeId: 1,
    iconLevelOpacity: {
      firstFillOpacity: "0.8",
      secondFillOpacity: "0.8",
      thirdFillOpacity: "0.8",
    },
  },
  {
    id: "ElvinCODE-524",
    name: "Implement Search bar with auto-complete",
    state: "in-progress",
    tags: ["Performance"],
    type: "improvement",
    component: "Gabriel UI - Sidebar",
    dueDate: "Apr 02",
    assigneeId: 1,
    iconLevelOpacity: {
      firstFillOpacity: "0.8",
      secondFillOpacity: "0.3",
      thirdFillOpacity: "0.3",
    },
  },
  {
    id: "ElvinCODE-415",
    name: "Design new modal system with focus trapping",
    state: "review",
    tags: ["Documentation"],
    type: "bug",
    component: "Gabriel UI - Modals",
    dueDate: "Mar 09",
    assigneeId: 2,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-501",
    name: "Enhance responsiveness of Navbar",
    state: "review",
    tags: ["Refactor"],
    type: "bug",
    component: "Gabriel UI - Layout",
    dueDate: "Mar 10",
    assigneeId: 2,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-505",
    name: "Improve Tooltip interactivity",
    state: "review",
    tags: ["Accessibility"],
    type: "feature",
    component: "Gabriel UI - Cards",
    dueDate: "Mar 14",
    assigneeId: 3,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-513",
    name: "Refactor Accordion for smoother transitions",
    state: "review",
    tags: ["Documentation"],
    type: "feature",
    component: "Gabriel UI - Core Components",
    dueDate: "Mar 22",
    assigneeId: 3,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-517",
    name: "Improve Color scheme consistency",
    state: "review",
    tags: ["Performance"],
    type: "improvement",
    component: "Gabriel UI - Theming",
    dueDate: "Mar 26",
    assigneeId: 3,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-525",
    name: "Update Alert system for critical notifications",
    state: "review",
    tags: ["Testing"],
    type: "feature",
    component: "Gabriel UI - Sidebar",
    dueDate: "Apr 03",
    assigneeId: 4,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-204",
    name: "Optimize animations for smoother UI transitions",
    state: "completed",
    tags: ["Bug"],
    type: "improvement",
    component: "Gabriel UI - Modals",
    dueDate: "Mar 12",
    assigneeId: 4,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-502",
    name: "Optimize loading time of Footer",
    state: "completed",
    tags: ["Performance"],
    type: "improvement",
    component: "Gabriel UI - Sidebar",
    dueDate: "Mar 11",
    assigneeId: 4,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-506",
    name: "Redesign Dropdown for mobile devices",
    state: "completed",
    tags: ["Testing"],
    type: "feature",
    component: "Gabriel UI - Tooltip",
    dueDate: "Mar 15",
    assigneeId: 4,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-510",
    name: "Streamline Input component styling",
    state: "completed",
    tags: ["Testing"],
    type: "feature",
    component: "Gabriel UI - Core Components",
    dueDate: "Mar 19",
    assigneeId: 4,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-514",
    name: "Implement Carousel with lazy loading",
    state: "completed",
    tags: ["Design"],
    type: "feature",
    component: "Gabriel UI - Core Components",
    dueDate: "Mar 23",
    assigneeId: 4,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
  {
    id: "ElvinCODE-518",
    name: "Design new Icon set for better scalability",
    state: "completed",
    tags: ["Performance"],
    type: "bug",
    component: "Gabriel UI - Theming",
    dueDate: "Mar 27",
    assigneeId: 4,
    iconLevelOpacity: {
      firstFillOpacity: "0.2",
      secondFillOpacity: "0.7",
      thirdFillOpacity: "0.7",
    },
  },
]);

const inProgressTasks = computed(() =>
  tasks.value.filter((task) => task.state === "in-progress"),
);

const technicalReviewTasks = computed(() =>
  tasks.value.filter((task) => task.state === "review"),
);

const completedTasks = computed(() =>
  tasks.value.filter((task) => task.state === "completed"),
);

function resetFilters() {
  filters.value = {
    status: {
      inProgress: true,
      technicalReview: true,
      completed: true,
    },
    type: {
      bug: true,
      feature: true,
      improvement: true,
    },
  };
}

function applyFilters() {
  filterOpen.value = false;
  // Logic to filter tasks
}

function openAssigneeModal(task) {
  currentTask.value = task;
  assigneeModalOpen.value = true;
}
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
          >
            <UIcon name="uil:plus" class="text-2xl" />
          </UButton>
        </h1>
        <TasksTaskItem
          v-for="task in inProgressTasks"
          :key="task.id"
          :task="task"
          :display-mode="displayMode"
          :user="users"
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
          :user="users"
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
          :users="users"
          status-color="#8b5cf6"
          @open-assignee="openAssigneeModal(task)"
        />
      </TaskSection>
    </main>
  </div>
</template>
