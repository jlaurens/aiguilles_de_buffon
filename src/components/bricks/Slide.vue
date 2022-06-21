<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({ 
  zIndex: {
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
</script>

<template>
<div
  class="brick-slide"
  :style="style"
>
  <slot></slot>
</div>
</template>

<style scoped>
.brick-slide {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}
</style>
