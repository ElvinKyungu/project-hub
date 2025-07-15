// stores/tasks.ts
import { defineStore } from "pinia"
import type { Task } from "@/types/tasks"

export const useTasksStore = defineStore("tasks", () => {
  const client = useSupabaseClient()
  const usersStore = useUsersStore()
  const { handleError } = useErrorHandler("Tasks Store")

  const tasks = ref<Task[]>([])
  const loading = ref(false)

  const enrichTasks = (rawTasks: any[]): Task[] =>
    rawTasks.map((t) => ({
      ...t,
      assignee: usersStore.users.find((u) => u.id === t.lead_id) || null,
    }))

  const fetchTasks = async () => {
    loading.value = true
    try {
      const { data, error } = await client
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      tasks.value = enrichTasks(data || [])
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const addTask = async (task: Partial<Task>) => {
    loading.value = true
    try {
      const { error } = await client.from("tasks").insert([task])
      if (error) throw error
      await fetchTasks()
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    loading.value = true
    try {
      const { error } = await client.from("tasks").update(updates).eq("id", id)
      if (error) throw error
      await fetchTasks()
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (id: string) => {
    loading.value = true
    try {
      const { error } = await client.from("tasks").delete().eq("id", id)
      if (error) throw error
      await fetchTasks()
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  return { tasks, loading, fetchTasks, addTask, updateTask, deleteTask }
})
