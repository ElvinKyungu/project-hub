export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value && !['/login', '/signup'].includes(to.path)) {
    return navigateTo('/login')
  }
})
