<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Point } from '@mathigon/euclid'

const failure_color = ref('')
const success_color = ref('')
const failure_opacity = ref(0.2)
const success_opacity = ref(0.2)
const l1 = ref<HTMLElement>()
const l2 = ref<HTMLElement>()
const l3 = ref<HTMLElement>()
const l4 = ref<HTMLElement>()
const l5 = ref<HTMLElement>()
const l6 = ref<HTMLElement>()
const l7 = ref<HTMLElement>()
const board = ref<HTMLElement>()
const success = ref<HTMLElement>()
const failure = ref<HTMLElement>()
const parquet = ref<HTMLElement>()

const r  = ref(0)
const recycle = () => {
  if (l1.value) {
    l1.value.style.opacity = ''
  }
}
const timeline = (container: SVGElement, n: number) => {
  const tl = gsap.timeline()
  if (l1.value && l2.value && l4.value && l3.value && l4.value && l5.value && l6.value && l7.value
    && board.value
  ) {
    tl.to(l1.value, {
      duration: 1,
      opacity: 1,
    }).to({}, {duration: 2.5}).to(l2.value, {
      duration: 1,
      opacity: 1,
    }).to({}, {duration: 2.5}).to(l3.value, {
      duration: 1,
      opacity: 1,
    }).to({}, {duration: 2.5}).add(board_timeline(container, 10)).to({}, {duration: 2.5}).to(l4.value, {
      duration: 1,
      opacity: 1,
    }).to({}, {duration: 2.5}).to(l5.value, {
      duration: 1,
      opacity: 1,
    }).to({}, {duration: 2.5}).to(l6.value, {
      duration: 1,
      opacity: 1,
    }).to({}, {duration: 2.5}).to(l7.value, {
      duration: 1,
      opacity: 1,
    }).to({}, {duration: 1.5})
    tl.to(l1.value, {
      duration: 1,
      opacity: 0,
    }).to(l2.value, {
      duration: 1,
      opacity: 0,
    }, '<').to(l3.value, {
      duration: 1,
      opacity: 0,
    }, '<').to(l4.value, {
      duration: 1,
      opacity: 0,
    }, '<').to(l5.value, {
      duration: 1,
      opacity: 0,
    }, '<').to(l6.value, {
      duration: 1,
      opacity: 0,
    }, '<').to(board.value, {
      duration: 1,
      opacity: 0,
    }, '<')
    tl.call(() => {
      for (let l of [l1, l2, l3, l4, l5, l6]) {
        l.value!.style.opacity = ''
      }
      board.value!.style.opacity = ''
    })
    tl.call(() => {
      l7_scale.value = 1
    }).to(l7_scale, {
      value: 1.5,
      duration: 2.5,
      ease: 'power1.inOut',
    }).to(l7_relative, {
      value: 1,
      duration: 2.5,
      ease: 'power1.inOut',
    }, '<')
  }
}
const board_timeline = (container: SVGElement, n: number) => {
  const ans = gsap.timeline()
  ans.call(() => {
    console.log("STARTING")
  })
  if (success.value && failure.value && board.value) {
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
  svgRoot.value && timeline(svgRoot.value, 10)
})
const pi_color = computed(() => {
  return 'hsl('+pi_hue+','+(66*l7_relative.value)+'%, '+(50*l7_relative.value)+'%)'
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
    backgroundSize: '100%',
  }
})
const l7_relative = ref(0)
const l7_scale = ref(0)
const l7_style = computed(() => {
  return l7_scale.value > 0 ? {
    position: 'relative',
    transform: 'scale('+l7_scale.value+')',
    top: -4*l7_relative.value*window.innerHeight/10 + 'px',
  } : {}
})
</script>

<template>
<div class="center_v">
  <div ref="l" class="l">
    <div ref="l1" class="l1 hidden">Une aiguille tombe sur un plancher :</div>
    <div ref="l2" class="l2 hidden">si elle arrive sur deux lattes, on gagne et</div>
    <div ref="l3" class="l3 hidden">si elle arrive sur une seule latte, on perd.</div>
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
    <div ref="l4" class="l4 hidden">Combien a-t-on de chance de gagner ?</div>
    <div ref="l5" class="l5 hidden">Autour de 64% pour des aiguilles de la largeur des lattes.</div>
    <div ref="l6" class="l6 hidden">En 1733, Buffon donne la valeur exacte: 2/<span ref="pi" class="greek">π</span></div>
    <div ref="l7" class="l7 hidden" :style="l7_style">Mais qu'est-ce que <span ref="pi" class="greek">π</span> ?</div>
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
  height:100%;
  display:flex;
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
  font-family: IBMPlexSans-Regular, sans-serif;
}
</style>
