<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Icon from '@/components/bricks/Icon.vue'
const log = (what: any) => {
  console.log(what)
}
</script>

<template>
<div class="toolbar">
  <Icon image="dots.png" @click="log('CLICKED 1')"/>
  <Icon image="logo-uB-filet.png" @click="log('CLICKED 2')"/>
  <Icon image="logo_IMB.png" @click="log('CLICKED 3')"/>
</div>
</template>

<style scoped>
.toolbar {
  z-index: 2000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0px;
  width: 100%;
  bottom: 0px;
  height: 0.16667wh;
}
</style>
