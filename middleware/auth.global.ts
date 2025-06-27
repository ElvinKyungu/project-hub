export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  const client = useSupabaseClient()
  const {
    data: { session },
  } = await client.auth.getSession()

  if (!session && !['/login', '/signup'].includes(to.path)) {
    return navigateTo('/login')
  }
})
