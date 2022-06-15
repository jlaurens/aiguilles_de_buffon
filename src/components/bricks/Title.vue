<script setup lang="ts">
</script>

<template>
<div ref="title_main" class="title_main">
  <slot></slot>
</div>
</template>

<style scoped>
.title_main {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  margin-top: 0px;
  padding: 2px 4px;
  color: #304455;
  background-color: rgba(239, 239, 239, 0.9);
}
</style>
