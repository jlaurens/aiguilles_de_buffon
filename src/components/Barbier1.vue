<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Point } from '@mathigon/euclid'
const w = ref(0), h = ref(0)
const svgRoot = ref<SVGElement>()
const svgDefs = ref<SVGDefsElement>()
const viewBox = computed(() => {
  return "0 0 "+w.value+" "+h.value
})
const resizeListener = () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
}
defineExpose( { resizeListener } )
onMounted(() => {
  resizeListener()
})
const y0 = computed(() => {
  return 2*h.value/3
})
const r = computed(() => {
  return Math.min(h.value/8, w.value/7)
})
const x_min = computed(() => {
  return (w.value-r.value*Math.PI)/3
})
const x_max = computed(() => {
  return w.value - x_min.value
})
const cx = computed(() => {
  return (1-circle_s.value) * x_min.value + circle_s.value * x_max.value
})
const cy = computed(() => {
  return y0.value-r.value
})
const cx2 = computed(() => {
  return cx.value
})
const cy2 = computed(() => {
  return cy.value+r.value
})
const circle_s = ref(0)
const circle = ref<SVGCircleElement>()
const circle_color = ref('hsl('+Math.random()*360+',66%,50%)')
const circle_theta = computed(() => {
  return 2 * Math.PI * r.value * circle_s.value
})
const circle_transform = computed(() => {
  return 'rotate('+circle_theta.value+' '+cx.value+' '+cy.value+')'
})
const square_s = ref(0)
const square_color = ref('hsl('+Math.random()*360+',66%,50%)')
const square = ref<SVGRectElement>()
const square_theta = computed(() => {
  return 2 * Math.PI * r.value * square_s.value
})
const square_transform = computed(() => {
  return 'rotate('+square_theta.value+' '+(tlx.value+r.value)+' '+(tly.value+r.value)+')'
})
const tlx = computed(() => {
  return (1-square_s.value) * x_min.value + square_s.value * x_max.value - r.value
})
const tly = computed(() => {
  return y0.value-2*r.value
})
const triangle_s = ref(0)
const triangle_color = ref('hsl('+Math.random()*360+',66%,50%)')
const triangle = ref<SVGPolygonElement>()
const triangle_theta = computed(() => {
  return 480 * triangle_s.value
})
const gx = computed(() => {
  return (1-triangle_s.value) * x_min.value + triangle_s.value * x_max.value
})
const gy = computed(() => {
  return y0.value-2*r.value/3
})
const triangle_transform = computed(() => {
  const theta = triangle_theta.value % 120
  let n = Math.floor(triangle_theta.value/120)
  let dx = 2*r.value/Math.sqrt(3)
  let x = x_min.value+dx+2*n*dx
  let ans = 'rotate('+theta+' '+x+' '+y0.value+')'
  while (n--) {
    x -= 2*dx
    ans += 'rotate(120 '+x+' '+y0.value+') '
  }
  return ans
})
const triangle_points = computed(() => {
  return x_min.value+','+(y0.value-2*r.value)+' '+(x_min.value+2*r.value/Math.sqrt(3))+','+y0.value+' '+(x_min.value-2*r.value/Math.sqrt(3))+','+y0.value
})
const reuleaux_s = ref(0)
const reuleaux_color = ref('hsl('+Math.random()*360+',66%,50%)')
const reuleaux = ref<SVGRectElement>()
const reuleaux_theta = computed(() => {
  return 420 * reuleaux_s.value
})
const reuleaux_min = computed(() => {
  return x_min.value - Math.PI / 3 * r.value
})
const reuleaux_Ps = (theta: number): { A: Point, C: Point, B: Point } => {
  const i = new Point(2 * r.value, 0)
  const j = new Point(0, 2 * r.value)
  const n = Math.floor(theta/360)
  theta -= n * 360
  const O = new Point(reuleaux_min.value, y0.value).subtract(j).add(i.scale(Math.PI * n))
  let A = new Point()
  let B = new Point()
  let C = new Point()
  if (theta <= 60) {
    let rad = theta * Math.PI / 180
    A = O.add(i.scale(rad))
    B = A.add(j.rotate(rad))
    C = A.add(j.rotate(rad - Math.PI / 3))
  } else if (theta <= 120) {
    C = O.add(i.scale(Math.PI / 3)).add(j)
    let rad = (theta - 60) * Math.PI / 180
    A = C.subtract(j.rotate(rad))
    B = C.subtract(j.rotate(rad - Math.PI / 3))
  } else if (theta <= 180) {
    let rad = (theta - 120) * Math.PI / 180
    B = O.add(i.scale(rad + Math.PI / 3))
    C = B.add(j.rotate(rad))
    A = B.add(j.rotate(rad - Math.PI / 3))
  } else if (theta <= 240) {
    A = O.add(i.scale(2 * Math.PI / 3)).add(j)
    let rad = (theta - 180) * Math.PI / 180
    B = A.subtract(j.rotate(rad))
    C = A.subtract(j.rotate(rad - Math.PI / 3))
  } else if (theta <= 300) {
    let rad = (theta - 240) * Math.PI / 180
    C = O.add(i.scale(rad + 2 * Math.PI / 3))
    A = C.add(j.rotate(rad))
    B = C.add(j.rotate(rad - Math.PI / 3))
  } else {
    B = O.add(i.scale(3 * Math.PI / 3)).add(j)
    let rad = (theta - 300) * Math.PI / 180
    C = B.subtract(j.rotate(rad))
    A = B.subtract(j.rotate(rad - Math.PI / 3))
  }
  return { A: A, C: C, B: B, }
}
const reuleaux_d = computed(() => {
  const R = 2 * r.value
  const {A, C, B} = reuleaux_Ps(reuleaux_theta.value + 30)
  return 'M '+ A.x +' '+ A.y
    + ' A '+R+' '+R+' 0 0 0 ' + B.x +' '+ B.y
    + ' A '+R+' '+R+' 0 0 0 ' + C.x +' '+ C.y
    + ' A '+R+' '+R+' 0 0 0 ' + A.x +' '+ A.y
    + ' Z'
})
const tl = gsap.timeline()
const l1 = ref<HTMLElement>()
const l2 = ref<HTMLElement>()
const l3 = ref<HTMLElement>()
const l4 = ref<HTMLElement>()
onMounted(() => {
  if (circle.value && square.value && triangle.value && reuleaux.value
        && l1.value && l2.value && l3.value && l4.value)
  {
    // tl.to(circle_s, {
    //   value: 1,
    //   duration: 5,
    //   ease: 'power1.inOut',
    // })
    // tl.to(circle_s, {
    //   value: 0,
    //   duration: 5,
    //   ease: 'power1.inOut',
    // })
    // tl.to(l2.value, {
    //   opacity: 1,
    //   duration: 2,
    // })
    // tl.to(square.value, {
    //   opacity: 1,
    //   duration: 2,
    // })
    // tl.to(square_s, {
    //   value: 1,
    //   duration: 5,
    //   ease: 'power1.inOut',
    // })
    // tl.to(square_s, {
    //   value: 0,
    //   duration: 5,
    //   ease: 'power1.inOut',
    // })
    // tl.to(square.value, {
    //   opacity: 0,
    //   duration: 2,
    // })
    tl.to(triangle.value, {
      opacity: 1,
      duration: 2,
    }, '<')
    // tl.to(triangle_s, {
    //   value: 1,
    //   duration: 5,
    //   ease: 'power1.inOut',
    // })
    // tl.to(triangle_s, {
    //   value: 0,
    //   duration: 5,
    //   ease: 'power1.inOut',
    // })
    // tl.to(l3.value, {
    //   opacity: 1,
    //   duration: 2,
    // })
    // tl.to(l4.value, {
    //   opacity: 1,
    //   duration: 2,
    // })
    tl.to(reuleaux.value, {
      opacity: 1,
      duration: 2,
    })
    tl.to(triangle.value, {
      opacity: 0,
      duration: 2,
    }, '<')
    tl.to(reuleaux_s, {
      value: 1,
      duration: 15,
      ease: 'power1.inOut',
    })
    tl.to(reuleaux_s, {
      value: 0,
      duration: 5,
      ease: 'power1.inOut',
    })
  }
})

</script>

<template>
<div class="svg-container">
<svg ref="svgRoot" version="1.1" :viewBox="viewBox" class="svg-content">
<defs ref="svgDefs"></defs>
<line x1="0" :y1="y0-2*r" :x2="w" :y2="y0-2*r" stroke="black" class="line top"/>
<line x1="0" :y1="y0" :x2="w" :y2="y0" stroke="black" class="line bottom"/>
<g :transform="circle_transform">
  <circle ref="circle" :cx="cx" :cy="cy" :r="r" class="circle"/>
  <line :x1="cx" :y1="cy" :x2="cx2" :y2="cy2" class="radius"/>
</g>
<rect :x="tlx" :y="tly" :width="2*r" :height="2*r" ref="square" class="square hidden" :transform="square_transform"></rect>/>
<polygon :points="triangle_points" ref="triangle" class="triangle" :transform="triangle_transform"/>
<path :d="reuleaux_d" ref="reuleaux" class="reuleaux hidden"/>
</svg>
</div>
<div ref="l1">Un cercle peut tourner entre deux lignes parallèles,</div>
<div ref="l2" class="hidden">mais pas un carré,<span ref="l3" class="hidden"> ni un triangle,</span></div>
<div ref="l4" class="hidden">à moins d'arrondir correctement les côtés</div>
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
.line {
  stroke-width:3;
  stroke-linecap: round;
}
.top {
   stroke-dasharray: 10px;
}
.circle, .radius {
  stroke: v-bind(circle_color);
  stroke-width:3;
  fill: transparent;
}
.hidden {
  opacity: 0;
}
.square, .triangle, .reuleaux {
  fill: transparent;
  stroke-width:3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.square {
  stroke: v-bind(square_color);
}
.triangle {
  stroke: v-bind(triangle_color);
}
.reuleaux {
  stroke: v-bind(reuleaux_color);
}
</style>
