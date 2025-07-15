import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const client = useSupabaseClient()
  const users = ref<Array<{
    id: string
    name: string
    last_name: string
    email: string
    avatar_url: string | null
    avatarUrl: string // ✅ URL finale prête à l’emploi
  }>>([])

  const loading = ref(false)
  const error = ref<string | null>(null)

  // ✅ Générer un avatar fallback avec DiceBear
  const generateAvatarUrl = (seed: string) =>
    `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`

  // 📦 Fetch tous les users une seule fois
  async function fetchUsers() {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await client
        .from('users')
        .select('id, name, last_name, email, avatar_url')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      users.value = (Array.isArray(data) ? data : []).map((u: {
        id: string
        name: string
        last_name: string
        email: string
        avatar_url: string | null
      }) => ({
        ...u,
        // ✅ avatarUrl finalisé ici
        avatarUrl: u.avatar_url || generateAvatarUrl(`${u.name} ${u.last_name}`),
      }))

      console.log("Users loaded:", users.value)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = "Failed to fetch users"
      }
    } finally {
      loading.value = false
    }
  }

  return { users, loading, error, fetchUsers }
})
