<script setup lang="ts">
defineProps({
  firstFillOpacity: {
    type: String,
    default: "0",
  },
  secondFillOpacity: {
    type: String,
    default: "0",
  },
  thirdFillOpacity: {
    type: String,
    default: "0",
  },
});
</script>
<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    class="text-muted-foreground size-4"
    aria-label="Level priority"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.5"
      y="8"
      width="3"
      height="6"
      rx="1"
      :fill-opacity="firstFillOpacity"
    />
    <rect
      x="6.5"
      y="5"
      width="3"
      height="9"
      rx="1"
      :fill-opacity="secondFillOpacity"
    />
    <rect
      x="11.5"
      y="2"
      width="3"
      height="12"
      rx="1"
      :fill-opacity="thirdFillOpacity"
    />
  </svg>
</template>
