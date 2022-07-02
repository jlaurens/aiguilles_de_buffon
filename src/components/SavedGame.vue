<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Point } from '@mathigon/euclid'

const failure_color = ref('')
const success_color = ref('')
const failure_opacity = ref(0.2)
const success_opacity = ref(0.2)
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
const board = ref<HTMLElement>()
const success = ref<HTMLElement>()
const failure = ref<HTMLElement>()
const parquet = ref<HTMLElement>()

const r  = ref(0)
const recycle = () => {
  if (A1.value) {
    A1.value.style.opacity = ''
  }
}
const timeline = () => {
  const tl = gsap.timeline()
  if ( A.value && A1.value && A2.value && C1.value && A3.value &&
    B.value && B1.value &&
    C.value && C1.value && C1.value && C2.value &&
    board.value
  ) {
    const opacity = (level: number) => {
      return {
        duration: 1,
        opacity: level,
      }
    }
    const value = (level: number) => {
      return {
        duration: 1,
        value: level,
        ease: 'power1.inOut',
      }
    }
    for (let what of [A1, A2, A3]) {
      tl.to(what.value!, opacity(1)).to({}, {duration: 2.5})
    }
    tl.add(board_timeline()).to({}, {duration: 2.5})
    tl.call(() => {
      B.value!.style.display = 'block'
    }).to(B1.value!, opacity(1)).to({}, {duration: 2.5})
    tl.to(A.value, opacity(0))
    tl.call(() => {
      A.value!.style.display = 'none'
      C.value!.style.display = 'block'
    })
    for (let what of [C1, C2]) {
      tl.to(what.value!, opacity(1)).to({}, {duration: 2.5})
    }
    tl.to(C3.value!, opacity(1)).to({}, {duration: 1.5})
    tl.call(() => {
      C3_scale.value = 1
    }).to(C3_scale, value(1.5)).to(C3_relative, value(1.5), '<')
    for (let what of [C1, C1, C2, board]) {
      tl.to(what.value!, opacity(0), '<')
    }
    tl.to(B.value, opacity(0), '<')
    tl.to({}, { duration: 2.5 })
  }
}
const board_timeline = () => {
  const container = svgRoot.value
  const n = 10
  const ans = gsap.timeline()
  ans.call(() => {
    console.log("STARTING")
  })
  if (container && success.value && failure.value && board.value) {
    ans.to(board.value, {
      duration: 0.5,
      opacity: '1',
    }, '<')
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
      }, '0').call(() => {
        console.log('STEP NEXT')
      })
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
    let i = n
    let red = false
    let green = false
    while (true) {
      let [tl, yorn] = tmln()
      tl.duration(1*0.9**(i-n))
      ans.add(tl)
      red = red || yorn
      green = green || !yorn
      if (red && green && i<0) {
        break
      }
      --i
    }
  } else {
    ans.call(() => {
      console.log("NO ELEMENT")
    })
  }
  return ans
}
let pi_hue: number
onMounted(() => {
  failure_color.value = 'hsl('+(330+60*Math.random())+',66%, 50%)'
  success_color.value = 'hsl('+( 60+60*Math.random())+',66%, 50%)'
  pi_hue = 150+150*Math.random()
  pin_color.value = 'hsl('+pi_hue+',66%, 50%)'
  resizeListener()
  timeline()
})
const pi_color = computed(() => {
  return 'hsl('+pi_hue+','+(66*C3_relative.value)+'%, '+(50*C3_relative.value)+'%)'
})

const svgRoot = ref<SVGElement>()
const viewBox = computed(() => {
  return "0 0 "+width.value+" "+height.value
})
const pi = ref<HTMLElement>()
const pin_color = ref('')
const w = ref(0)
const h = ref(0)
const width = ref(0)
const height = ref(0)
const resizeListener = () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
  height.value = 0.2 * h.value
  width.value  = 0.3 * h.value
  r.value = height.value / 4
}
defineExpose({ resizeListener })
const style = computed(() => {
  return {
    background: 'url(parquet-mini-low-resolution.jpg)',
    backgroundSize: '100%', // Here!!!
  }
})
const C3_relative = ref(0)
const C3_scale = ref(0)
const C3_style = computed(() => {
  return C3_scale.value > 0 ? {
    transform: 'scale('+C3_scale.value+')',
    top: +0*C3_relative.value*window.innerHeight/10 + '0px',
  } : {}
})
</script>

<template>
<div class="game">
  <div class="center_v">
    <div ref="l" class="l">
      <div ref="AorC" class="AorC">
        <div ref="A" class="A">
          <div ref="A1" class="A1 hidden">Une aiguille tombe sur un plancher :</div>
          <div ref="A2" class="A2 hidden">si elle arrive sur deux lattes, on gagne et</div>
          <div ref="A3" class="A3 hidden">si elle arrive sur une seule latte, on perd.</div>
        </div>
        <div ref="C" class="C">
          <div ref="C1" class="C1 hidden">Presque 64% pour des aiguilles de la largeur des lattes.</div>
          <div ref="C2" class="C2 hidden">En 1733, Buffon donne la valeur exacte: 2÷<span ref="pi" class="greek">π</span></div>
          <div ref="C3" class="C3 hidden" :style="C3_style">Mais qu'est-ce que <span ref="pi" class="greek">π</span> ?</div>
        </div>
      </div>
      <div ref="board" class="center_h hidden">
        <div ref="success" class="success">GAGNÉ</div>
        <div ref="parquet" class="parquet" :style="style">
          <div class="container">
            <svg ref="svgRoot" xmlns="http://www.w3.org/2000/svg" version="1.1" :width="width" :height="height" :viewBox="viewBox">
            </svg>
          </div>
        </div>
        <div ref="failure" class="failure">PERDU</div>
      </div>
      <div ref="B">
        <div ref="B1" class="B1 hidden">Combien a-t-on de chance de gagner ?</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.parquet {
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  height: 20vh;
  width: 30vh;
  margin-top:5vh;
  margin-bottom:5vh;
}
.center_v {
  display:flex;
  height:100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.center_h {
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
.hidden {
  opacity: 0;
}
.greek {
  color: v-bind('pi_color');
}
.none {
  display: none;
}
.C3, .AorC {
  position: relative;
}
.A .C {
  position: absolute;
  top: 0px;
}
</style>
