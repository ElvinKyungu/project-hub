// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@vueuse/nuxt",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
  ],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: [],
      exclude: ["/signup"],
      saveRedirectToCookie: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
