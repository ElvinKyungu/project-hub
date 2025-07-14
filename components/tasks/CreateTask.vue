<script setup lang="ts">
const tasksStore = useTasksStore();

const activePopup = ref<null | "assign" | "level" | "priority" | "project">(
  null,
);

const openPopup = (popup: typeof activePopup.value) => {
  activePopup.value = popup;
};

const closePopup = () => {
  activePopup.value = null;
};

const form = reactive({
  title: "",
  description: "",
  status: "Todo",
  type: "Feature",
  priority: "No priority",
  lead_id: null,
  progress: 0,
  target_date: "",
});

const handleSubmit = async () => {
  await tasksStore.addTask(form);
  if (!tasksStore.error) {
    await navigateTo("/tasks");
  }
};
</script>
<template>
  <div
    class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black/80 z-[9999]"
  >
    <div
      class="container mx-auto bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
    >
      <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <UIcon name="uil:times" size="24" />
      </button>
      <h1 class="text-2xl font-bold mb-4">Add New Task</h1>

      <form class="space-y-4 flex flex-col" @submit.prevent="handleSubmit">
        <UFormGroup label="Title" class="w-full">
          <UInput
            v-model="form.title"
            class="u-input"
            placeholder="Task title"
            size="xl"
            icon="uil:lock"
            variant="none"
            required
          />
        </UFormGroup>

        <UFormGroup label="Description">
          <UTextarea
            v-model="form.description"
            class="u-input"
            placeholder="Task description"
            size="xl"
            variant="none"
          />
        </UFormGroup>
        <UFormGroup label="actions" class="flex flex-wrap gap-2">
          <UButton class="bg-gray-100" @click="openPopup('level')">
            <UIcon name="uil:plus" />
            <span>In progress</span>
          </UButton>
          <PopupTaskLevelSelector
            v-if="activePopup === 'level'"
            :close="closePopup"
          />
          <UButton class="bg-gray-100" @click="openPopup('priority')">
            <UIcon name="uil:flags" />
            <span>No priority</span>
          </UButton>
          <PopupTaskPrioritySelector
            v-if="activePopup === 'priority'"
            :close="closePopup"
          />
          <UButton class="bg-gray-100" @click="openPopup('project')">
            <UIcon name="uil:check" />
            <span>Project</span>
          </UButton>
          <PopupTaskProjectSelector
            v-if="activePopup === 'project'"
            :close="closePopup"
          />
          <UButton class="bg-gray-100" @click="openPopup('assign')">
            <UIcon name="uil:user" />
            <span>Unassigned</span>
          </UButton>
          <PopupTaskAssignSelect
            v-if="activePopup === 'assign'"
            :close="closePopup"
          />
        </UFormGroup>

        <!-- <UFormGroup label="Target Date">
          <UInput v-model="form.target_date" type="date" class="u-input" variant="none" />
        </UFormGroup> -->

        <div class="flex justify-end">
          <UButton type="submit" color="secondary">Add Task</UButton>
        </div>

        <p v-if="tasksStore.error" class="text-red-500 mt-2">
          {{ tasksStore.error }}
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
:deep(.u-input input, .u-input textarea, .u-input select) {
  color: #000 !important;
}
</style>
