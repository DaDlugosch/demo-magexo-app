<template>
  <Header />
  <router-view/>
</template>

<script setup>
import Header from '@/components/essentials/parts/Header.vue'

// Check if Daisy color scheme is set to dark
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.toggle('dark')
</script>
