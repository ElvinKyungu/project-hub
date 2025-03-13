<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'

const { toggleSidebar } = useSidebarStore()

const items = [
    { label: 'Profile', icon: 'pi pi-user', command: () => { console.log('Profile Clicked'); } },
    { label: 'Settings', icon: 'pi pi-cog', command: () => { console.log('Settings Clicked'); } },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => { console.log('Logout Clicked'); } }
]

const notifications = [
    { label: 'New comment on your post', icon: 'pi pi-comment' },
    { label: 'New follower', icon: 'pi pi-user-plus' },
    { label: 'System update available', icon: 'pi pi-refresh' }
]


</script>

<template>
  <header
    class="sticky top-0 z-999 flex w-full bg-[#222] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
  >
    <div
      class="flex flex-grow items-center justify-between py-5 px-4 shadow-2 md:px-6 2xl:px-11"
    >
      <!-- Logo et bouton menu -->
      <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
        <button
          class="z-99999 block rounded-sm border border-stroke p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          @click="toggleSidebar"
        >
          <span class="pi pi-bars"></span>
        </button>
        <router-link class="block flex-shrink-0 lg:hidden" to="/">
          <img src="" alt="Logo"/>
        </router-link>
      </div>

      <!-- Recherche -->
      <div class="hidden sm:block">
        <form>
          <div class="relative">
            <button class="absolute top-1/2 left-0 -translate-y-1/2">
              <i class="pi pi-search text-gray-400"></i>
            </button>
            <input
              type="text"
              placeholder="Type to search..."
              class="w-full xl:w-125 bg-transparent pr-4 pl-9 focus:outline-none"
            />
          </div>
        </form>
      </div>

      <div class="flex items-center gap-3 2xl:gap-7">
        <Avatar
          image="https://media.licdn.com/dms/image/v2/D4D03AQE3ZDtlH0Vedw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728655288833?e=1734566400&v=beta&t=Mb1_0Vqg8hPQMuMM404Y7D-RgnQCAQaFRdDPjjMPUYk"
          shape="circle"
          @click="$refs.menu?.toggle($event)" 
          class="cursor-pointer "
        />
        <Menu :model="items" popup ref="menu" class="custom-menu"/>
        <Button icon="pi pi-bell" class="p-button-text custom-bell-icon" @click="$refs.notificationMenu?.toggle($event)" />
        <Menu :model="notifications" popup ref="notificationMenu" class="custom-menu" />
      </div>
    </div>
  </header>
</template>
<style>
.custom-menu {
  min-width: 250px;
}
.custom-bell-icon i {
  font-size: 24px; 
}
</style>