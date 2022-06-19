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
      <li class="menu" @click="$emit('onSelected','Pi')">π</li>
    </ul>
    <button @click="show = !show">Toggle</button>
    <Transition name="fade" >
      <p v-if="show">hello</p>
    </Transition>
  </div>
</Slide>
</template>

<style scoped>
h1.menu {
  font-size: 125%;
  margin-block-start:0.2em;
  margin-block-end:0.4em;
}
ul.menu {
  font-size: 1.5em;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
