<template>
  <router-link :to="url" :class="{ 'active': isActive }" @click="$emit('routeChange')">{{
    data.name
  }}</router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const { data } = defineProps(['data']);
const url = computed(() => data.parent_key ? `/${data.parent_key}/${data.url_key}` : `/${data.url_key}`);
const route = useRoute();
const isActive = computed(() => Object.values(route.params).includes(data.url_key));
</script>

