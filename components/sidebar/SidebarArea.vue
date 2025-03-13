<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
const target = ref(null)

const sidebarStore = useSidebarStore();

onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false;
})

const menuGroups = ref([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard/' }],
  },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-briefcase',
    to: '/pages',
    items: [
      {
        label: 'Landing',
        icon: 'pi pi-fw pi-globe',
        to: '/landing',
      },
      {
        label: 'Auth',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            to: '/auth/login',
          },
          {
            label: 'profile',
            icon: 'pi pi-fw pi-user',
            to: '/dashboard/profile',
          },
          {
            label: 'Access Denied',
            icon: 'pi pi-fw pi-lock',
            to: '/auth/access',
          },
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            to: '/dashboard/product/',
          },
        ],
      },
      {
        label: 'Crud',
        icon: 'pi pi-fw pi-pencil',
        to: '/pages/crud',
      },
      {
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/pages/notfound',
      },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        to: '/pages/empty',
      },
      {
        label: 'Github',
        icon: 'pi pi-fw pi-github',
        to: '/pages/empty',
      },
      {
        label: 'Table',
        icon: 'pi pi-fw pi-table',
        to: '/pages/empty',
      },
      {
        label: 'Images',
        icon: 'pi pi-fw pi-image',
        to: '/pages/empty',
      },
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        to: '/pages/empty',
      },
      {
        label: 'Timeline',
        icon: 'pi pi-fw pi-calendar',
        to: '/pages/empty',
      },
      {
        label: 'Free block',
        icon: 'pi pi-fw pi-eye',
        to: '/pages/empty',
      },
      {
        label: 'All block',
        icon: 'pi pi-fw pi-globe',
        to: '/pages/empty',
      },
      {
        label: 'Figma',
        icon: 'pi pi-fw pi-pencil',
        to: '/pages/empty',
      },
    ],
  },
])
</script>

<template>
  <aside
    class="absolute left-0 top-0 z-sidebar flex h-screen w-80 flex-col overflow-y-hidden bg-[#222] duration-300 ease-linear lg:static lg:translate-x-0"
    :class="{
      'translate-x-0': sidebarStore.isSidebarOpen,
      '-translate-x-full': !sidebarStore.isSidebarOpen,
    }"
    ref="target"
  >
    <div
      class="flex relative z-40 items-center justify-between gap-2 px-5 pt-5 lg:pt-6"
    >
      <router-link to="/" class="text-4xl text-primary lg:text-center">
        <i class="pi pi-bolt text-4xl"></i> SaaS BOLT
      </router-link>
      <button
        class="block lg:hidden"
        @click="sidebarStore.isSidebarOpen = false"
      >
        <i class="pi pi-arrow-left"></i>
      </button>
    </div>
    <div
      class="custom-scrollbar flex relative z-40 flex-col px-3 lg:mt-9 lg:px-5 overflow-y-auto duration-300 ease-linear"
    >
      <nav class="">
        <ul class="layout-menu">
          <div v-for="(item, i) in menuGroups" :key="item.label">
            <SidebarAppMenuItem :item="item" :index="i" />
          </div>
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