<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Slide from './bricks/Slide.vue'
import Wave from './bricks/Wave.vue'

defineProps<{ msg: string }>()

const count = ref(0)
onMounted(() => {
  console.log('MOUNTED', ref('menu'), ref('menu').value, ref('menu').value.style)
  //ref('menu').value.style.zIndex = 1000;
})
</script>

<template>
<Wave :z-index='999'/>
<Slide :z-index='1000'>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
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
