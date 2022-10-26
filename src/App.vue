<template>
  <Header/>
  <router-view/>
</template>

<script setup>
import Header from '@/components/essentials/parts/Header.vue'

if (window.matchMedia) {
  const setMode = () => {
    if (darkModeObj.matches) {
      document.documentElement.setAttribute("data-theme", "dark")
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.setAttribute("data-theme", "light")
      document.documentElement.classList.remove('dark')
    }
  }

  const darkModeObj = window.matchMedia('(prefers-color-scheme: dark)')


  setMode()

  darkModeObj.addEventListener('change', () => {
    setMode()
  })
}
</script>
