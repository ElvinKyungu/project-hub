import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const client = useSupabaseClient()
  const users = ref<Array<{ id: string; name: string; last_name: string; email: string; avatar_url: string }>>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all users
  async function fetchUsers() {
    loading.value = true
    error.value = null

    const { data, error: fetchError } = await client
      .from('users')
      .select('id, name, last_name, email, avatar_url')
      .order('created_at', { ascending: false })
      console.log('Fetching users:', data)
    if (fetchError) {
      error.value = fetchError.message
    } else {
      users.value = data || []
    }

    loading.value = false
  }

  return { users, loading, error, fetchUsers }
})
