<script setup lang="ts">
import Slide from './Slide.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
const props = defineProps({ 
  zIndex: {
    type: Number,
    default: 0,
  },
})
const w = ref(0), h = ref(0)
const resizeListener = () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
}
onMounted(() => {
  window.addEventListener('resize', resizeListener)
  resizeListener()
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeListener)
})
const viewBox = computed(() => {
  return "0 0 "+w.value+" "+h.value
})
</script>

<template>
<Slide :z-index="zIndex">
<div class="svg-container">
<svg version="1.1" :viewBox="viewBox" class="svg-content">
<circle
  fill="#F7941E"
  stroke="#231F20"
  stroke-width="10"
  stroke-miterlimit="10"
  cx="250"
  cy="250"
  r="200"
  opacity="0.6"
/>
</svg>
</div>
</Slide>
</template>

<style scoped>
.svg-container {
  display: block;
  position: absolute;
  width: 100%;
  padding-bottom: 100%;
  vertical-align: middle;
  overflow: hidden;
}
.svg-content {
display: inline-block;
position: absolute;
top: 0;
left: 0;
}
</style>
