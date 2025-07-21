<script setup lang="ts">
const tasksStore = useTasksStore();

const popupRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)

const { openPopup: openPopupAnimation, closePopup: closePopupAnimation } = usePopupAnimation(popupRef, () => {
  emit("close")
})

const emit = defineEmits(["close"])

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
  await tasksStore.addTask(form)
}

onMounted(() => {
  openPopupAnimation()
})
</script>
<template>
  <div
    ref="wrapperRef"
    class="fixed inset-0 w-full h-screen flex items-center justify-center bg-primary z-[9999]"
    @click="closePopupAnimation"
  >
    <div
      ref="popupRef"
      class="container mx-auto bg-black rounded-lg border border-bordercolor shadow-lg p-6 max-w-lg w-full relative"
      @click.stop
      >
      <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" @click="closePopupAnimation">
        <UIcon name="uil:times" size="24" />
      </button>
      <h1 class="text-2xl font-bold mb-4 text-white">Add New Task</h1>

      <form class="space-y-4 flex flex-col" @submit.prevent="handleSubmit">
        <UFormGroup label="Title" class="w-full">
          <UInput
            v-model="form.title"
            class="u-input border border-bordercolor"
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
            class="u-input border border-bordercolor"
            placeholder="Task description"
            size="xl"
            variant="none"
          />
        </UFormGroup>
        <UFormGroup label="actions" class="flex flex-wrap gap-2">
          <UButton class="bg-gray-100">
            <UIcon name="uil:plus" />
            <span>In progress</span>
          </UButton>
          <PopupTaskLevelSelector
          />
          <UButton class="bg-gray-100" >
            <UIcon name="uil:flags" />
            <span>No priority</span>
          </UButton>
          <PopupTaskPrioritySelector
          />
          <UButton class="bg-gray-100">
            <UIcon name="uil:check" />
            <span>Project</span>
          </UButton>
          <PopupTaskProjectSelector
          />
          <UButton class="bg-gray-100">
            <UIcon name="uil:user" />
            <span>Unassigned</span>
          </UButton>
          <PopupTaskAssignSelect
          />
        </UFormGroup>
        <div class="flex justify-end">
          <UButton type="submit" color="secondary">Add Task</UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
:deep(.u-input input, .u-input textarea, .u-input select) {
  color: #fff !important;
}
</style>
