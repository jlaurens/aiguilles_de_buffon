<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Point } from '@mathigon/euclid'

const failure_opacity = ref(0.2)
const success_opacity = ref(0.2)
const board = ref<HTMLElement>()
const success = ref<HTMLElement>()
const failure = ref<HTMLElement>()
const parquet = ref<HTMLElement>()

const props = defineProps({
  successHue: {
    type: Number,
    default: 90+60*Math.random(),
  },
  failureHue: {
    type: Number,
    default: 330+60*Math.random(),
  },
  opacity: {
    type: Number,
    default: 1,
  }
}
)
const failure_color = computed(() => {
  return 'hsl('+props.failureHue+',66%, 50%)'
})
const success_color = computed(() => {
  return 'hsl('+props.successHue+',66%, 50%)'
})

const w = ref(0)
const h = ref(0)
const width = ref(0)
const height = ref(0)
const r  = ref(0)
const svgRoot = ref<SVGElement>()
const viewBox = computed(() => {
  return "0 0 "+width.value+" "+height.value
})
const boardOpacity = computed(() => {
  return props.opacity
})
const style = computed(() => {
  return {
    background: 'url(parquet-mini-low-resolution.jpg)',
    backgroundSize: '100%', // Here!!!
  }
})
const timeline = (n: number) => {
  const container = svgRoot.value
  const tl = gsap.timeline()
  tl.call(() => {
    console.log("MiniBoard...")
  })
  if (container && success.value && failure.value && board.value) {
    const tmln = (): [gsap.core.Timeline, boolean] => {
      const tl = gsap.timeline()
      const I = new Point(r.value, 0)
      const NS = 'http://www.w3.org/2000/svg'
      let C = new Point((1+Math.random()) * width.value / 3, (1+2*Math.random()) * height.value/4)
      let P1 = C.add(I.rotate(Math.random() * Math.PI))
      let P2 = C.scale(2).subtract(P1)
      let line = document.createElementNS(NS, 'line')
      let dP = new Point(2*width.value, 0).rotate(2 * Math.PI * Math.random())
      line.setAttribute('x1', ''+(P1.x+dP.x))
      line.setAttribute('y1', ''+(P1.y+dP.y))
      line.setAttribute('x2', ''+(P2.x+dP.x))
      line.setAttribute('y2', ''+(P2.y+dP.y))
      line.setAttribute('class', 'line')
      line.setAttribute('stroke', 'hsl('+(150+150*Math.random())+',66%, 50%)')
      line.setAttribute('stroke-width', '0.5vh')
      let d = (P2.y-height.value/2)*(height.value/2 - P1.y)
      container.appendChild(line)
      tl.to(success_opacity, {
        duration: 0.5,
        value: 0.2,
      }).to(failure_opacity, {
        duration: 0.5,
        value: 0.2,
      }, '<').to(line, {
        duration: 1,
        attr: {
          x1: P1.x,
          y1: P1.y,
          x2: P2.x,
          y2: P2.y,
        }
      }, '0')
      tl.to(line, {
        duration: 1,
        attr: {
          stroke: d>0? success_color.value: failure_color.value,
        }
      }).to(d>0? success_opacity: failure_opacity, {
        duration: 1,
        value: 1,
      }, '<=50%').to({}, { duration: 0.5 })
      return [tl, d>0]
    }
    let i = 0
    let red = false
    let green = false
    while (true) {
      let [sub_tl, yorn] = tmln()
      sub_tl.duration(1*0.975**i)
      tl.add(sub_tl)
      red = red || yorn
      green = green || !yorn
      if (red && green && i>n) {
        break
      }
      ++i
    }
  } else {
    tl.call(() => {
      console.log("MiniBoard TL: NO ELEMENT")
    })
  }
  tl.call(() => {
    console.log("MiniBoard... DONE")
  })
  return tl
}
onMounted(() => {
  resizeListener()
})
const resizeListener = () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
  height.value = 0.2 * h.value
  width.value  = 0.3 * h.value
  r.value = height.value / 8
}
defineExpose({ resizeListener, timeline })
</script>

<template>
  <div ref="board" class="mini-board">
    <div ref="success" class="success">GAGNÉ</div>
    <div ref="parquet" class="parquet" :style="style">
      <div class="container">
        <svg ref="svgRoot" xmlns="http://www.w3.org/2000/svg" version="1.1" :width="width" :height="height" :viewBox="viewBox">
        </svg>
      </div>
    </div>
    <div ref="failure" class="failure">PERDU</div>
  </div>
</template>

<style scoped>
.mini-board {
  opacity: v-bind('boardOpacity');
}
.parquet {
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  height: 20vh;
  width: 30vh;
  margin-top:5vh;
  margin-bottom:5vh;
}
.mini-board {
  width:100%;
  display:flex;
  align-items: center;
  justify-content: space-around;
}
.success {
  color: v-bind('success_color');
  opacity: v-bind('success_opacity');
  text-shadow: 0px 2px 3px rgba(0,0,0,0.25);
}
.failure {
  color: v-bind('failure_color');
  opacity: v-bind('failure_opacity');
  text-shadow: 0px 2px 3px rgba(0,0,0,0.25);
}
.container {
    width: 50%;
    height: 0;
    padding-top: 48%;
    position: relative;
}
svg {
    position: absolute;
    top: 0;
    left: 0;
}
.line {
  stroke-width: 0.5vh;
  stroke: red;
}
</style>
