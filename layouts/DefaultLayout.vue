<script setup lang="ts"></script>
<template>
  <div class="flex h-screen overflow-hidden">
    <SidebarArea />
    <div
      class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
    >
      <header class="flex-1">
        <HeaderArea />
      </header>
      <main class="flex-1 bg-primary">
        <div class="mx-auto max-w-screen-4xl p-4 md:p-6 2xl:p-10">
          <slot/>
        </div>
      </main>
    </div>
  </div>
</template>
<style>
</style>