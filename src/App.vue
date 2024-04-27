<script setup lang="ts">
import Form from "@/components/Form.vue";
import Navbar from "@/components/Navbar.vue";
import { useColorMode } from "@vueuse/core";

const mode = useColorMode();
</script>

<template>
  <main
    :class="[
      'h-screen',
      mode === 'dark' ? 'bg-black text-white' : 'bg-white text-black',
    ]"
  >
    <Navbar />
    <div class="flex flex-col items-center justify-center p-0 sm:px-20 gap-y-8">
      <h1 class="text-2xl sm:text-4xl font-bold tracking-wider text-center">
        Welcome, Please Take Time To Fill Out These Questions...
      </h1>
      <Form />
    </div>
  </main>
</template>
