<script setup lang="ts">
import { onMounted } from 'vue'
const props = defineProps({
  image: String,
})
let path = (image?: string): string => {
  return new URL(`../../assets/${image}`, import.meta.url).href
}
</script>

<template>
<div class="icon" >
<img :src="path(props.image)" />
</div>
</template>

<style scoped>
.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  left: 25%;
  top:  25%;
  width:  50%;
  height: 50%;
}
.icon>img {
  width: 100%;
}
</style>
