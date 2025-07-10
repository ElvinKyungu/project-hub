<script setup lang="ts">
import { gsap } from "gsap";
import type { User } from "@/types/tasks";

const props = defineProps({
  modelValue: {
    type: Number as PropType<number | null>,
    default: null,
  },
  users: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
  triggerElement: {
    type: Object as PropType<{ $el: HTMLElement }>,
    default: null,
  },
  
});

const emit = defineEmits(["update:modelValue", "close"]);

const popup = ref<HTMLElement | null>(null);
const search = ref("");
const isOpen = ref(false);

const selected = ref(props.modelValue);

const getAvatarUrl = (seed: string) => {
  return `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`;
};

const filtered = computed(() =>
  props.users.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const selectLevel = (level: any) => {
  selected.value = level;
  gsap.to(popup.value, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      emit("update:modelValue", level);
      emit("close");
    },
  });
};

onMounted(() => {
  isOpen.value = true;
  console.log(props.modelValue, "Model Value");
  console.log(props.users, "Users");
  gsap.from(popup.value, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: "power2.out",
  });
});
watch(
  () => props.modelValue,
  (val) => {
    selected.value = val;
  },
);
watch(filtered, (val) => {
  console.log("Filtered users:", val);
});
onClickOutside(popup, () => {
  emit("close");
});
</script>

<template>
  <div
    ref="popup"
    class="absolute items-center gap-2 bg-primary border border-b border-bordercolor rounded-lg shadow-lg p-3 z-[999] w-64 top-10"
  >
    <div>
      <div class="flex flex-col gap-2 mb-3">
        <h2 class="text-sm text-left font-medium">Assign to...</h2>
        <UInput
          v-model="search"
          trailing-icon="uil:search"
          placeholder="Search users..."
          size="md"
          class="flex-1 w-full"
        />
      </div>

      <div class="space-y-1 max-h-64 overflow-y-auto">
        <button
          v-for="item in filtered"
          :key="item.id"
          class="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-800 cursor-pointer text-sm transition"
          @click="selectLevel(item)"
        >
          <div class="flex items-center gap-3">
            <img
              :src="getAvatarUrl(item.name)"
              class="w-8 h-8 rounded-full"
              :alt="item.name"
            />
            <span>{{ item.name }}</span>
          </div>
          <div class="flex items-center gap-1">
            <UIcon v-if="selected?.id === item.id" name="uil:check" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
