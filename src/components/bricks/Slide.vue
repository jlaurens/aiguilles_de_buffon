<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({ 
  zIndex: {
    type: Number,
    default: 0,
  },
  hPadding: {
    type: Number,
    default: 0,
  },
  vPadding: {
    type: Number,
    default: 0,
  },
  bgName: String,
  bgSize: {
    type: String,
    default: 'cover',
  }
})
const style = computed(() => {
  return props.bgName
    ? {
      background: 'url('+props.bgName+')',
      backgroundPosition: 'center',
      backgroundSize: props.bgSize,
      backgroundRepeat: 'no-repeat',
      zIndex: props.zIndex,
    } : {
      zIndex: props.zIndex,
    }
})
const vPadding = computed(() =>{
  return props.vPadding+'px'
})
const hPadding = computed(() =>{
  return props.hPadding+'px'
})
</script>

<template>
  <div class="slide" :style="style">
    <div class="slide-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.slide {
  position: absolute;
  top: v-bind('vPadding');
  left: v-bind('hPadding');
  bottom: v-bind('vPadding');
  right:  v-bind('hPadding');
}
.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
