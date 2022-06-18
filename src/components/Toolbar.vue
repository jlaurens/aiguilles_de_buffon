<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Icon from '@/components/bricks/Icon.vue'
defineEmits(['clicked'])
</script>

<template>
<div class="toolbar">
  <Icon image="menu_dots.png" @click="$emit('clicked','menu')"/>
  <Icon image="logo_IMB.png" @click="$emit('clicked','IMB')"/>
  <Icon image="logo-uB-filet.png" @click="$emit('clicked','uB')"/>
  <Icon image="logo_CNRS.png" @click="$emit('clicked','CNRS')"/>
</div>
</template>

<style scoped>
.toolbar {
  z-index: 10000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0px;
  width: 100%;
  bottom: 10px;
}
</style>
