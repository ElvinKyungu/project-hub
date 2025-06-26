<script setup lang="ts">

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
</script>
<template>
  <div class="min-h-screen flex">
    <div class="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md space-y-6">
        <div class="text-2xl font-semibold text-gray-800">Welcome back,</div>
        <p class="text-gray-500">Please enter your details</p>

        <UButton block size="lg" color="secondary" variant="outline">
          <template #leading>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" />
          </template>
          Sign in with Google
        </UButton>

        <div class="flex items-center space-x-4">
          <div class="h-px bg-gray-300 flex-1"/>
          <span class="text-xs text-gray-400">or sign in with email</span>
          <div class="h-px bg-gray-300 flex-1"/>
        </div>

        <form>
          <div class="space-y-4 flex flex-col w-full relative">
          <UFormGroup label="Email">
            <UInput v-model="email" size="xl" placeholder="emmatayor7@example.com" color="secondary" icon="uil:envelope" variant="outline" class="w-full text-primary" style="background-color: transparent; color: #222"  type="email" />
          </UFormGroup>

          <UFormGroup label="Password">
            <UInput v-model="password" size="xl" variant="outline" class="w-full text-primary" color="secondary" style="background-color: transparent; color: #222" icon="uil:lock" type="password" />
          </UFormGroup>
        </div>

        <div class="flex items-center justify-between text-sm mt-5">
          <label class="flex items-center space-x-2">
            <UCheckbox v-model="rememberMe" color="secondary" class="text-white" />
            <span>Remember me</span>
          </label>
          <a href="#" class="text-secondary hover:underline">Forgot Password?</a>
        </div>

        <UButton block size="lg" color="secondary" class="mt-5 text-white">Sign in</UButton>
        </form>

        <p class="text-sm text-center">
          Already have an account?
          <a href="#" class="hover:underline text-blue-500">Register now</a>
        </p>
      </div>
    </div>

    <div
      class="hidden md:flex w-1/2 flex-col justify-center items-center text-white p-12 relative"
      :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1517196084897-498e0abd7c2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover' }"
    >
      <div class="absolute inset-0 bg-black/30"/>

      <div class="relative z-10 space-y-6 max-w-xs">
        <div class="bg-white/20 backdrop-blur-md p-4 rounded-xl">
          <div class="text-sm font-medium">Engagement</div>
          <div class="text-lg font-semibold">+46%</div>
        </div>

        <div class="bg-white text-gray-900 p-4 rounded-xl">
          <p class="text-sm">“Beyond UI is surprisingly handy for keeping all my business stuff in one place”</p>
          <div class="mt-2 flex items-center space-x-2">
            <UAvatar src="/images/gab.jpg" />
            <div>
              <div class="text-xs font-semibold">Gabriel Delattre</div>
              <div class="text-xs text-gray-500">VP Engineer</div>
            </div>
          </div>
        </div>

        <div class="bg-white/20 backdrop-blur-md p-4 rounded-xl">
          <div class="text-sm font-medium">Growth</div>
          <div class="text-lg font-semibold">+23%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:deep(.u-input) {
  background-color: transparent !important;
}
:deep(.u-input input) {
  background-color: transparent !important;
}
</style>