<script setup lang="ts">
import DefaultLayout from '~/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"
    >
      <!-- <DataStatsOne /> -->
    </div>
    <h2 class="mt-14 text-3xl mb-5">Statistic</h2>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 xl:col-span-8">
        <!-- <ChartLine /> -->
      </div>
      <div class="col-span-12 xl:col-span-4">
        <!-- <ChartCircle /> -->
      </div>
    </div>
  </DefaultLayout>
</template>