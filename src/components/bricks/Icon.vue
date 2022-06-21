<script setup lang="ts">
const props = defineProps({
  image: String,
})
// let path = (image?: string): string => {
//   return new URL('../../assets/' + image, import.meta.url).href
// }
let path = (image?: string): string => {
  var ans
  try {
    ans = new URL('/' + image, import.meta.url).href
  } catch(e) {
    ans = './' + image
  }
  console.log('ICON', ans)
  return ans
}
</script>

<template>
<div class="icon" >
<img :src="path(props.image)" />
</div>
</template>

<style scoped>
.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width:  96px;
  height: 96px;
  padding: 0px 10px;
}
.icon>img {
  width: 100%;
}
</style>
