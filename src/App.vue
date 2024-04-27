<script setup lang="ts">
import Form from "@/components/Form.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <main class="h-screen bg-zinc-700">
    <Navbar />
    <div class="flex flex-col justify-center items-center">
      <div class="w-full max-w-3xl mx-auto p-4">
        <Form />
      </div>
    </div>
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
