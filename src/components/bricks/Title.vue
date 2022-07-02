<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  night: {
    type: Boolean,
    default: false,
  }
})
const backgroundColor = computed(() => {
  return props.night ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.05)'
})
</script>

<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<style scoped>
.title {
  font-family: LifeSaversBold;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  margin-top: 0px;
  color: #304455;
  font-size: 110%;
  text-shadow: 0px 2px 3px rgba(0,0,0,0.25);
  background-color: v-bind('backgroundColor');
  padding-left: 1ex;
  padding-right: 1ex;
  padding-top: 0.5ex;
  padding-bottom: 0.5ex;
}
</style>
