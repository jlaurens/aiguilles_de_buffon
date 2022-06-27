<script setup lang="ts">
defineEmits([
  'onSelected'
])
</script>

<template>
  <div class="menu">
    <ul class="menu">
      <li class="menu" @click="$emit('onSelected','Game')">Le jeu des aiguilles</li>
      <li class="menu" @click="$emit('onSelected','Pi1')">Combien vaut π ?</li>
      <li class="menu" @click="$emit('onSelected','Barbier1')">Des cercles pas très ronds</li>
      <li class="menu" @click="$emit('onSelected','Trial')">Tirages</li>
    </ul>
  </div>
</template>

<style scoped>
ul.menu {
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
