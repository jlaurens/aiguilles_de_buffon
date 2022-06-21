<script setup lang="ts">
import Slide from './bricks/Slide.vue'
const props = defineProps({ 
  bgName: String,
  zIndex: {
    type: Number,
    default: 2000,
  },
})
</script>

<template>
<Slide
  :z-index="props.zIndex"
>
<div ref="l" class="l">
  <div ref="l1" class="l1">Une aiguille tombe sur un plancher :</div>
  <div ref="l2" class="l2">si elle arrive sur deux lattes, on gagne et</div>
  <div ref="l3" class="l3">si elle arrive sur une seule latte, on perd.</div>
  <div rel="l4" class="l4">
    <div>GAGNÉ</div>
    <div>PERDU</div>
  </div>
  <div ref="l5" class="l5">Combien a-t-on de chance de gagner ?</div>
</div>
</Slide>
</template>

<style scoped>
</style>
