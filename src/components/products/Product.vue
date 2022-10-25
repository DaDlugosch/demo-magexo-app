<template>
  <article class="card w-full bg-base-200 bordered">
    <figure><img :src="product.image" :alt="product.name"/></figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.name }}</h2>
      <p v-if="!product.hasDiffPrice">You can buy {{ product.name }} just for a {{ product.minPrice }}€</p>
      <p v-else>Price for {{ product.name }} is various, starting at {{ product.minPrice }}€ and top out at
        {{ product.maxPrice }}€</p>
      <div class="mt-3 badge badge-lg ml-auto">{{
          product.hasDiffPrice ? `From ${product.minPrice}` : product.minPrice
        }} €
      </div>
    </div>
  </article>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps(['product'])

const product = computed(() => {
  const minPrice = props.product?.price_range?.minimum_price?.final_price?.value
  const maxPrice = props.product?.price_range?.maximum_price?.final_price?.value
  let hasDiffPrice = false

  if (minPrice !== maxPrice && minPrice !== undefined && maxPrice !== undefined) hasDiffPrice = true

  return {
    name: props.product?.name,
    image: props.product?.image?.url,
    hasDiffPrice,
    minPrice,
    maxPrice
  }
})
</script>