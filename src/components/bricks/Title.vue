<script setup lang="ts">
</script>

<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<style scoped>
.title {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  margin-top: 0px;
  color: #304455;
  font-size: 110%;
  text-shadow: 0px 2px 3px rgba(0,0,0,0.25);
  background-color: rgba(0,0,0,0.05);
  padding-left: 1ex;
  padding-right: 1ex;
  padding-top: 0.5ex;
  padding-bottom: 0.5ex;
}
</style>
