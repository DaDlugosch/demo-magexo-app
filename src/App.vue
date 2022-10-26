<template>
  <Header/>
  <router-view/>
</template>

<script setup>
import Header from '@/components/essentials/parts/Header.vue'

const darkModeObj = window.matchMedia('(prefers-color-scheme: dark)');

const setMode = () => {
  if (darkModeObj.matches) {
    document.documentElement.setAttribute("data-theme", "dark")
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.setAttribute("data-theme", "light")
    document.documentElement.classList.remove('dark')
  }
}

setMode()

darkModeObj.addEventListener('change', () => {
  setMode()
})
</script>
