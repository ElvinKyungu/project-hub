<script setup lang="ts">
import { ref } from "vue";

const taskName = ref("");
const taskDescription = ref("");
const taskAssignee = ref(null);
const users = ref([
  { id: 1, name: "Elvin.code" },
  { id: 2, name: "Gabriel.delattre" },
  { id: 3, name: "Deb.yambenu" },
  { id: 4, name: "Bienfaits.shomari" },
  { id: 5, name: "Astrid.code" },
]);

const createTask = () => {
  // Logic to create a new task
  console.log("Create new task");
};
</script>
<template>
  <div class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black/55 text-white z-[9999]">
    <div class="container mx-auto bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Create New Task</h2>
      <form @submit.prevent="createTask">
        <div class="space-y-4 flex flex-col">
          <UFormGroup label="Task Name">
            <UInput v-model="taskName" size="xl" placeholder="Enter task name" color="secondary" />
          </UFormGroup>
          <UFormGroup label="Description">
            <UTextarea v-model="taskDescription" size="xl" placeholder="Enter task description" color="secondary" />
          </UFormGroup>
          <UFormGroup label="Assignee">
            <USelect v-model="taskAssignee" size="xl" placeholder="Select assignee" color="secondary">
              <option v-for="user in users" :key="user.id" :value="user.id" class="flex flex-col space-y-3">
                {{ user.name }}
              </option>
            </USelect>
          </UFormGroup>
        </div>
      </form>
    </div>
  </div>
</template>