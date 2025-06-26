<script setup lang="ts">
import { validateLogin } from '@/utils/authFormValidation'

const { login, errorMessages, loading } = useAuth()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = async () => {
  const error = validateLogin(email.value, password.value)
  if (error) {
    errorMessages.value = error
    return
  }

  await auth.login(email.value, password.value)
  if (!auth.error) {
    await navigateTo('/')
  }
}
</script>

<template>
  <div class="w-full max-w-md space-y-6">
    <div class="text-2xl font-semibold text-gray-800">Welcome back,</div>
    <p class="text-gray-500">Please enter your details</p>

    <AuthProviderLogin />

    <form @submit.prevent="handleLogin">
      <div class="space-y-4 flex flex-col w-full relative">
        <UFormGroup label="Email">
          <UInput v-model="email" size="xl" placeholder="example@email.com" icon="uil:envelope" variant="none" class="w-full bg-transparent text-primary placeholder:text-gray-400 border border-gray-300 rounded-lg" />
        </UFormGroup>

        <UFormGroup label="Password">
          <UInput v-model="password" size="xl" type="password" variant="none" icon="uil:lock" class="w-full bg-transparent text-primary placeholder:text-gray-400 border border-gray-300 rounded-lg" />
        </UFormGroup>
      </div>

      <div class="flex items-center justify-between text-sm mt-5">
        <label class="flex items-center space-x-2">
          <UCheckbox v-model="rememberMe" color="secondary" />
          <span>Remember me</span>
        </label>
        <a href="#" class="text-secondary hover:underline">Forgot Password?</a>
      </div>

      <UButton type="submit" block size="lg" color="secondary" class="mt-5 text-white">Sign in</UButton>
    </form>

    <p class="text-sm text-center">
      Don't have an account?
      <NuxtLink to="/signup" class="hover:underline text-blue-500">Register now</NuxtLink>
    </p>
  </div>
</template>

<style>
:deep(.u-input input) {
  color: #000 !important;
}
</style>