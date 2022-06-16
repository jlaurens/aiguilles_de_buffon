<script setup lang="ts">
import Slide from './Slide.vue'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
defineProps({ 
  zIndex: {
    type: Number,
    default: 0,
  },
})
const w = ref(0), h = ref(0)
const seed1 = {
  x: Math.random(),
  y: Math.random(),
  h: Math.random() * 360,
}
const seed2 = {
  x: Math.random(),
  y: Math.random(),
  h: Math.random() * 360,
}
const cx1 = computed(() => {
  return seed1.x * w.value
})
const cy1 = computed(() => {
  return seed1.y * h.value
})
const cx2 = computed(() => {
  return seed2.x * w.value
})
const cy2 = computed(() => {
  return seed2.y * h.value
})
const root = ref<Element>()
var drops: Drop[] = []
class Drop {
  readonly speed = 1 + Math.random()
  readonly x = Math.random()
  readonly y = Math.random()
  readonly h = Math.random() * 360
  opacity_0 = (1 + Math.random()) / 4
  t_0 = Number.MAX_VALUE
  t = 0
  el: Element|undefined = undefined
  constructor() {
    drops.push(this)
  }
  get stroke() {
    const h = (this.speed*this.t+this.h)%360
    return 'hsl('
      + (isNaN(h)?'0':h)
      +',66%,50%)'
  }
  get cx () {
    return w.value * this.x
  }
  get cy () {
    return h.value * this.y
  }
  get r () {
    return Math.max(this.t * this.speed * window.innerHeight/40000, 0)
  }
  get opacity () {
    return this.opacity_0/(1+this.t * this.speed * (1*this.opacity_0-0.1))
  }
  start(t_0: number) {
    console.log('START')
    this.t_0 = t_0
    this.update(t_0)
  }
  install() {
    if (!this.el) {
      const el = document.createElementNS('http://www.w3.org/2000/svg','circle');
      this.el = el
      el.setAttribute('fill-opacity',"0")
      el.setAttribute('stroke-width',"3")
      el.setAttribute('stroke-linecap',"round")
      ;(root.value as Element).appendChild(el)
      this.start(Date.now())
    }
  }
  uninstall() {
    if (this.el) {
      this.el.remove()
      this.el = undefined
    }
  }
  update(t: number) {
    t = t - this.t_0
    this.t = t
    console.log('update', this.t_0, this.t)
    var el = this.el
    if (el) {
      const opacity = this.opacity
      if (opacity < 0.01) {
        var i = drops.indexOf(this)
        if (i>=0) {
          drops.splice(i, 1)
        }
        this.uninstall()
      } else {
        el.setAttribute('cx',''+this.cx)
        el.setAttribute('cy',''+this.cy)
        el.setAttribute('r',''+this.r)
        el.setAttribute('opacity',''+opacity)
        el.setAttribute('stroke',this.stroke)
      }
    }
  }
}
new Drop()
const resizeListener = () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
}
var pause = false
var start1 = Number.MAX_VALUE
const ellapsed1 = ref(0)
const r1 = computed(() => {
  return ellapsed1.value * window.innerHeight/40000
})
const color1 = computed(() => {
  const h = (2*r1.value+seed1.h)%360
  return 'hsl('
    + (isNaN(h)?'0':h)
    +',66%,50%)'
})
var start2 = Number.MAX_VALUE
const ellapsed2 = ref(0)
const r2 = computed(() => {
  return ellapsed2.value * window.innerHeight/40000
})
const color2 = computed(() => {
  const h = (3*r2.value+seed2.h)%360
  return 'hsl('
    + (isNaN(h)?'0':h)
    +',66%,50%)'
})
const next_step = () => {
  drops.forEach((d) => {
    console.log('NEXT_STEP', Date.now())
    d.update(Date.now())
  } )
  if (!pause) {
    setTimeout(next_step, 50);
  }
}
var drop = new Drop()
onMounted(() => {
  window.addEventListener('resize', resizeListener)
  resizeListener()
  if (!pause) {
    setTimeout(() => {
      start1 = Date.now()
      drop.install()
      next_step()
      setTimeout(() => {
        start2 = Date.now()
      }, 1000*(1+Math.random()));
    }, 1000*(1+Math.random()));
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeListener)
  drops.forEach((d)=>d.uninstall())
})
const viewBox = computed(() => {
  return "0 0 "+w.value+" "+h.value
})
</script>

<template>
<Slide :z-index="zIndex">
<div class="svg-container">
<svg ref="root" version="1.1" :viewBox="viewBox" class="svg-content">
<rect
  ref = "root"
  :width="w"
  :height="h"
  fill="white" />
<circle
  fill-opacity="0"
  :stroke="color1"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx1"
  :cy="cy1"
  :r="Math.max(r1,0)"
  opacity="0.1"
/>
<!--circle
  fill-opacity="0"
  :stroke="color1"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx1"
  :cy="cy1"
  :r="Math.max(r1-15,0)"
  opacity="0.075"
/>
<circle
  fill-opacity="0"
  :stroke="color1"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx1"
  :cy="cy1"
  :r="Math.max(r1-30,0)"
  opacity="0.0375"
/>
<circle
  fill-opacity="0"
  :stroke="color2"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx2"
  :cy="cy2"
  :r="Math.max(r2,0)"
  opacity="0.1"
/>
<circle
  fill-opacity="0"
  :stroke="color2"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx2"
  :cy="cy2"
  :r="Math.max(r2-15,0)"
  opacity="0.075"
/>
<circle
  fill-opacity="0"
  :stroke="color2"
  stroke-width="3"
  stroke-linecap="round"
  :cx="cx2"
  :cy="cy2"
  :r="Math.max(r2-30,0)"
  opacity="0.0375"
/-->
</svg>
</div>
<slot></slot>
</Slide>
</template>

<style scoped>
.svg-container {
  display: block;
  position: absolute;
  width: 100%;
  padding-bottom: 100%;
  vertical-align: middle;
  overflow: hidden;
}
.svg-content {
display: inline-block;
position: absolute;
top: 0;
left: 0;
}
</style>
