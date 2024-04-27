<script setup lang="ts">
import ThemeSelector from "./ThemeSelector.vue";
</script>
<template>
  <header class="flex items-center justify-between px-8 py-2">
    <img
      src="/public/VA-Padel-logo-light.png"
      alt="Playtomic logo"
      class="w-28 object-contain aspect-square"
    />
    <ThemeSelector />
  </header>
</template>
