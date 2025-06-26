<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { validateSignup } from '@/utils/authFormValidation'

const name = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const { signup, errorMessage, loading } = useAuth()

const handleSignup = async () => {
  const validationError = validateSignup(email.value, password.value, name.value, lastName.value)
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  await signup(email.value, password.value, name.value, lastName.value)
  if (!errorMessage.value) {
    await navigateTo('/')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-8 bg-white">
    <div class="w-full max-w-md space-y-6">
      <div class="text-2xl font-semibold text-gray-800">Create your account</div>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <UFormGroup label="Prénom">
          <UInput v-model="name" size="xl" placeholder="Gabriel" />
        </UFormGroup>
        <UFormGroup label="Nom">
          <UInput v-model="lastName" size="xl" placeholder="Delattre" />
        </UFormGroup>
        <UFormGroup label="Email">
          <UInput v-model="email" size="xl" placeholder="example@mail.com" type="email" />
        </UFormGroup>
        <UFormGroup label="Mot de passe">
          <UInput v-model="password" size="xl" type="password" />
        </UFormGroup>

        <UButton :loading="loading" block size="lg" color="primary">Créer un compte</UButton>
        <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
      </form>

      <p class="text-sm text-center">
        Déjà inscrit ?
        <NuxtLink to="/login" class="text-blue-500 hover:underline">Connexion</NuxtLink>
      </p>
    </div>
  </div>
</template>
