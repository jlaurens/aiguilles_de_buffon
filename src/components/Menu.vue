<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Slide from './bricks/Slide.vue'

const show = ref(true)
onMounted(() => {
  //ref('menu').value.style.zIndex = 1000;
})
defineEmits([
  'onSelected'
])
</script>

<template>
<Slide :z-index='1000'>
  <div class="menu">
    <h1 class="menu">Les aiguilles de Buffon</h1>
    <ul class="menu">
      <li class="menu" @click="$emit('onSelected','Game')">Le jeu des aiguilles</li>
      <li class="menu" @click="$emit('onSelected','Pi1')">Combien vaut π ?</li>
      <li class="menu" @click="$emit('onSelected','Barbier1')">Des cercles bizarres</li>
      <li class="menu" @click="$emit('onSelected','Trial')">Tirages</li>
    </ul>
  </div>
</Slide>
</template>

<style scoped>
h1.menu {
  font-size: 133%;
  margin-block-start:0.2em;
  margin-block-end:0.4em;
}
ul.menu {
  font-size: 121%;
  margin-block-start:0.1em;
  margin-block-end:0.1em;
  padding-inline-start: 4em;
  text-align: left;
}
li.menu {
  cursor: pointer;
  padding-left:10px;
  padding-right:10px;
}
li.menu:hover {
  color: rgb(192,0,192);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
