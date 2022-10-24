<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="(path, index) in paths" :key="path.uid">
        <router-link :to="'/' + path.url_key" v-if="index < paths.length - 1">{{ path.name }}</router-link>
        <span v-else class="font-bold">{{ path.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps(['paths']);
const paths = computed(() => [
  {
    uid: 'home',
    name: 'Home',
    url_key: 'home'
  }, ...props.paths
]);
</script>