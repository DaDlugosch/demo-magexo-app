<template>
  <nav>
    <div v-if="!isDesktop" class="grid grid-flow-col auto-cols-max justify-center">
      <label class="btn btn-circle swap swap-rotate mx-auto">
        <input v-model="isMenuOpen" type="checkbox"/>

        <!-- hamburger icon -->
        <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
             viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
        </svg>

        <!-- close icon -->
        <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
             viewBox="0 0 512 512">
          <polygon
              points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/>
        </svg>

      </label>
    </div>

    <ul v-show="isMenuOpen" class="inline-block menu menu-compact md:menu-horizontal bg-base-100">
      <li v-for="category in categories" :key="category.uid">
        <CategoryItem :data="category" @route-change="closeMobMenu"/>
        <ul v-if="category.children.length" class="bg-base-100 z-50">
          <li v-for="subcategory in category.children" :key="subcategory.uid">
            <CategoryItem :data="{parent_key: category.url_key, ...subcategory}" @route-change="closeMobMenu"/>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {ref} from 'vue'
import CategoryItem from '@/components/categories/CategoryItem.vue';

const isDesktop = ref(null)
const isMenuOpen = ref(null)

const {categories} = defineProps(['categories']);
if (window.matchMedia) {
  const breakpointMedia = window.matchMedia('(min-width: 768px)')

  isDesktop.value = isMenuOpen.value = breakpointMedia.matches

  breakpointMedia.addEventListener('change', (e) => {
    isMenuOpen.value = isDesktop.value = e.matches
  })
}

const closeMobMenu = () => !isDesktop.value ? isMenuOpen.value = false : isMenuOpen.value = true
</script>
