<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Slide from './bricks/Slide.vue'

defineProps<{ msg: string }>()

const count = ref(0)
onMounted(() => {
  //ref('menu').value.style.zIndex = 1000;
})
const passEvent = () => {
  $emit('changeTitle','Awesome ')
}
</script>

<template>
<Slide :z-index='1000'>
  <h1>{{ msg }}</h1>
  <p>
     <button type="button" @click='passEvent'> Update me</button>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>
  <p>See <code>README.md</code> for more information.</p>
</Slide>
</template>

<style scoped>
.menu {
  z-index: 1000;
}
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
