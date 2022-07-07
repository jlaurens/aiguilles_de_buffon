<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { gsap, Power1 } from 'gsap';
const props = defineProps({
  autoStart: {
    type: Boolean,
    default: false,
  }
})
const start = ref<HTMLElement>()
const content = ref<HTMLElement>()
const A1 = ref<HTMLElement>()
const A2 = ref<HTMLElement>()
const A3 = ref<HTMLElement>()
const A4 = ref<HTMLElement>()
const timeline = (vars?: gsap.TimelineVars) => {
  const tl = gsap.timeline(vars)
  const opacity = (opacity: number, duration=1, ease=Power1.easeInOut) => {
    return { opacity, duration, ease }
  }
  if ( start.value && content.value && A1.value && A2.value && A3.value && A4.value ) {
    for (let what of [A1, A2, A3, A4]) {
        tl.to(what.value!, opacity(1, 4), '<=33%')
    }
    tl.to(content.value!, opacity(0, 2), '+=2.5')
    .to(start.value!, opacity(0, 2), '<=50%')
  }
  return tl
}
const $emit = defineEmits([
  'mounted'
])
onMounted(() => {
  if (props.autoStart) {
    timeline()
  } else {
    $emit('mounted', timeline, 'Start')
  }
})
const style = computed(() => {
  return {
    background: 'url(./Georges-Louis_Leclerc_de_Buffon.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%',
    backgroundColor: '#1A2014',
  }
})
</script>

<template>
  <div ref="start" class="start" :style="style">
    <div class="center_h">
      <div class="center_v">
        <div ref="content" class="content">
          <div ref="A1" class="hidden">Laissons Georges-Louis Leclerc,</div>
          <div ref="A2" class="hidden">comte de Buffon,</div>
          <div ref="A3" class="hidden">piquer notre curiosité avec</div>
          <div ref="A4" class="hidden">des aiguilles&nbsp;!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.start {
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-color: #1A2014;
  height: 100%;
  width: 100%;
  position: relative;
  color: white;
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
.hidden {
  opacity: 0;
}
</style>
