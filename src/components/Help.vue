<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import W from './bricks/W.vue'

const help = ref<HTMLElement>()

const $emit = defineEmits([
  'mounted'
])
</script>

<template>
  <div class="help" ref="help">
    <div class="center_h">
      <div class="center_v">
        <div class="content">
          <div class="line"><span class="key">0-7</span><span class="action">Naviguer vers une page</span></div>
          <div class="line"><span class="key">&larr;, &uarr;</span><span class="action">Page précédente</span></div>
          <div class="line"><span class="key">&rarr;, &darr;</span><span class="action">Page suivante</span></div>
          <div class="line"><span class="key">+, -</span><span class="action">Augmenter, diminuer la taille des tirages</span></div>
          <div class="line"><span class="key">espace</span><span class="action">Pause</span></div>
          <div class="line"><span class="key">?</span><span class="action">Cette page</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.help {
  height:100%;
  font-size: 80%;
}
.center_v {
  height:100%;
  display:flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
}
.center_h {
  height:100%;
  width:100%;
  display:flex;
  align-items: left;
  justify-content: space-around;
}
.content {
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.action {
  padding-left:1em;
}
</style>
