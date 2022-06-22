<script setup lang="ts">
import Page from './bricks/Page.vue'
const props = defineProps({ 
  bgName: String,
  zIndex: {
    type: Number,
    default: 2000,
  },
})
</script>

<template>
<Page
  :z-index="props.zIndex"
>
  <template v-slot:title>
    Des cercles bizarres...
  </template>
  <template v-slot:body>
    Un cercle peut tourner entre deux lignes parallèles
  </template>
</Page>
</template>

<style scoped>
</style>
