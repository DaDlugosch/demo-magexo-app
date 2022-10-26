<template>
  <Header/>
  <router-view/>
</template>

<script setup>
import Header from '@/components/essentials/parts/Header.vue'

window.matchMedia('(prefers-color-scheme: dark)')?.matches && document.documentElement.classList.toggle('dark')
</script>
