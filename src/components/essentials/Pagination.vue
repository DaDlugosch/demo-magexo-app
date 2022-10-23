<template>
  <div class="btn-group">
    <button v-for="page in pages" :key="page" class="btn" :class="{ 'btn-active': page === active }" @click="setPage">
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const {pages, active} = defineProps(['pages', 'active']);
const router = useRouter();
const setPage = (e) => {
  router.push({query: {page: e.target.innerText}})
}
</script>