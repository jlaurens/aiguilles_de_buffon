<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  items: {
    type: Array<[String, String]>,
    default: [['FOO', 'BAR']],
  }
})
defineEmits([
  'onSelected'
])
const color = ref('')
onMounted(() => {
  color.value  = 'hsl('+(360*Math.random())+',66%,50%)'
})
</script>

<template>
  <div class="center_h">
    <div class="center_v">
      <div class="menu">
        <div v-for="item in props.items" @click="$emit('onSelected',item[0])" class="item">{{item[1]}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.menu {
  cursor: pointer;
  padding-left:10px;
  padding-right:10px;
  text-align: left;
}
.item {
  padding-left: 1.5em;
}
.item:before {
  content: '>';
  position: relative;
  left: -1em;  /* place the SVG at the start of the padding */
  width: 1em;
}
.item:hover {
  color: v-bind('color');
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.bullet {
  z-index: 2000;
}
</style>
