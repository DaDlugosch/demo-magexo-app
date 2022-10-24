<template>
  <nav v-if="categories.length">
    <ul class="inline-block menu menu-compact md:menu-horizontal bg-base-100">
      <li v-for="category in categories" :key="category.uid">
        <CategoryItem :data="category"/>
        <ul v-if="category.children.length" class="bg-base-100 z-50">
          <li v-for="subcategory in category.children" :key="subcategory.uid">
            <CategoryItem :data="{parent_key: category.url_key, ...subcategory}"/>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import CategoryItem from '@/components/categories/CategoryItem.vue';

const {categories} = defineProps(['categories']);
</script>
