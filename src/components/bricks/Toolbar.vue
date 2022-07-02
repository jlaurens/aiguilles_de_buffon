<script setup lang="ts">
const props = defineProps({
  height: {
    type: Number,
    default: 96,
  },
  padding: {
    type: Number,
    default: 10,
  },
  zIndex: {
    type: Number,
    default: 10000,
  },
})
</script>

<template>
<div class="toolbar">
  <div class="horizontal">
    <slot></slot>
  </div>
</div>
</template>
<style scoped>
.toolbar {
  z-index: v-bind('props.zIndex');
  display: block;
  position: absolute;
  left: 0px;
  width: v-bind('"calc(100% - "+2*props.padding+"px)"');
  bottom: 0px;
  margin: v-bind('props.padding+"px"');
  height: v-bind('props.height+"px"');
}
.horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
</style>
