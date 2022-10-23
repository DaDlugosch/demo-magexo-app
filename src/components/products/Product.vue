<template>
  <article class="card w-full bg-base-300 shadow-xl">
    <figure><img :src="product.image.url" :alt="product.name"/></figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.name }}</h2>
      <p>{{ product.price_range.maximum_price.final_price.value }}</p>
    </div>
  </article>
</template>

<script setup>
const { product } = defineProps(['product'])
</script>