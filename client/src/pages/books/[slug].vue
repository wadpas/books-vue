<template>
  <div>Book</div>
  <div>{{ slug }}</div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  const route = useRoute()

  let slug = ''
  if ('slug' in route.params) slug = route.params?.slug
</script>

<style scoped></style>
