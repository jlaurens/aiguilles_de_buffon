<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import W from './bricks/W.vue'

const about = ref<HTMLElement>()

const props = defineProps({
  items: {
    type: Array<[String, String]>,
    default: [['FOO', 'BAR']],
  },
  autoStart: {
    type: Boolean,
    default: false,
  }
})
const timeline = (vars?: gsap.TimelineVars) => {
  const tl = gsap.timeline(vars)
  tl.addLabel('Z')
  for (let target of targets) {
    tl.to(target(), {
      opacity: 1,
      color: 'hsl(0,0,0,1)',
      duration: 1 + 4 * Math.random()
    }, 'Z+='+ (3 * Math.random()))
  }
  tl.add(about.value!, {
    opacity: 0,
    duration: 2,
  }, '+=5')
  return tl
}
const $emit = defineEmits([
  'mounted'
])
const color = ref('')
const targets: Array<(vars?: gsap.TimelineVars)=>gsap.core.Tween> = []
onMounted(() => {
  color.value  = 'hsl('+(360*Math.random())+',66%,50%)'
  if (props.autoStart) {
    timeline()
  } else {
    $emit('mounted', timeline, 'About')
  }
  targets.length = 0
})
const target = (t: () => any) => {
  targets.push(t)
}
</script>

<template>
  <div class="about" ref="about">
    <div class="center_h">
      <div class="center_v">
        <div class="content">
          <div ref="A1"><W @target="target">Version 1 </W><W @target="target">© 2022 </W><W @target="target">Jérôme Laurens</W></div>
          <div><W @target ="target">Institut </W><W @target="target">de Mathématiques </W><W @target="target">de Bourgogne</W></div>
          <div><W @target="target">Unité Mixte </W><W @target="target">de Recherche </W><W @target="target">5584</W></div>
          <div><W @target="target">CNRS / Université </W><W @target="target">de Bourgogne</W></div>
          <div><W @target="target">Crédits photographiques : </W><W @target="target">wikipedia</W></div>
          <div><W @target="target">Polices : </W><W @target="target">LifeSavers, </W>
            <W @target="target"><span class="plex">IBMPlexSans, </span></W>
            <W @target="target"><span class="victor">VictorMono</span></W>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
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
.plex {
  font-family: IBMPlexSans-Regular, sans-serif;
}
.victor {
  font-family: VictorMono-Regular, monospace;
}
</style>
