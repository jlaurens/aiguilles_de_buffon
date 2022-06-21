<script setup lang="ts">
import Slide from './Slide.vue'
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
  :bg-name="'./QRCode-'+props.bgName+'.png'"
  :z-index="props.zIndex"
  bg-size="contain"
><slot></slot></Slide>
</template>

<style scoped>
</style>
