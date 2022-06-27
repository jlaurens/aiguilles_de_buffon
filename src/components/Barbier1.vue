<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Point, Angle } from '@mathigon/euclid'
const w = ref(0), h = ref(0)
const svgRoot = ref<SVGElement>()
const svgDefs = ref<SVGDefsElement>()
const viewBox = computed(() => {
  return "0 0 "+w.value+" "+h.value
})
const penta_angles = (() => {
  const alpha = (3+3*Math.random()) * Math.PI/25
  const beta  = 2 * Math.PI/5 - alpha
  const A = new Point(-1,0)
  const C = new Point(1,0)
  const D = A.add(C.subtract(A).rotate(alpha))
  const E = C.add(A.subtract(C).rotate(-beta))
  const M = D.scale(0.5).add(E.scale(0.5))
  const DE = E.subtract(D)
  const y = M.y-Math.abs(DE.x)*Math.sqrt(16-DE.length**2)/2/DE.length
  const x = M.x - DE.y/DE.x*(y-M.y)
  const B = new Point(x, y)
  return [
    new Angle(C, A, D).rad,
    new Angle(A, D, B).rad,
    new Angle(D, B, E).rad,
    new Angle(B, E, C).rad,
    new Angle(E, C, A).rad,
  ]
})()
const hues = (() => {
  const seed = Math.random() * 360
  const ra = [0, 1, 2, 3, 4].map((_, i) => {
    return (seed + i * 72)%360
  })
  let i = ra.length
  while (i) {
    let j = Math.floor(Math.random() * i);
    i--;
    [ra[i], ra[j]] = [ra[j], ra[i]];
  }
  return ra
})()

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
const circle_x = computed(() => {
  return x_min.value + circle_theta.value * r.value
})
const circle_y = computed(() => {
  return y0.value-r.value
})
const circle_origin = computed((): Point => {
  const O = new Point(circle_x.value, y0.value)
  const C = new Point(circle_x.value, circle_y.value)
  return rotate(O, C, circle_theta.value)
})
const circle_s = ref(0)
const circle = ref<SVGCircleElement>()
const circle_color = ref('hsl('+hues[0]+',66%,50%)')
const circle_theta = computed(() => {
  return 2 * Math.PI * circle_s.value
})
const circle_y_min = computed(() => {
  return y0.value-2*r.value
})
const rotate = (P: Point, C: Point, angle: number): Point => {
  return C.add(P.subtract(C).rotate(angle))
}
const square_Ps = (rad: number): [Point, Point, Point, Point] => {
  const I = new Point(2*r.value, 0)
  const J = new Point(0, 2*r.value)
  const n = Math.floor(rad / 2 / Math.PI)
  rad -= 2 * Math.PI * n
  const O = new Point(x_min.value, y0.value).add(I.scale(4*n))
  const Ps: [Point, Point, Point, Point] = [
    new Point(),
    new Point(),
    new Point(),
    new Point(),
  ]
  const complete = (k: number): [Point, Point, Point, Point] => {
    Ps[k] = rotate(Ps[(k+2)%4], Ps[(k+3)%4], -Math.PI/2)
    Ps[(++k)%4] = rotate(Ps[(k+2)%4], Ps[(k+3)%4], -Math.PI/2)
    return Ps
  }
  let k = 1
  if (rad <= Math.PI/2) {
    Ps[3] = O.add(I.scale(k))
    Ps[2] = Ps[3].subtract(J.rotate(rad))
    return complete(0)
  }
  rad -= Math.PI/2
  ++k
  if (rad <= Math.PI/2) {
    Ps[2] = O.add(I.scale(k))
    Ps[1] = Ps[2].subtract(J.rotate(rad))
    return complete(3)
  }
  rad -= Math.PI/2
  ++k
  if (rad <= Math.PI/2) {
    Ps[1] = O.add(I.scale(k++))
    Ps[0] = Ps[1].subtract(J.rotate(rad))
    return complete(2)
  }
  rad -= Math.PI/2
  ++k
  Ps[0] = O.add(I.scale(k))
  Ps[3] = Ps[0].subtract(J.rotate(rad))
  return complete(1)
}
const square_points = computed(() => {
  const Ps = square_Ps(square_theta.value)
  return Ps[0].x+','+Ps[0].y+' '+
  Ps[1].x+','+Ps[1].y+' '+
  Ps[2].x+','+Ps[2].y+' '+
  Ps[3].x+','+Ps[3].y+' '
})
const sqr_Ps = computed(() => {
  return square_Ps(square_theta.value)
})
const square_y_min = computed(() => {
  const Ps = square_Ps(square_theta.value)
  return Math.min(Ps[0].y, Ps[1].y, Ps[2].y, Ps[3].y)
})
const square_s = ref(0)
const square_color = ref('hsl('+hues[1]+',66%,50%)')
const square = ref<SVGRectElement>()
const square_theta = computed(() => {
  return 2 * Math.PI * square_s.value
})
const triangle_Ps = (rad: number): [Point, Point, Point] => {
  rad += Math.PI / 2
  const I = new Point(2*r.value, 0)
  const n = Math.floor(rad / 2 / Math.PI)
  rad -= 2 * Math.PI * n
  const O = new Point(x_min.value, y0.value).add(I.scale(3*n))
  if (rad <= 2 * Math.PI / 3) {
    return [
      O,
      rotate(O.subtract(I), O, rad),
      rotate(O.subtract(I), O, rad + Math.PI / 3),
    ]
  }
  rad -= 2 * Math.PI / 3
  if (rad <= 2 * Math.PI / 3) {
    return [
      rotate(O, O.add(I), rad),
      rotate(O, O.add(I), rad + Math.PI / 3),
      O.add(I),
    ]
  }
  rad -= 2 * Math.PI / 3
  return [
    rotate(O.add(I), O.add(I).add(I), rad + Math.PI / 3),
    O.add(I).add(I),
    rotate(O.add(I), O.add(I).add(I), rad),
  ]
}
const triangle_points = computed((): string => {
  const Ps = triangle_Ps(triangle_theta.value)
  return Ps[0].x+','+Ps[0].y+' '+
  Ps[1].x+','+Ps[1].y+' '+
  Ps[2].x+','+Ps[2].y
})
const trngl_Ps = computed(() => {
  return triangle_Ps(triangle_theta.value)
})
const triangle_s = ref(0)
const triangle_color = ref('hsl('+hues[2]+',66%,50%)')
const triangle = ref<SVGPolygonElement>()
const triangle_theta = computed(() => {
  return triangle_s.value * 2 * Math.PI
})
const triangle_y_min = computed(() => {
  const Ps = triangle_Ps(triangle_theta.value)
  return Math.min(Ps[0].y, Ps[1].y, Ps[2].y)
})
const reuleaux_s = ref(0)
const reuleaux_color = ref('hsl('+hues[3]+',66%,50%)')
const reuleaux = ref<SVGPathElement>()
const reuleaux_theta = computed(() => {
  return reuleaux_s.value * 2 * Math.PI
})
const reuleaux_Ps = (rad: number): [Point, Point, Point] => {
  const I = new Point(2 * r.value, 0)
  const J = new Point(0, 2 * r.value)
  const n = Math.floor(rad / 2 / Math.PI)
  rad -= n * 2 * Math.PI
  const O = new Point(x_min.value, y0.value).add(I.scale(Math.PI * n))
  const N = O.subtract(J)
  const Ps: [Point, Point, Point] = [
    new Point(),
    new Point(),
    new Point(),
  ]
  const complete = (k: number): [Point, Point, Point] => {
    Ps[k] = rotate(Ps[(k+2)%3], Ps[(k+1)%3], Math.PI / 3)
    return Ps
  }
  let done = 0
  if (rad <= Math.PI / 3) {
    Ps[1] = N.add(I.scale(rad + done))
    Ps[0] = rotate(Ps[1].add(J), Ps[1], rad)
    return complete(2)
  }
  rad -= Math.PI / 3
  done += Math.PI / 3
  if (rad <= Math.PI / 3) {
    Ps[2] = O.add(I.scale(done))
    Ps[1] = rotate(Ps[2].subtract(J), Ps[2], rad)
    return complete(0)
  }
  rad -= Math.PI / 3
  if (rad <= Math.PI / 3) {
    Ps[0] = N.add(I.scale(rad + done))
    Ps[2] = rotate(Ps[0].add(J), Ps[0], rad)
    return complete(1)
  }
  rad -= Math.PI / 3
  done += Math.PI / 3
  if (rad <= Math.PI / 3) {
    Ps[1] = O.add(I.scale(done))
    Ps[0] = rotate(Ps[1].subtract(J), Ps[1], rad)
    return complete(2)
  }
  rad -= Math.PI / 3
  if (rad <= Math.PI / 3) {
    Ps[2] = N.add(I.scale(rad + done))
    Ps[1] = rotate(Ps[2].add(J), Ps[2], rad)
    return complete(0)
  }
  rad -= Math.PI / 3
  done += Math.PI / 3
  Ps[0] = O.add(I.scale(done))
  Ps[2] = rotate(Ps[0].subtract(J), Ps[0], rad)
  return complete(1)
}
const rlx_Ps = computed(() => {
  return reuleaux_Ps(reuleaux_theta.value)
})
const reuleaux_y_min = computed(() => {
  return y0.value - 2 * r.value
})
const reuleaux_d = computed(() => {
  const R = 2 * r.value
  const Ps = reuleaux_Ps(reuleaux_theta.value)
  return 'M '+ Ps[0].x +' '+ Ps[0].y
    + ' A '+R+' '+R+' 0 0 0 ' + Ps[2].x +' '+ Ps[2].y
    + ' A '+R+' '+R+' 0 0 0 ' + Ps[1].x +' '+ Ps[1].y
    + ' A '+R+' '+R+' 0 0 0 ' + Ps[0].x +' '+ Ps[0].y
    + ' Z'
})
const tl = gsap.timeline()
const l1 = ref<HTMLElement>()
const l2 = ref<HTMLElement>()
const l3 = ref<HTMLElement>()
const l4 = ref<HTMLElement>()
const l5 = ref<HTMLElement>()
onMounted(() => {
  if (circle.value && square.value && triangle.value && reuleaux.value && penta.value &&
        l1.value && l2.value && l3.value && l4.value && l5.value)
  {
    tl.to(circle_s, {
      value: 1,
      duration: 5,
      ease: 'power1.inOut',
    })
    tl.to(circle_s, {
      value: 0,
      duration: 5,
      ease: 'power1.inOut',
    })
    tl.to(l2.value, {
      opacity: 1,
      duration: 2,
    })
    tl.to(square.value, {
      opacity: 1,
      duration: 2,
    })
    tl.to(square_s, {
      value: 1,
      duration: 5,
      ease: 'power1.inOut',
    })
    tl.to(square_s, {
      value: 0,
      duration: 5,
      ease: 'power1.inOut',
    })
    tl.to(square.value, {
      opacity: 0,
      duration: 2,
    })
    tl.to(l3.value, {
      opacity: 1,
      duration: 2,
    })
    tl.to(triangle.value, {
      opacity: 1,
      duration: 2,
    }, '<')
    tl.to(triangle_s, {
      value: 1,
      duration: 5,
      ease: 'power1.inOut',
    })
    tl.to(triangle_s, {
      value: 0,
      duration: 5,
      ease: 'power1.inOut',
    })
    tl.to(l4.value, {
      opacity: 1,
      duration: 2,
    })
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
    tl.to(l5.value, {
      opacity: 1,
      duration: 2,
    })
    tl.to(penta.value, {
      opacity: 1,
      duration: 2,
    })
    tl.to(reuleaux.value, {
      opacity: 0,
      duration: 2,
    }, '<')
    tl.to(penta_s, {
      value: 1,
      duration: 10,
      ease: 'power1.inOut',
    })
    tl.to(penta_s, {
      value: 0,
      duration: 10,
      ease: 'power1.inOut',
    })
  }
})
console.log('ANGLES', penta_angles)
const penta_Ps = (rad: number): [Point, Point, Point, Point, Point] => {
  const I = new Point(2 * r.value, 0)
  const J = new Point(0, 2 * r.value)
  const n = Math.floor(rad/2/Math.PI)
  rad -= n * 2 * Math.PI
  const O = new Point(penta_min.value, y0.value).add(I.scale(Math.PI * n))
  const N = O.subtract(J)
  let ans: [Point, Point, Point, Point, Point] = [new Point(), new Point(), new Point(), new Point(), new Point()]
  let done = 0
  const complete = (k: number): [Point, Point, Point, Point, Point] => {
    ans[k] = rotate(ans[(k+3)%5], ans[(k+4)%5], - penta_angles[(k+4)%5])
    ans[++k%5] = rotate(ans[(k+3)%5], ans[(k+4)%5], - penta_angles[(k+4)%5])
    ans[++k%5] = rotate(ans[(k+3)%5], ans[(k+4)%5], - penta_angles[(k+4)%5])
    return ans
  }
  if (rad <= penta_angles[0]) {
    ans[0] = N.add(I.scale(rad))
    ans[4] = ans[0].add(J.rotate(rad))
    return complete(1)
  }
  rad -= penta_angles[0]
  done += penta_angles[0]
  if (rad <= penta_angles[1]) {
    ans[1] = O.add(I.scale(done))
    ans[0] = ans[1].subtract(J.rotate(rad))
    return complete(2)
  }
  rad -= penta_angles[1]
  if (rad <= penta_angles[2]) {
    ans[2] = N.add(I.scale(done + rad))
    ans[1] = ans[2].add(J.rotate(rad))
    return complete(3)
  }
  rad -= penta_angles[2]
  done += penta_angles[2]
  if (rad <= penta_angles[3]) {
    ans[3] = O.add(I.scale(done))
    ans[2] = ans[3].subtract(J.rotate(rad))
    return complete(4)
  }
  rad -= penta_angles[3]
  if (rad <= penta_angles[4]) {
    ans[4] = N.add(I.scale(done + rad))
    ans[3] = ans[4].add(J.rotate(rad))
    return complete(0)
  }
  rad -= penta_angles[4]
  done += penta_angles[4]
  if (rad <= penta_angles[0]) {
    ans[0] = O.add(I.scale(done))
    ans[4] = ans[0].subtract(J.rotate(rad))
    return complete(1)
  }
  rad -= penta_angles[0]
  if (rad <= penta_angles[1]) {
    ans[1] = N.add(I.scale(done + rad))
    ans[0] = ans[1].add(J.rotate(rad))
    return complete(2)
  }
  rad -= penta_angles[1]
  done += penta_angles[1]
  if (rad <= penta_angles[2]) {
    ans[2] = O.add(I.scale(done))
    ans[1] = ans[2].subtract(J.rotate(rad))
    return complete(3)
  }
  rad -= penta_angles[2]
  if (rad <= penta_angles[3]) {
    ans[3] = N.add(I.scale(done + rad))
    ans[2] = ans[3].add(J.rotate(rad))
    return complete(4)
  }
  rad -= penta_angles[3]
  done += penta_angles[3]
  ans[4] = O.add(I.scale(done))
  ans[3] = ans[4].subtract(J.rotate(rad))
  return complete(0)
}
const penta_s = ref(0)
const penta_color = ref('hsl('+hues[4]+',66%,50%)')
const penta = ref<SVGPathElement>()
const penta_theta = computed(() => {
  return 2 * Math.PI * penta_s.value * 5 / 4
})
const penta_min = computed(() => {
  return x_min.value
})
const penta_y_min = computed(() => {
  return y0.value - 2 * r.value
})
const penta_points = computed(() => {
  const Ps = penta_Ps(penta_theta.value)
  return Ps[0].x+','+Ps[0].y+' '+
  Ps[1].x+','+Ps[1].y+' '+
  Ps[2].x+','+Ps[2].y+' '+
  Ps[3].x+','+Ps[3].y+' '+
  Ps[4].x+','+Ps[4].y
})
const penta_d = computed(() => {
  const R = 2 * r.value
  const Ps = penta_Ps(penta_theta.value)
  return 'M '+ Ps[0].x +' '+ Ps[0].y
    + ' A '+R+' '+R+' 0 0 0 ' + Ps[2].x +' '+ Ps[2].y
    + ' A '+R+' '+R+' 0 0 0 ' + Ps[4].x +' '+ Ps[4].y
    + ' A '+R+' '+R+' 0 0 0 ' + Ps[1].x +' '+ Ps[1].y
    + ' A '+R+' '+R+' 0 0 0 ' + Ps[3].x +' '+ Ps[3].y
    + ' A '+R+' '+R+' 0 0 0 ' + Ps[0].x +' '+ Ps[0].y
    + ' Z'
})
const pnt_Ps = computed(() => {
  return penta_Ps(penta_theta.value)
})
</script>

<template>
<div>
  <div class="svg-container">
  <svg ref="svgRoot" version="1.1" :viewBox="viewBox" class="svg-content">
  <defs ref="svgDefs"></defs>
  <line x1="0" :y1="y0-2*r" :x2="w" :y2="y0-2*r" stroke="black" class="line top"/>
  <line x1="0" :y1="y0" :x2="w" :y2="y0" stroke="black" class="line bottom"/>
  <g  ref="circle">
    <circle :cx="circle_x" :cy="circle_y" :r="r" class="circle"/>
    <line :x1="circle_x" :y1="circle_y" :x2="circle_origin.x" :y2="circle_origin.y" class="radius transparent"/>
    <circle ref="circle_origin" :cx="circle_origin.x" :cy="circle_origin.y" r="5" class="circle_dot"></circle>
    <line x1="0" :y1="circle_y_min" :x2="w" :y2="circle_y_min" :stroke="circle_color" class="line top"/>
  </g>
  <g ref="square" class="hidden" >
    <polygon :points="square_points" class="square" />  
    <circle ref="square_origin" :cx="sqr_Ps[0].x" :cy="sqr_Ps[0].y" r="5" class="square_dot"></circle>
    <line x1="0" :y1="square_y_min" :x2="w" :y2="square_y_min" :stroke="square_color" class="line top"/>
  </g>
  <g ref="triangle" class="hidden">
    <polygon :points="triangle_points" class="triangle"/>
    <circle ref="triangle_origin" :cx="trngl_Ps[0].x" :cy="trngl_Ps[0].y" r="5" class="triangle_dot"></circle>
    <line x1="0" :y1="triangle_y_min" :x2="w" :y2="triangle_y_min" :stroke="triangle_color" class="line top"/>
  </g>
  <g ref="reuleaux" class="hidden">
    <path :d="reuleaux_d" class="reuleaux"/>
    <circle ref="reuleaux_origin" :cx="rlx_Ps[0].x" :cy="rlx_Ps[0].y" r="5" class="reuleaux_dot"></circle>
    <line x1="0" :y1="reuleaux_y_min" :x2="w" :y2="reuleaux_y_min" :stroke="reuleaux_color" class="line top"/>
  </g>
  <g ref="penta" class="hidden">
    <path :d="penta_d" class="penta"/>
    <polygon :points="penta_points" ref="pentacle" class="penta transparent" />
    <circle ref="pentacle_origin" :cx="pnt_Ps[4].x" :cy="pnt_Ps[4].y" r="5" class="penta_dot"></circle>
    <line x1="0" :y1="penta_y_min" :x2="w" :y2="penta_y_min" :stroke="penta_color" class="line top"/>
  </g>
  </svg>
  </div>
  <div ref="l1">Une roue ronde tourne entre deux lignes parallèles fixes,</div>
  <div ref="l2" class="hidden">mais pas une roue carré,<span ref="l3" class="hidden"> ni une roue triangle,</span></div>
  <div ref="l4" class="hidden">à moins d'arrondir correctement les côtés.</div>
  <div ref="l5" class="hidden">On peut augmenter le nombres de côtés...</div>
</div>
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
.circle_dot {
  fill: v-bind(circle_color);
}
.hidden {
  opacity: 0;
}
.square, .triangle, .reuleaux, .penta {
  fill: transparent;
  stroke-width:3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.square {
  stroke: v-bind(square_color);
}
.square_dot {
  fill: v-bind(square_color);
}
.triangle {
  stroke: v-bind(triangle_color);
}
.triangle_dot {
  fill: v-bind(triangle_color);
}
.reuleaux {
  stroke: v-bind(reuleaux_color);
}
.reuleaux_dot {
  fill: v-bind(reuleaux_color);
}
.penta {
  stroke: v-bind(penta_color);
}
.penta_dot {
  fill: v-bind(penta_color);
}
.transparent {
  opacity: 0.33;
}
.none {
  display: none;
}
</style>
