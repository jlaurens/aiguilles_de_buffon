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
  <div class="start">
    <div class="center_h">
      <div class="center_v">
        <div class="content">
          <div>Version 1 © 2022 Jérôme Laurens</div>
          <div>Institut de Mathématiques de Bourgogne</div>
          <div>Unité Mixte de Recherche 5584</div>
          <div>CNRS / Université de Bourgogne</div>
          <div>Crédits photographiques: wikipedia</div>
          <div>Polices: LifeSavers, IBMPlexSans, GFSNeohellenic</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.start {
  height:100%;
  font-size: 90%;
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
</style>
