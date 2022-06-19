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
    default: 20,
  },
})
const w = ref(0), h = ref(0)
const svgRoot = ref<SVGElement>()
const svgDefs = ref<SVGDefsElement>()
class Rain {
  paused__ = false
  readonly drops: Drop[] = []
  readonly count0: number
  constructor(
    private root: SVGElement,
    private defs: SVGDefsElement,
    private count = props.count
  ) {
    this.count0 = count
  }
  get paused () {
    return this.paused__
  }
  set paused (yorn) {
    if (!(this.paused__ = yorn)) {
      setTimeout(() => { this.update() }, 50)
    }
  }
  newDrop(): Drop|undefined {
    if (this.drops.length < this.count0) {
      let d = new Drop()
      this.drops.push(d)
      return d.mount(this.root, this.defs)
    }
  }
  dryDrop(d: Drop) {
    if (d) {
      d.shouldUnmount(() => {
        const i = this.drops.indexOf(d)
        if (i>=0) {
          this.drops.splice(i, 1)
        }
      })
    }
  }
  mount(): Rain {
    for (let d of this.drops) { d.mount(this.root, this.defs) }
    return this
  }
  unmount(): Rain {
    for (let d of this.drops) { d.unmount() }
    return this
  }
  dry(): Rain {
    for (let d of this.drops) { this.dryDrop(d) }
    return this
  }
  fall(): Rain {
    this.dry()
    const fall = (n: number) => {
      const d = this.newDrop()
      if (d) {
        d.fall()
        if (n > 1) {
          setTimeout(() => {
            fall(n-1)
          }, 1000*(1+2*Math.random())/3);
        }
      }
    }
    fall(this.count)
    setTimeout( () => {
      this.update()
    }, 25)
    return this
  }
  update(): Rain {
    if (!this.paused) {
      for (let d of this.drops) {
        if (!d.update(Date.now())) {
          setTimeout( () => {
            this.dryDrop(d)
          }, 1000*(1+2*Math.random()))
          if (!d.willUnmount) {
            d.willUnmount = true
            setTimeout( () => {
              const d = this.newDrop()
              d && d.fall()
            }, 1000*(1+2*Math.random())/3)
          }
        }
      }
      setTimeout(() => { this.update() }, 50)
    }
    return this
  }
}
class DropBase {
  static OPACITY_LIMIT = 0.015
  static OPACITY_FACTOR = 0.7
  static OPACITY_O7_MIN = 0.25
  static OPACITY_O7_MAX = 0.95
  static OPACITY_O7_FACTOR = 2
  static OPACITY_O7_A = 1 - DropBase.OPACITY_O7_MIN
  static OPACITY_O7_B = Math.pow(DropBase.OPACITY_O7_A/(1-DropBase.OPACITY_O7_MAX),1/DropBase.OPACITY_O7_FACTOR)-1
  protected id: string
  public r_speed = (1 + 5 * Math.random())/3
  public h_speed = (2*Math.floor(2 * Math.random())-1)*(1 + 5 * Math.random())/3
  readonly h = Math.random() * 360
  opacity_0 = (2 + Math.random()) / 16
  ms_0 = Number.MAX_VALUE
  s = 0
  circle: SVGCircleElement
  gradient?: SVGGradientElement
  stop_0?: SVGStopElement
  stop_1?: SVGStopElement
  willUnmount?: Boolean
  s_max = 30 + 15 * Math.random()
  constructor(
    public cx = Math.random() * window.innerWidth,
    public cy = Math.random() * window.innerHeight,
    id?: string
  ) {
    let NS = 'http://www.w3.org/2000/svg'
    if (!id) {
      id = 'drop' + Math.floor(Math.random() * 1000000)
      let gradient = document.createElementNS(NS,'radialGradient')
      gradient.setAttribute('id', id)
      this.gradient = gradient as SVGGradientElement
      var stop = document.createElementNS(NS,'stop')
      stop.setAttribute('offset', ''+DropBase.OPACITY_O7_MIN)
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
    this.id = id
    let circle = document.createElementNS(NS, 'circle')
    circle.setAttribute('cx', ''+cx)
    circle.setAttribute('cy', ''+cy)
    circle.setAttribute('fill', 'url(#'+this.id+')')
    this.circle = circle as SVGCircleElement
  }
  get color() {
    const h = (this.h_speed*this.s/this.s_max*360+this.h)%360
    return 'hsl('
      + (isNaN(h)?'0':h)
      +',66%,50%)'
  }
  get r () {
    return Math.max(this.s * this.r_speed / this.s_max * window.innerHeight / 2, 0)
  }
  get opacity () {
    let f = this.s>this.s_max ? Math.pow(0.5,this.s-this.s_max) : 1
    let a = Math.pow(this.opacity_0/DropBase.OPACITY_LIMIT, DropBase.OPACITY_FACTOR) - 1
    return f * this.opacity_0
      /Math.pow(1+a*this.s / this.s_max, 1/DropBase.OPACITY_FACTOR)
  }
  get offset () {
    return 1-DropBase.OPACITY_O7_A/Math.pow(1+DropBase.OPACITY_O7_B*this.s/this.s_max, DropBase.OPACITY_O7_FACTOR)
  }
  mount(container: SVGElement, defs:SVGDefsElement) {
    container.appendChild(this.circle)
    this.gradient && defs.appendChild(this.gradient)
    this.willUnmount = false
    return this
  }
  unmount() {
    this.circle.remove()
    this.gradient && this.gradient.remove()
    return this
  }
  shouldUnmount(f?: ()=>void) {
    this.unmount()
    f && f()
    return this
  }
  fall(ms_0 = Date.now()) {
    this.ms_0 = ms_0
    this.update(ms_0)
  }
  update(ms: number): Boolean {
    ms = ms - this.ms_0
    this.s = ms/1000
    const color = this.color
    this.circle.setAttribute('r',''+this.r)
    this.stop_0 && this.stop_0.setAttribute('stop-color',color)
    this.stop_0 && this.stop_0.setAttribute('offset',''+this.offset)
    this.stop_1 && this.stop_1.setAttribute('stop-color',color)
    this.stop_1 && this.stop_1.setAttribute('stop-opacity',''+this.opacity)
    return this.s < this.s_max
  }
}
class Drop extends DropBase {
  private all__: DropBase[]
  constructor(
    public cx = Math.random() * window.innerWidth,
    public cy = Math.random() * window.innerHeight,
    id?: string
  ) {
    super(cx, cy, id)
    this.all__ = [
      new DropBase(cx, -cy, this.id),
      new DropBase(-cx, cy, this.id),
      new DropBase(cx, 2 * window.innerHeight-cy, this.id),
      new DropBase(2 * window.innerWidth-cx,  cy, this.id)
    ]
    this.all__.forEach( (d) => {
      d.r_speed = this.r_speed
      d.h_speed = this.h_speed
      d.s_max = this.s_max
    })
  }
  mount(container: SVGElement, defs:SVGDefsElement) {
    this.unmount()
    super.mount(container, defs)
    this.all__.forEach( (d) => { d.mount(container, defs) })
    return this
  }
  unmount() {
    super.unmount()
    this.all__.forEach( (d) => { d.unmount() })
    return this
  }
  shouldUnmount(f?: ()=>void) {
    let unmount = () => {
      if (this.all__.length) {
        let i = Math.floor(Math.random() * this.all__.length)
        let d = this.all__[i]
        d.shouldUnmount(() => {
          let i = this.all__.indexOf(d)
          if (i>=0) {
            this.all__.splice(i, 1)
          }
        })
        setTimeout(unmount, 500 * Math.random())
      } else {
        super.shouldUnmount(f)
      }
    }
    setTimeout(unmount, 1000 * (1+Math.random()))
    return this
  }
  fall(ms_0 = Date.now()) {
    super.fall(ms_0)
    this.all__.forEach( (d) => { d.fall(ms_0) })
  }
  update(ms: number): Boolean {
    if (super.update(ms)) {
      this.all__.forEach( (d) => { d.update(ms) })
      return true
    }
    return false
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
})
onUnmounted(() => {
  rain && rain.unmount()
})
const viewBox = computed(() => {
  return "0 0 "+w.value+" "+h.value
})
defineExpose({ resizeListener })
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
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
.svg-content {
display: inline-block;
position: absolute;
top: 0;
left: 0;
}
</style>
