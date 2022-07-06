<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Point } from '@mathigon/euclid'

const props = defineProps({
  size: {
    type: Number,
    default: 96,
  },
  top: {
    type: Number,
    default: 0,
  },
  left: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: 'hsl(' + Math.random() * 360 + ',66%,50%)',
  },
  progress: {
    type: Number,
    default: 0,
  },
})
const progressBar = ref<HTMLElement>()
const viewBox = computed(() => {
  return '0 0 '+ props.size + ' ' + props.size + ''
})
const top = computed(() => {
  return '0px'
})
const left = computed(() => {
  return '0px'
})
const width = computed(() => {
  return props.size + 'px'
})
const height = computed(() => {
  return props.size + 'px'
})
const d = computed(() => {
  const R = props.size / 4
  const ans = 'M ' + (props.size / 2) +'px '+ (props.size / 4) + 'px '
    + ' A '+R+' '+R+' 0 0 0 ' + (props.size / 2) +'px '+ (props.size / 4) + 'px '
  console.log('DEFINITION', ans)
  return ans
})
const d1 = computed(() => {
  return (theta: number) => {
    const n = Math.floor(theta / 2 / Math.PI)
    theta -= 2 * n * Math.PI
    const R = props.size / 4
    const C = new Point(2 * R, 2 * R)
    const J = new Point(0, -R)
    const N = C.add(J)
    const M = C.add(J.rotate(theta))
    return 'M '+ N.x +' '+ N.y +
    ' A '+ R +' '+ R +
    ' 0 '+ (theta>Math.PI ? 1 : 0) +' 1 '+ M.x +' '+ M.y +
    ' L '+ C.x +' '+ C.y +
    ' Z'
  }
})
</script>
<template>
  <svg ref="progressBar" version="1.1" :viewBox="viewBox" class="progress-bar">
    <circle class="circle" :r="props.size/4" :cx="props.size/2" :cy="props.size/2" />
    <path id="arc" :d="d1(props.progress)" class="path"></path>
  </svg>
</template>

<style scoped>
.progress-bar {
  position: absolute;
  top: v-bind(top);
  left: v-bind(left);
  width: v-bind(width);
  height: v-bind(height);
}
.circle {
  stroke: transparent;
  fill: v-bind('props.color');
  opacity: 0.05;
}
.path {
  stroke: transparent;
  fill: v-bind('props.color');
  opacity: 0.1;
}
</style>