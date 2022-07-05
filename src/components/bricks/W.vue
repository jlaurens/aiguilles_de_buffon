<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const W = ref<HTMLElement>()
const target = () => {
  return W.value!
}
const $emits = defineEmits([ 'target' ])
const color = ref('hsl('+(360 * Math.random())+',66%,50%)')
onMounted(() => {
  $emits('target', target)
})
</script>
<template>
<span ref="W" class="hidden"><slot></slot></span>
</template>

<style scoped>
.hidden {
  opacity: 0;
  color: v-bind('color');
}
</style>