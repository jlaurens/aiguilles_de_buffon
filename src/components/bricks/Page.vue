<script lang="ts" setup>
import Slide from './Slide.vue'
const props = defineProps({
  size: {
    type: String,
    default: '96px',
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
})
</script>

<template>
<Slide :zIndex="props.zIndex">
  <div class="table">
    <div class="row first">
      <div class="title">
        <slot name="title">Put the title here</slot>
      </div>
    </div>
    <div class="row last">
      <div class="main">
        <div class="body">
          <slot name="body">Put the body here</slot>
        </div>
      </div>
    </div>
  </div>
</Slide>
</template>

<style scoped>
.table {
  display: table;
  table-layout: auto;
  height: calc(100% - v-bind('props.size'));
  width: 100%;
}
.main {
  height: 100%;
}
.row {
  display: table-row;
}
.first {
  height: v-bind('props.size') px;
}
.last {
  height: 100%;
}
.body {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.title {
  width:100%;
  font-size: 110%;
  text-shadow: 0px 2px 3px rgba(0,0,0,0.25);
  background-color: rgba(0,0,0,0.05);
  padding-top: 0.5ex;
  padding-bottom: 0.5ex;
}
</style>
