<template>
  <ProgressBar v-if="isLoading" class="w-1/2 mx-auto"/>
  <section v-else-if="!isCatEmpty">
    <section class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
      <Product v-for="product in products" :key="product.id" :product="product"/>
    </section>
    <section class="mt-10 text-center">
      <Pagination :active="+route.query.page || 1" :pages="maxPages"/>
    </section>
  </section>
  <InfoAlert v-else>First select a desired category or subcategory.</InfoAlert>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import Product from '@/components/products/Product.vue'
import Pagination from '@/components/essentials/components/Pagination.vue'
import ProgressBar from "@/components/essentials/components/ProgressBar.vue";
import InfoAlert from "@/components/alerts/InfoAlert.vue";

const props = defineProps(['category'])

const products = ref([]);
const maxPages = ref(0);
const isLoading = ref(false)
const isCatEmpty = computed(() => props.category?.length === 0)
const router = useRouter();
const route = useRoute();

// Check if category route exists
if (isCatEmpty.value && Object.values(route.params).length) router.push('/');

const processData = async () => {
  const prodRes = await fetch(`https://api.venia.hosts.sk/api/prd/categories/${props.category[0].uid}/products/${route.query.page || 1}`);
  const {products: {items, page_info}} = await prodRes.json();
  maxPages.value = page_info.total_pages
  products.value = [...items];
}

const loadProducts = async () => {
  if (isCatEmpty.value) return;
  isLoading.value = true
  try {
    await processData()
    isLoading.value = false
  } catch (e) {
    router.push('/')
  }
}

await loadProducts()

watch(
    [() => props.category, () => route.query.page],
    async ([newCat, newQ], [prevCat, prevQ]) => {
      if (newCat !== prevCat || newQ !== prevQ && newQ) {
        await loadProducts()
      }
    })
</script>
