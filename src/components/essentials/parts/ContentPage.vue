<template>
  <CategoryList :categories="categories"/>
  <div class="divider"></div>
  <section class="grid mt-5" :class="[catPathHierarchy.length ? 'grid-cols-6' : 'grid-cols-1']">
    <Breadcrumb v-show="catPathHierarchy.length" class="col-span-5" :paths="catPathHierarchy"/>
    <ModeSwitcher class="justify-self-end"/>
  </section>
  <Products class="mt-10" :category="selCategory"/>
</template>

<script setup>
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import CategoryList from '@/components/categories/CategoryList.vue';
import Products from "@/components/products/Products.vue";
import Breadcrumb from "@/components/essentials/components/Breadcrumb.vue";
import ModeSwitcher from "@/components/essentials/components/ModeSwitcher.vue";

const route = useRoute();

const catRes = await fetch('https://api.venia.hosts.sk/api/prd/categories/all');
const {categoryList: [{children: categories}]} = await catRes.json();

const catPathHierarchy = computed(() => {
  const pathsArr = []
  const cat = categories.find(category => route.params.category === category.url_key)
  if (route.params.category) {
    if (cat) pathsArr.push(cat)
  }
  if (route.params.subcategory) {
    const subCat = cat?.children.find(category => route.params.subcategory === category.url_key)
    if (subCat) pathsArr.push(subCat)
  }
  return pathsArr
})

const selCategory = computed(() => {
  if (!catPathHierarchy.value?.length) return []
  if (!route.params.subcategory) return [catPathHierarchy.value[0]]
  return [catPathHierarchy.value[1]]
})
</script>
