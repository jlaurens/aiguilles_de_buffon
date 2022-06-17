<script setup lang="ts">
import Slide from './Slide.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
const props = defineProps({ 
  zIndex: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 50,
  },
})
const w = ref(0), h = ref(0)
const svgRoot = ref<SVGElement>()
const svgDefs = ref<SVGDefsElement>()
class Rain {
  paused = false
  readonly drops: Drop[] = []
  constructor(
    private root: SVGElement,
    private defs: SVGDefsElement,
    private count = props.count
  ) {
  }
  newDrop(): Drop {
    let d = new Drop()
    this.drops.push(d)
    return d.mount(this.root, this.defs)
  }
  dryDrop(d: Drop): Drop | undefined {
    const i = this.drops.indexOf(d)
    if (i>=0) {
      this.drops.splice(i, 1)
      d.unmount()
      return d
    }
  }
  forEachDrop (f: (d: Drop) => void) {
    this.drops.forEach( (d) => { f(d) } )
  }
  mount(): Rain {
    this.forEachDrop( (d) => { d.mount(this.root, this.defs) } )
    return this
  }
  unmount(): Rain {
    this.forEachDrop( (d) => { d.unmount() } )
    return this
  }
  dry(): Rain {
    this.forEachDrop( (d) => { this.dryDrop(d) } )
    return this
  }
  fall(): Rain {
    this.dry()
    const fall = (n: number) => {
      this.newDrop().fall()
      if (n > 1) {
        setTimeout(() => {
          fall(n-1)
        }, 1000*(1+2*Math.random())/3);
      }
    }
    fall(this.count)
    setTimeout( () => {
      this.update()
    }, 25)
    return this
  }
  update(): Rain {
    this.forEachDrop( (d) => {
      if (!d.update(Date.now())) {
        this.dryDrop(d)
        setTimeout( () => {
          this.newDrop().fall()
        }, 1000*(1+2*Math.random())/3)
      }
    } )
    if (!this.paused) {
      setTimeout(() => { this.update() }, 50)
    }
    return this
  }
}
class Drop {
  readonly speed = 1 + Math.random()
  readonly h = Math.random() * 360
  opacity_0 = (1 + Math.random()) / 16
  ms_0 = Number.MAX_VALUE
  s = 0
  circle: SVGCircleElement
  gradient: SVGGradientElement
  stop_0: SVGStopElement
  stop_1: SVGStopElement
  constructor() {
    let id = 'drop'+Math.floor(Math.random()*1000000)
    let cx = ''+Math.random() * window.innerWidth
    let cy = ''+Math.random() * window.innerHeight
    let NS = 'http://www.w3.org/2000/svg'
    let circle = document.createElementNS(NS, 'circle')
    circle.setAttribute('cx',cx)
    circle.setAttribute('cy',cy)
    circle.setAttribute('fill', 'url(#'+id+')')
    //circle.setAttribute('fill', 'url(#exampleGradient)')
    this.circle = circle as SVGCircleElement
    let gradient = document.createElementNS(NS,'radialGradient')
    gradient.setAttribute('id', id)
    // gradient.setAttribute('cx',cx)
    // gradient.setAttribute('cy',cy)
    this.gradient = gradient as SVGGradientElement
    var stop = document.createElementNS(NS,'stop')
    stop.setAttribute('offset', '80%')
    stop.setAttribute('stop-opacity', '0')
    stop.setAttribute('stop-color','green')
    gradient.appendChild(stop)
    this.stop_0 = stop as SVGStopElement
    stop = document.createElementNS(NS,'stop')
    stop.setAttribute('offset', '100%')
    stop.setAttribute('stop-opacity', '1')
    stop.setAttribute('stop-color','green')
    gradient.appendChild(stop)
    this.stop_1 = stop as SVGStopElement
  }
  get color() {
    const h = (this.speed*this.s+this.h)%360
    return 'hsl('
      + (isNaN(h)?'0':h)
      +',66%,50%)'
  }
  get r () {
    return Math.max(this.s * this.speed * window.innerHeight/40, 0)
  }
  get opacity () {
    return this.opacity_0/(1+this.s * this.speed * (this.opacity_0-0.02))
  }
  fall(ms_0 = Date.now()) {
    this.ms_0 = ms_0
    this.update(ms_0)
  }
  mount(container: SVGElement, defs:SVGDefsElement) {
    container.appendChild(this.circle)
    defs.appendChild(this.gradient)
    return this
  }
  unmount() {
    this.circle.remove()
    this.gradient.remove()
    return this
  }
  update(ms: number): Boolean {
    ms = ms - this.ms_0
    this.s = ms/1000
    const opacity = this.opacity
    if (opacity < 0.02) {
      return false
    } else {
      this.circle.setAttribute('r',''+this.r)
      this.stop_0.setAttribute('stop-color',this.color)
      this.stop_1.setAttribute('stop-color',this.color)
      this.stop_1.setAttribute('stop-opacity',''+opacity)
    }
    return true
  }
}
var rain: Rain
const resizeListener = () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
  rain.fall()
}
onMounted(() => {
  rain = new Rain(
    svgRoot.value as SVGElement,
    svgDefs.value as SVGDefsElement
  ).mount()
  resizeListener()
  window.addEventListener('resize', resizeListener)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeListener)
  rain && rain.unmount()
})
const viewBox = computed(() => {
  return "0 0 "+w.value+" "+h.value
})
</script>

<template>
<Slide :z-index="zIndex">
<div class="svg-container">
<svg ref="svgRoot" version="1.1" :viewBox="viewBox" class="svg-content">
<defs ref="svgDefs"></defs>
<rect
  :width="w"
  :height="h"
  fill="white" />
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
  overflow: hidden;
}
.svg-content {
display: inline-block;
position: absolute;
top: 0;
left: 0;
}
</style>
