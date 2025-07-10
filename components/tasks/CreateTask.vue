<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";

const tasksStore = useTasksStore();

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
    class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black/55 z-[9999]"
  >
    <div
      class="container mx-auto bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
    >
      <h1 class="text-2xl font-bold mb-4">Add New Task</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4 flex flex-col">
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

        <UFormGroup label="Status">
          <USelect
            v-model="form.status"
            :options="[
              'Todo',
              'Backlog',
              'In progress',
              'Technical Review',
              'Paused',
              'Completed',
            ]"
          />
        </UFormGroup>

        <UFormGroup label="Type">
          <USelect
            v-model="form.type"
            :options="[
              'Feature',
              'Refactor',
              'Design',
              'Performance',
              'Documentation',
              'Accessibility',
              'Testing',
              'Security',
            ]"
          />
        </UFormGroup>

        <UFormGroup label="Priority">
          <USelect
            v-model="form.priority"
            :options="['No priority', 'Low', 'Medium', 'High', 'Urgent']"
          />
        </UFormGroup>

        <UFormGroup label="Lead (User ID)">
          <UInput
            v-model="form.lead_id"
            placeholder="UUID of the lead user (optional)"
          />
        </UFormGroup>

        <UFormGroup label="Progress">
          <UInput type="number" v-model="form.progress" min="0" max="100" />
        </UFormGroup>

        <UFormGroup label="Target Date">
          <UInput type="date" v-model="form.target_date" />
        </UFormGroup>

        <UButton type="submit" color="secondary" block>Add Task</UButton>

        <p v-if="tasksStore.error" class="text-red-500 mt-2">
          {{ tasksStore.error }}
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
:deep(.u-input input, .u-input textarea) {
  color: #000 !important;
}
</style>
