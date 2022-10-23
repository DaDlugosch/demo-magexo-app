<template>
  <CategoryList :categories="categories"/>
  <div class="divider"></div>
  <Products :category="selCategory"/>
</template>

<script setup>
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import CategoryList from '@/components/categories/CategoryList.vue';
import Products from "@/components/products/Products.vue";

const route = useRoute();

const catRes = await fetch('https://api.venia.hosts.sk/api/prd/categories/all');
const {categoryList: [{children: categories}]} = await catRes.json();

const selCategory = computed(() => {
  if (route.params.subcategory) {
    const cat = categories.find(category => route.params.category === category.url_key) ?? {}
    return cat.children?.find(category => route.params.subcategory === category.url_key) ?? {}
  } else return categories.find(category => route.params.category === category.url_key) ?? {}
})
</script>
