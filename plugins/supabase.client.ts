

export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient()
  const config = useRuntimeConfig()

  supabase.(
    config.public.SUPABASE_URL,
    config.public.SUPABASE_ANON_KEY
  )

  return {
    provide: {
      supabase,
    },
  }
})
