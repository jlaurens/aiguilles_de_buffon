<script setup lang="ts">
import { onMounted } from 'vue'
const props = defineProps({
  image: String,
})
let path = (image?: string): string => {
  console.log()
  return '../../assets/'+props.image
}
</script>

<template>
<img class="icon" :src="path(props.image)" />
</template>

<style scoped>
.icon {
  text-align: center;
}
</style>
