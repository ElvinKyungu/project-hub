export default defineNuxtRouteMiddleware(async (to) => {
  // ✅ Ne rien faire sur les routes publiques
  if (["/login", "/signup"].includes(to.path)) return;

  // ✅ S'assurer qu'on est côté client
  if (import.meta.server) return;

  const client = useSupabaseClient();
  const {
    data: { session },
  } = await client.auth.getSession();

  // ✅ Rediriger si aucune session ET la route est protégée
  if (!session) {
    return navigateTo("/login");
  }
});
