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
const seed1 = {
  x: Math.random(),
  y: Math.random(),
  h: Math.random() * 360,
}
const seed2 = {
  x: Math.random(),
  y: Math.random(),
  h: Math.random() * 360,
}
const cx1 = computed(() => {
  return seed1.x * w.value
})
const cy1 = computed(() => {
  return seed1.y * h.value
})
const cx2 = computed(() => {
  return seed2.x * w.value
})
const cy2 = computed(() => {
  return seed2.y * h.value
})
const resizeListener = () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
}
var pause = false
var start1 = Number.MAX_VALUE
const ellapsed1 = ref(0)
const r1 = computed(() => {
  return ellapsed1.value * window.innerHeight/40000
})
const color1 = computed(() => {
  const h = (2*r1.value+seed1.h)%360
  return 'hsl('
    + (isNaN(h)?'0':h)
    +',66%,50%)'
})
var start2 = Number.MAX_VALUE
const ellapsed2 = ref(0)
const r2 = computed(() => {
  return ellapsed2.value * window.innerHeight/40000
})
const color2 = computed(() => {
  const h = (3*r2.value+seed2.h)%360
  return 'hsl('
    + (isNaN(h)?'0':h)
    +',66%,50%)'
})
const next_step = () => {
  ellapsed1.value = Date.now() - start1
  ellapsed2.value = Date.now() - start2
  if (!pause) {
    setTimeout(next_step, 50);
  }
}
onMounted(() => {
  window.addEventListener('resize', resizeListener)
  resizeListener()
  if (!pause) {
    setTimeout(() => {
      start1 = Date.now()
      next_step()
      setTimeout(() => {
        start2 = Date.now()
      }, 2000);
    }, 2000);
  }
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
<rect
  ref = "root"
  :width="w"
  :height="h"
  fill="white" />
<circle
  fill-opacity="0"
  :stroke="color1"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx1"
  :cy="cy1"
  :r="Math.max(r1,0)"
  opacity="0.1"
/>
<circle
  fill-opacity="0"
  :stroke="color1"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx1"
  :cy="cy1"
  :r="Math.max(r1-15,0)"
  opacity="0.075"
/>
<circle
  fill-opacity="0"
  :stroke="color1"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx1"
  :cy="cy1"
  :r="Math.max(r1-30,0)"
  opacity="0.0375"
/>
<circle
  fill-opacity="0"
  :stroke="color2"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx2"
  :cy="cy2"
  :r="Math.max(r2,0)"
  opacity="0.1"
/>
<circle
  fill-opacity="0"
  :stroke="color2"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx2"
  :cy="cy2"
  :r="Math.max(r2-15,0)"
  opacity="0.075"
/>
<circle
  fill-opacity="0"
  :stroke="color2"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx2"
  :cy="cy2"
  :r="Math.max(r2-30,0)"
  opacity="0.0375"
/>
</svg>
</div>
<slot></slot>
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
