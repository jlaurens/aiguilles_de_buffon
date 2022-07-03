<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap, Power1 } from 'gsap'
import MiniBoardVue from './bricks/MiniBoard.vue';

const props = defineProps({
  autoStart: {
    type: Boolean,
    default: false,
  }
})
const miniBoard = ref()
const A  = ref<HTMLElement>()
const A1 = ref<HTMLElement>()
const A2 = ref<HTMLElement>()
const A3 = ref<HTMLElement>()
const B  = ref<HTMLElement>()
const B1 = ref<HTMLElement>()
const C  = ref<HTMLElement>()
const C1 = ref<HTMLElement>()
const C2 = ref<HTMLElement>()
const C3 = ref<HTMLElement>()

const r  = ref(0)
const C3_relative = ref(0)
const C3_scale = ref(0)
const C3_style = computed(() => {
  return C3_scale.value > 0 ? {
    transform: 'scale('+C3_scale.value+')',
    top: +0*C3_relative.value*window.innerHeight/10 + '0px',
  } : {}
})
let pi_hue = ref(150+150*Math.random())
const pi_color = computed(() => {
  return 'hsl('+pi_hue.value+','+(66*C3_relative.value)+'%, '+(50*C3_relative.value)+'%)'
})

const pi = ref<HTMLElement>()
const w = ref(0)
const h = ref(0)
const width = ref(0)
const height = ref(0)
const miniBoardOpacity = ref(0)
const miniBoard_timeline = computed(() => {
  return miniBoard.value!.timeline
})
const timeline = () => {
  const tl = gsap.timeline()
  tl.call(()=>{
    console.log('GAME TIMELINE...')
  })
  if ( A.value && A1.value && A2.value && C1.value && A3.value &&
    B.value && B1.value &&
    C.value && C1.value && C1.value && C2.value &&
    miniBoard.value
  ) {
    const opacity = (level: number, duration=1) => {
      return {
        duration: duration,
        opacity: level,
      }
    }
    const value = (level: number, duration=1) => {
      return {
        duration: duration,
        value: level,
        ease: Power1.easeInOut,
      }
    }
    for (let what of [A1, A2, A3]) {
      tl.to(what.value!, opacity(1), '+=2.5')
    }
    tl.to(miniBoardOpacity, value(1), '+=2.5')
    tl.add(miniBoard_timeline.value(10))
    tl.call(() => {
      B.value!.style.display = 'block'
    }).to(B1.value!, opacity(1), '+=2.5')
    tl.to(A.value, opacity(0))
    tl.call(() => {
      A.value!.style.display = 'none'
      C.value!.style.display = 'block'
    })
    for (let what of [C1, C2, C3]) {
      tl.to(what.value!, opacity(1), '+=2.5')
    }
    tl.call(() => {
      C3_scale.value = 1
    }).to(C3_scale, value(1.5, 2), '+=1.5').to(C3_relative, value(1.5, 2), '<')
    for (let what of [B, C1, C2]) {
      tl.to(what.value!, opacity(0), '<')
    }
    tl.to(miniBoardOpacity, value(0), '<')
  }
  tl.call(()=>{
    console.log('GAME TIMELINE... DONE')
  }, undefined, '+=2.5')
  return tl
}
const resizeListener = () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
  height.value = 0.2 * h.value
  width.value  = 0.3 * h.value
  r.value = height.value / 4
  miniBoard.value?.resizeListener()
}
defineExpose({ resizeListener, timeline })
onMounted(() => {
  resizeListener()
  props.autoStart && timeline()
})
</script>

<template>
<div class="game">
  <div class="center_v">
    <div class="content">
      <div ref="AorC" class="AorC">
        <div ref="A" class="A">
          <div ref="A1" class="A1 hidden">Une aiguille tombe sur un plancher :</div>
          <div ref="A2" class="A2 hidden">si elle arrive sur deux lattes, on gagne et</div>
          <div ref="A3" class="A3 hidden">si elle arrive sur une seule latte, on perd.</div>
        </div>
        <div ref="C" class="C">
          <div ref="C1" class="C1 hidden">Presque 32% si la longueur des aiguilles vaut une demi largeur de latte.</div>
          <div ref="C2" class="C2 hidden">En 1733, Buffon donne la valeur exacte: 1÷<span ref="pi" class="greek">π</span></div>
          <div ref="C3" class="C3 hidden" :style="C3_style">Mais qu'est-ce que <span ref="pi" class="greek">π</span> ?</div>
        </div>
      </div>
      <MiniBoardVue ref="miniBoard" :hue="pi_hue" :opacity="miniBoardOpacity"/>
      <div ref="B">
        <div ref="B1" class="B1 hidden">Combien a-t-on de chances de gagner ?</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.center_v {
  display:flex;
  height:100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.hidden {
  opacity: 0;
}
.greek {
  color: v-bind('pi_color');
}
.C3, .AorC {
  position: relative;
}
.A {
  position: absolute;
  top: 0px;
  width: 100%;
}
</style>
