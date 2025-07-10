// stores/tasks.ts
import { defineStore } from "pinia";
import { useSupabaseClient } from "#imports";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status:
    | "Todo"
    | "Backlog"
    | "In progress"
    | "Technical Review"
    | "Paused"
    | "Completed";
  type:
    | "Feature"
    | "Refactor"
    | "Design"
    | "Performance"
    | "Documentation"
    | "Accessibility"
    | "Testing"
    | "Security";
  priority: "No priority" | "Low" | "Medium" | "High" | "Urgent";
  lead_id: string | null;
  progress: number;
  target_date: string | null;
  created_at: string;
}

export const useTasksStore = defineStore("tasks", () => {
  const client = useSupabaseClient();
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    loading.value = true;
    error.value = null;
    const { data, error: fetchError } = await client
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (fetchError) error.value = fetchError.message;
    else tasks.value = data as Task[];
    loading.value = false;
  };

  // Add a task
  const addTask = async (task: Partial<Task>) => {
    loading.value = true;
    error.value = null;
    const { error: insertError } = await client.from("tasks").insert([task]);
    if (insertError) error.value = insertError.message;
    else await fetchTasks();
    loading.value = false;
  };

  // Update a task
  const updateTask = async (id: string, updates: Partial<Task>) => {
    loading.value = true;
    error.value = null;
    const { error: updateError } = await client
      .from("tasks")
      .update(updates)
      .eq("id", id);
    if (updateError) error.value = updateError.message;
    else await fetchTasks();
    loading.value = false;
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    loading.value = true;
    error.value = null;
    const { error: deleteError } = await client
      .from("tasks")
      .delete()
      .eq("id", id);
    if (deleteError) error.value = deleteError.message;
    else await fetchTasks();
    loading.value = false;
  };

  return { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask };
});
