<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { onClickOutside } from '@vueuse/core'

const target = ref(null)
const sidebarStore = useSidebarStore()

onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})

const menuGroups = ref([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'uil:home', to: '/dashboard/' }],
  },
  {
    label: 'Pages',
    icon: 'uil:briefcase',
    to: '/pages',
    items: [
      { label: 'Landing', icon: 'uil:globe', to: '/landing' },
      {
        label: 'Auth',
        icon: 'uil:user',
        items: [
          { label: 'Login', icon: 'uil:sign-in-alt', to: '/auth/login' },
          { label: 'Profile', icon: 'uil:user', to: '/dashboard/profile' },
          { label: 'Access Denied', icon: 'uil:lock', to: '/auth/access' },
          { label: 'List', icon: 'uil:list-ul', to: '/dashboard/product/' },
        ],
      },
      { label: 'Crud', icon: 'uil:edit', to: '/pages/crud' },
      { label: 'Not Found', icon: 'uil:exclamation-circle', to: '/pages/notfound' },
      { label: 'Table', icon: 'uil:table', to: '/pages/table' },
      { label: 'Images', icon: 'uil:image', to: '/pages/images' },
      { label: 'File', icon: 'uil:file-alt', to: '/pages/file' },
    ],
  },
])
</script>

<template>
  <aside
    ref="target"
    class="absolute left-0 top-0 z-sidebar flex h-screen w-80 flex-col overflow-y-hidden bg-gray-900 text-white duration-300 ease-in-out lg:static lg:translate-x-0"
    :class="{ 'translate-x-0': sidebarStore.isSidebarOpen, '-translate-x-full': !sidebarStore.isSidebarOpen }"
  >
    <div class="flex items-center justify-between px-5 py-5">
      <NuxtLink to="/" class="flex items-center gap-2 text-primary text-lg">
        <NuxtImg src="/logo.png" alt="Logo" width="40" height="40" class="h-10" />
        <span>Project Hub</span>
      </NuxtLink>
      <UButton icon="uil:times" variant="ghost" class="lg:hidden" @click="sidebarStore.isSidebarOpen = false" />
    </div>
    <div class="flex flex-col px-5 overflow-y-auto">
      <nav>
        <ul>
          <li v-for="(group, i) in menuGroups" :key="i" class="mb-4">
            <p class="text-sm font-semibold uppercase text-gray-400">{{ group.label }}</p>
            <ul>
              <li v-for="(item, j) in group.items" :key="j" class="py-2 flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded px-3">
                <UIcon :name="item.icon" class="w-5 h-5" />
                <NuxtLink :to="item.to" class="flex-1">{{ item.label }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<style>
.z-sidebar {
  z-index: 999;
}
</style>