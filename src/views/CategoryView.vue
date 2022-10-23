<template>
  <main>
    <Suspense>
      <ContentPage/>
      <template #fallback>
        <ProgressBar/>
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import ContentPage from '@/components/essentials/ContentPage.vue';
import ProgressBar from '@/components/essentials/ProgressBar.vue';
</script>