<template>
  <progress class="progress block" :class="classes"></progress>
</template>

<script setup>
const { classes } = defineProps(['classes'])
</script>