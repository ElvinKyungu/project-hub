
<script setup lang="ts">
const breakpoints = useBreakpoints({
  mobile: 640,
  tablet: 768,
  desktop: 1024,
});

const isMobile = breakpoints.smaller('tablet');

const displayMode = ref('list');
const filterOpen = ref(false);
const assigneeModalOpen = ref(false);
const currentTask = ref(null);

const filters = ref({
  status: {
    inProgress: true,
    technicalReview: true,
    completed: true
  },
  type: {
    bug: true,
    feature: true,
    improvement: true
  }
});

const tasks = ref([
  { 
    id: 'ElvinCODE-508',
    iconLevelOpacity:{
      firstFillOpacity: '0.8',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.3'
    },
    name: 'Update Modal animations', 
    state: 'in-progress',
    tags: ['Testing'],
    component: 'LNDev UI - Dropdown',
    dueDate: 'Mar 17',
    assignee: { id: 1, avatar: '/avatar1.png' }
  },
  { 
    id: 'ElvinCODE-512',
    iconLevelOpacity:{
      firstFillOpacity: '0.8',
      secondFillOpacity: '0.3',
      thirdFillOpacity: '0.3'
    },
    name: 'Enhance Breadcrumb navigation usability', 
    state: 'in-progress',
    tags: ['Performance'],
    component: '',
    dueDate: 'Mar 21',
    assignee: { id: 2, avatar: '/avatar2.png' }
  },
  { 
    id: 'ElvinCODE-520',
    iconLevelOpacity:{
      firstFillOpacity: '0.8',
      secondFillOpacity: '0.8',
      thirdFillOpacity: '0.8'
    },
    name: 'Enhance Loading indicator performance', 
    state: 'in-progress',
    tags: ['Testing'],
    component: 'LNDev UI - Navigation',
    dueDate: 'Mar 29',
    assignee: { id: 3, avatar: '/avatar3.png' }
  },
  { 
    id: 'ElvinCODE-524',
    iconLevelOpacity:{
      firstFillOpacity: '0.8',
      secondFillOpacity: '0.3',
      thirdFillOpacity: '0.3'
    },
    name: 'Implement Search bar with auto-complete', 
    state: 'in-progress',
    tags: ['Performance'],
    component: 'LNDev UI - Sidebar',
    dueDate: 'Apr 02',
    assignee: { id: 4, avatar: '/avatar4.png' }
  },
  { 
    id: 'ElvinCODE-415',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Design new modal system with focus trapping', 
    state: 'review',
    tags: ['Documentation'],
    component: 'LNDev UI - Modals',
    dueDate: 'Mar 09',
    assignee: { id: 5, avatar: '/avatar5.png' }
  },
  { 
    id: 'ElvinCODE-501',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Enhance responsiveness of Navbar', 
    state: 'review',
    tags: ['Refactor'],
    component: 'LNDev UI - Layout',
    dueDate: 'Mar 10',
    assignee: { id: 2, avatar: '/avatar2.png' }
  },
  { 
    id: 'ElvinCODE-505',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Improve Tooltip interactivity', 
    state: 'review',
    tags: ['Accessibility'],
    component: 'LNDev UI - Cards',
    dueDate: 'Mar 14',
    assignee: { id: 3, avatar: '/avatar3.png' }
  },
  { 
    id: 'ElvinCODE-513',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Refactor Accordion for smoother transitions', 
    state: 'review',
    tags: ['Documentation'],
    component: 'LNDev UI - Core Components',
    dueDate: 'Mar 22',
    assignee: { id: 5, avatar: '/avatar5.png' }
  },
  { 
    id: 'ElvinCODE-517',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Improve Color scheme consistency', 
    state: 'review',
    tags: ['Performance'],
    component: 'LNDev UI - Theming',
    dueDate: 'Mar 26',
    assignee: { id: 2, avatar: '/avatar2.png' }
  },
  { 
    id: 'ElvinCODE-525',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Update Alert system for critical notifications', 
    state: 'review',
    tags: ['Testing'],
    component: 'LNDev UI - Sidebar',
    dueDate: 'Apr 03',
    assignee: { id: 5, avatar: '/avatar5.png' }
  },
  { 
    id: 'ElvinCODE-204',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Optimize animations for smoother UI transitions', 
    state: 'completed',
    tags: ['Bug'],
    component: '',
    dueDate: 'Mar 12',
    assignee: { id: 1, avatar: '/avatar1.png' }
  },
  { 
    id: 'ElvinCODE-502',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Optimize loading time of Footer', 
    state: 'completed',
    tags: ['Performance'],
    component: 'LNDev UI - Sidebar',
    dueDate: 'Mar 11',
    assignee: { id: 2, avatar: '/avatar2.png' }
  },
  { 
    id: 'ElvinCODE-506',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Redesign Dropdown for mobile devices', 
    state: 'completed',
    tags: ['Testing'],
    component: 'LNDev UI - Tooltip',
    dueDate: 'Mar 15',
    assignee: { id: 1, avatar: '/avatar1.png' }
  },
  { 
    id: 'ElvinCODE-510',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Streamline Input component styling', 
    state: 'completed',
    tags: ['Testing'],
    component: '',
    dueDate: 'Mar 19',
    assignee: { id: 4, avatar: '/avatar4.png' }
  },
  { 
    id: 'ElvinCODE-514',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Implement Carousel with lazy loading', 
    state: 'completed',
    tags: ['Design'],
    component: 'LNDev UI - Core Components',
    dueDate: 'Mar 23',
    assignee: { id: 1, avatar: '/avatar1.png' }
  },
  { 
    id: 'ElvinCODE-518',
    iconLevelOpacity:{
      firstFillOpacity: '0.2',
      secondFillOpacity: '0.7',
      thirdFillOpacity: '0.7'
    },
    name: 'Design new Icon set for better scalability', 
    state: 'completed',
    tags: ['Performance'],
    component: 'LNDev UI - Theming',
    dueDate: 'Mar 27',
    assignee: { id: 4, avatar: '/avatar4.png' }
  }
]);

const users = ref([
  { id: 1, name: 'Alex Smith', avatar: '/avatar1.png' },
  { id: 2, name: 'Jordan Lee', avatar: '/avatar2.png' },
  { id: 3, name: 'Taylor Kim', avatar: '/avatar3.png' },
  { id: 4, name: 'Morgan Chen', avatar: '/avatar4.png' },
  { id: 5, name: 'Riley Patel', avatar: '/avatar5.png' }
]);

const inProgressTasks = computed(() => 
  tasks.value.filter(task => task.state === 'in-progress')
);

const technicalReviewTasks = computed(() => 
  tasks.value.filter(task => task.state === 'review')
);

const completedTasks = computed(() => 
  tasks.value.filter(task => task.state === 'completed')
);

function resetFilters() {
  filters.value = {
    status: {
      inProgress: true,
      technicalReview: true,
      completed: true
    },
    type: {
      bug: true,
      feature: true,
      improvement: true
    }
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
    <header class="flex justify-between items-center p-4 border-b border-bordercolor text-white">
      <div class="flex items-center gap-4">
        <UButton class="flex gap-3 cursor-pointer items-center" variant="ghost" @click="filterOpen = true">
          <UIcon name="uil:filter" class="text-2xl" />
          <span class="text-base">Filter</span>
        </UButton>
      </div>
      <div class="flex gap-3 items-center">
        <UIcon name="uil:grid" class="text-2xl cursor-pointer text-gray-400" :class="{ 'text-white': displayMode === 'grid' }" @click="displayMode = 'grid'" />
        <UIcon name="uil:list-ul" class="text-2xl cursor-pointer text-gray-400" variant="ghost" :class="{ 'text-white': displayMode === 'list' }" @click="displayMode = 'list'" />
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
          <UButton variant="ghost" class="hover:bg-white/10 p-2 cursor-pointer rounded-xl mr-2">
            <UIcon name="uil:plus" class="text-2xl" />
          </UButton>
        </h1>
        <TasksTaskItem 
          v-for="task in inProgressTasks" 
          :key="task.id" 
          :task="task" 
          :display-mode="displayMode"
          @open-assignee="openAssigneeModal(task)"
        />
      </TaskSection>

      <TaskSection title="Technical Review" :count="technicalReviewTasks.length">
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
          status-color="#8b5cf6"
          @open-assignee="openAssigneeModal(task)"
        />
      </TaskSection>
    </main>

    <UModal v-model="filterOpen">
      <UCard>
        <template #header>
          <div class="text-xl font-bold">Filter Tasks</div>
        </template>
        <div class="space-y-4">
          <UFormGroup label="Status">
            <UCheckbox v-model="filters.status.inProgress" label="In Progress" />
            <UCheckbox v-model="filters.status.technicalReview" label="Technical Review" />
            <UCheckbox v-model="filters.status.completed" label="Completed" />
          </UFormGroup>
          <UFormGroup label="Type">
            <UCheckbox v-model="filters.type.bug" label="Bug" />
            <UCheckbox v-model="filters.type.feature" label="Feature" />
            <UCheckbox v-model="filters.type.improvement" label="Improvement" />
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton variant="ghost" @click="resetFilters">Reset</UButton>
            <UButton color="primary" @click="applyFilters">Apply</UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Assignee Modal -->
    <UModal v-model="assigneeModalOpen">
      <UCard>
        <template #header>
          <div class="text-xl font-bold">Assign Task</div>
          <p class="text-sm text-gray-500">{{ currentTask?.name }}</p>
        </template>
        <div class="space-y-4">
          <div v-for="user in users" :key="user.id" class="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <UAvatar :src="user.avatar" size="sm" />
            <span class="ml-2">{{ user.name }}</span>
          </div>
        </div>
        <template #footer>
          <div class="flex justify-end">
            <UButton color="primary bg-primary" @click="assigneeModalOpen = false">Close</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

