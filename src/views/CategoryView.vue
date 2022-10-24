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
import ContentPage from '@/components/essentials/parts/ContentPage.vue';
import ProgressBar from '@/components/essentials/components/ProgressBar.vue';
</script>