<script setup lang="ts">
import { ref, nextTick, computed, onMounted } from 'vue'
import { gsap, Power1 } from 'gsap'
import { Point, Angle } from '@mathigon/euclid'
import { useMainStore } from '../stores/main'
const mainStore = useMainStore()
const props = defineProps({
  autoStart: {
    type: Boolean,
    default: false,
  }
})
const w = ref(0), h = ref(0)
const svgWidth = ref(0)
const svgHeight = ref(0)
const svgContainer = ref<HTMLElement>()
const line_top = ref<SVGElement>()
const svgRoot = ref<SVGElement>()
const svgDefs = ref<SVGDefsElement>()
const viewBox = computed(() => {
  return "0 0 "+svgWidth.value+" "+svgHeight.value
})
const penta_angles = (() => {
  const alpha = (3 + 4 * Math.random()) * Math.PI / 25
  const beta  = 2 * Math.PI / 5 - alpha
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
  const rect = svgContainer.value!.getBoundingClientRect()
  svgWidth.value  = rect.right-rect.left
  svgHeight.value = rect.bottom-rect.top
}
onMounted(() => {
  resizeListener()
  nextTick(() => {
    mainStore.display()
  })
  props.autoStart && timeline()
})
const dy = computed(() => {
  return svgHeight.value / 24
})
const r = computed(() => {
  return Math.min(svgHeight.value / 4, svgWidth.value / 10.1)
})
const y0 = computed(() => {
  return svgHeight.value / 2 + r.value
})
const x_min = computed(() => {
  return (svgWidth.value - 6 * r.value)/2
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
const circle_done = computed(() => {
  return circle_theta.value * r.value
})
const circle_dy = computed(() => {
  return 3 * dy.value
})
const square_dy = computed(() => {
  return 1 * dy.value
})
const triangle_dy = computed(() => {
  return 2 * dy.value
})
const reuleaux_dy = computed(() => {
  return 4 * dy.value
})
const penta_dy = computed(() => {
  return 5 * dy.value
})
const rotate = (P: Point, C: Point, angle: number): Point => {
  return C.add(P.subtract(C).rotate(angle))
}
const square_Ps = (theta: number): [Point, Point, Point, Point] => {
  const I = new Point(2*r.value, 0)
  const J = new Point(0, 2*r.value)
  const n = Math.floor(theta / 2 / Math.PI)
  theta -= 2 * Math.PI * n
  const O = new Point(x_min.value, y0.value).add(I.scale(4*n))
  const Ps: [Point, Point, Point, Point] = [
    new Point(),
    new Point(),
    new Point(),
    new Point(),
  ]
  for (let k=0; k<4; ++k) {
    if (theta <= Math.PI/2) {
      Ps[k%4] = O.add(I.scale(k%4))
      Ps[(k+1)%4] = Ps[k%4].subtract(J.rotate(theta))
      Ps[(k+2)%4] = rotate(Ps[k%4], Ps[(k+1)%4], Math.PI/2)
      Ps[(k+3)%4] = rotate(Ps[(k+1)%4], Ps[(k+2)%4], Math.PI/2)
      break
    }
    theta -= Math.PI/2
  }
  return Ps
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
const square_done = computed(() => {
  return Math.floor(square_theta.value/Math.PI*2)*2*r.value
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
const triangle_done = computed(() => {
  return Math.floor((Math.PI/2+triangle_theta.value)/2/Math.PI*3)*2*r.value
})
const triangle_y_min = computed(() => {
  const Ps = triangle_Ps(triangle_theta.value)
  return Math.min(Ps[0].y, Ps[1].y, Ps[2].y)
})
const reuleaux_s = ref(0)
const reuleaux_color = ref('hsl('+hues[3]+',66%,50%)')
const reuleaux = ref<SVGPathElement>()
const reuleaux_done_ref = ref<HTMLElement>()
const reuleaux_theta = computed(() => {
  return reuleaux_s.value * 2 * Math.PI
})
const reuleaux_Ps = (theta: number): [Point, Point, Point] => {
  const I = new Point(2 * r.value, 0)
  const J = new Point(0, 2 * r.value)
  const n = Math.floor(theta / 2 / Math.PI)
  theta -= n * 2 * Math.PI
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
  if (theta <= Math.PI / 3) {
    Ps[1] = N.add(I.scale(theta + done))
    Ps[0] = rotate(Ps[1].add(J), Ps[1], theta)
    return complete(2)
  }
  theta -= Math.PI / 3
  done += Math.PI / 3
  if (theta <= Math.PI / 3) {
    Ps[2] = O.add(I.scale(done))
    Ps[1] = rotate(Ps[2].subtract(J), Ps[2], theta)
    return complete(0)
  }
  theta -= Math.PI / 3
  if (theta <= Math.PI / 3) {
    Ps[0] = N.add(I.scale(theta + done))
    Ps[2] = rotate(Ps[0].add(J), Ps[0], theta)
    return complete(1)
  }
  theta -= Math.PI / 3
  done += Math.PI / 3
  if (theta <= Math.PI / 3) {
    Ps[1] = O.add(I.scale(done))
    Ps[0] = rotate(Ps[1].subtract(J), Ps[1], theta)
    return complete(2)
  }
  theta -= Math.PI / 3
  if (theta <= Math.PI / 3) {
    Ps[2] = N.add(I.scale(theta + done))
    Ps[1] = rotate(Ps[2].add(J), Ps[2], theta)
    return complete(0)
  }
  theta -= Math.PI / 3
  done += Math.PI / 3
  Ps[0] = O.add(I.scale(done))
  Ps[2] = rotate(Ps[0].subtract(J), Ps[0], theta)
  return complete(1)
}
const reuleaux_done = computed( () => {
  let theta = reuleaux_theta.value
  const n = Math.floor(theta / 2 / Math.PI)
  theta -= n * 2 * Math.PI
  let done = n * Math.PI * 2 * r.value
  if (theta <= Math.PI / 3) {
    return done + theta * 2 * r.value
  }
  theta -= Math.PI / 3
  done += Math.PI / 3 * 2 * r.value
  if (theta <= Math.PI / 3) {
    return done
  }
  theta -= Math.PI / 3
  if (theta <= Math.PI / 3) {
    return done + theta * 2 * r.value
  }
  theta -= Math.PI / 3
  done += Math.PI / 3 * 2 * r.value
  if (theta <= Math.PI / 3) {
    return done
  }
  theta -= Math.PI / 3
  if (theta <= Math.PI / 3) {
    return done + theta * 2 * r.value
  }
  theta -= Math.PI / 3
  done += Math.PI / 3 * 2 * r.value
  return done
})
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
const penta_s = ref(0)
const penta_color = ref('hsl('+hues[4]+',66%,50%)')
const penta = ref<SVGPathElement>()
const penta_done_ref = ref<HTMLElement>()
const penta_theta = computed(() => {
  return 2 * Math.PI * penta_s.value
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
const penta_done = computed(() => {
  let theta = penta_theta.value
  const n = Math.floor(theta/2/Math.PI)
  let done = n * 2 * Math.PI * r.value
  theta -= n * 2 * Math.PI
  if (theta <= penta_angles[0]) {
    return done + theta * 2 * r.value
  }
  theta -= penta_angles[0]
  done += penta_angles[0] * 2 * r.value
  if (theta <= penta_angles[1]) {
    return done
  }
  theta -= penta_angles[1]
  if (theta <= penta_angles[2]) {
    return done + theta * 2 * r.value
  }
  theta -= penta_angles[2]
  done += penta_angles[2] * 2 * r.value
  if (theta <= penta_angles[3]) {
    return done
  }
  theta -= penta_angles[3]
  if (theta <= penta_angles[4]) {
    return done + theta * 2 * r.value
  }
  theta -= penta_angles[4]
  done += penta_angles[4] * 2 * r.value
  if (theta <= penta_angles[0]) {
    return done
  }
  theta -= penta_angles[0]
  if (theta <= penta_angles[1]) {
    return done + theta * 2 * r.value
  }
  theta -= penta_angles[1]
  done += penta_angles[1] * 2 * r.value
  if (theta <= penta_angles[2]) {
    return done
  }
  theta -= penta_angles[2]
  if (theta <= penta_angles[3]) {
    return done + theta * 2 * r.value
  }
  theta -= penta_angles[3]
  done += penta_angles[3] * 2 * r.value
  return done
})
const l1 = ref<HTMLElement>()
const A = ref<HTMLElement>()
const A1 = ref<HTMLElement>()
const A2 = ref<HTMLElement>()
const A3 = ref<HTMLElement>()
const A4 = ref<HTMLElement>()
const A5 = ref<HTMLElement>()
const B = ref<HTMLElement>()
const B1 = ref<HTMLElement>()
const B2 = ref<HTMLElement>()
const B3 = ref<HTMLElement>()
const C = ref<HTMLElement>()
const C1 = ref<HTMLElement>()
const C2 = ref<HTMLElement>()
const timeline = (): gsap.core.Timeline => {
  const tl = gsap.timeline()
  if (circle.value && square.value && triangle.value && reuleaux.value && penta.value &&
    A.value && A1.value && A2.value && A3.value && A4.value && A5.value &&
    B.value && B1.value && B2.value && B3.value &&
    C.value && C1.value && C2.value &&
    reuleaux_done_ref.value && penta_done_ref.value &&
    line_top.value && l1.value
  ) {
    const opacity = (level: number) => {
      return {
        opacity: level,
        duration: 1,
        ease: Power1.easeInOut,
      }
    }
    const f1 = (what: gsap.TweenTarget, what_s: gsap.TweenTarget, position='+=2') => {
      tl.to(what, opacity(1)).to(what_s, {
        value: 1,
        duration: 5,
        ease: Power1.easeInOut,
      }, position)
    }
    f1(square.value!, square_s)
    tl.to( A1.value!, opacity(1))
    f1(triangle.value!, triangle_s)
    tl.to( A2.value!, opacity(1)).to( A3.value!, opacity(1), '<')
    f1(circle.value!, circle_s)
    tl.to( A4.value!, opacity(1)).to( A5.value!, opacity(1), '<')
    f1(reuleaux.value!, reuleaux_s)
    tl.to( B1.value!, opacity(1))
    f1(penta.value!, penta_s)
    tl.to( B2.value!, opacity(1)).to( B3.value!, opacity(1), '<')
    tl.to(square.value, opacity(0)).to(triangle.value, opacity(0), '<')
    tl.to(circle_s, { value: 0, duration: 1,})
    tl.to(reuleaux_s, { value: 0.45, duration: 1,}, '<')
    tl.to(reuleaux_done_ref.value!, opacity(0), '<')
    tl.to(penta_done_ref.value!, opacity(0), '<')
    tl.to(A1.value, opacity(0),'<').to(A3.value, opacity(0), '<')
    tl.to(l1.value, opacity(0), '+=2').to(A.value, opacity(0), '<')
    tl.to(B.value, opacity(0), '<')
    tl.to( C1.value!, opacity(1)).to(line_top.value!, opacity(1))
    tl.to( C2.value!, opacity(1), '+=2.5')
  }
  return tl
}
const $emit = defineEmits([
  'mounted'
])
onMounted(() => {
  resizeListener()
  if (props.autoStart) {
    timeline()
  } else {
    $emit('mounted', timeline, 'Barbier2')
  }
})
defineExpose({ resizeListener })
</script>
<template>
<div ref="main" class="main">
  <div class="text">
    <div ref="l1">Quelle est la distance parcourue en un tour ?</div>
    <div ref="A">
      <span ref="A1" class="hidden square">Carré : 4</span>
      <span ref="A2" class="hidden">, </span>
      <span ref="A3" class="hidden triangle">Triangle : 3</span>
      <span ref="A4" class="hidden">, </span>
      <span ref="A5" class="hidden circle">Cercle : 3,14...</span>
    </div>
    <div ref="B">
      <span ref="B1" class="hidden reuleaux">Triangle de Reuleaux : 3,14...</span>
      <span ref="B2" class="hidden">, </span>
      <span ref="B3" class="hidden penta">«Pentarond» : 3,14...</span>
    </div>
    <div ref="C" class="absolute">
      <div ref="C1" class="hidden">Une roue de <b>diamètre constant d</b> avance de <span class="greek">π×</span><b>d</b> à chaque tour</div>
      <div ref="C2" class="hidden">J.-É. Barbier a découvert ce théorème mathématique<br/> en étudiant les aiguilles de Buffon</div>
    </div>
  </div>
  <div ref="svgContainer" class="svg-container">
    <svg ref="svgRoot" version="1.1" :viewBox="viewBox" class="svg-content">
      <defs ref="svgDefs"></defs>
      <g  ref="line_top" class="hidden">
        <line x1="0" :y1="y0-2*r" :x2="w" :y2="y0-2*r" stroke="black" class="line top"/>
        <line :x1="x_min-4*r/3" :y1="y0" :x2="x_min-4*r/3" :y2="y0-2*r" stroke="black" class="line top"/>
        <text dx="-1.75ex" dy="0.5ex" :x="x_min-4*r/3" :y="y0-r">d</text>
      </g>
      <line x1="0" :y1="y0" :x2="w" :y2="y0" stroke="black" class="line bottom"/>
      <g ref="square" class="hidden" >
        <polygon :points="square_points" class="square" />  
        <circle ref="square_origin" :cx="sqr_Ps[0].x" :cy="sqr_Ps[0].y" r="5" class="square_dot"></circle>
        <line :x1="x_min" :y1="y0+square_dy" :x2="x_min+square_done" :y2="y0+square_dy" :stroke="square_color" class="line"/>
      </g>
      <g ref="triangle" class="hidden">
        <polygon :points="triangle_points" class="triangle"/>
        <circle ref="triangle_origin" :cx="trngl_Ps[0].x" :cy="trngl_Ps[0].y" r="5" class="triangle_dot"></circle>
        <line :x1="x_min" :y1="y0+triangle_dy" :x2="x_min+triangle_done" :y2="y0+triangle_dy" :stroke="triangle_color" class="line"/>
      </g>
      <g  ref="circle" class="hidden">
        <circle :cx="circle_x" :cy="circle_y" :r="r" class="circle"/>
        <line :x1="circle_x" :y1="circle_y" :x2="circle_origin.x" :y2="circle_origin.y" class="radius transparent"/>
        <circle ref="circle_origin" :cx="circle_origin.x" :cy="circle_origin.y" r="5" class="circle_dot"></circle>
        <line :x1="x_min" :y1="y0+circle_dy" :x2="x_min+circle_done" :y2="y0+circle_dy" :stroke="circle_color" class="line"/>
      </g>
      <g ref="reuleaux" class="hidden">
        <path :d="reuleaux_d" class="reuleaux"/>
        <circle ref="reuleaux_origin" :cx="rlx_Ps[0].x" :cy="rlx_Ps[0].y" r="5" class="reuleaux_dot"></circle>
        <line ref="reuleaux_done_ref" :x1="x_min" :y1="y0+reuleaux_dy" :x2="x_min+reuleaux_done" :y2="y0+reuleaux_dy" :stroke="reuleaux_color" class="line"/>
      </g>
      <g ref="penta" class="hidden">
        <path :d="penta_d" class="penta"/>
        <polygon :points="penta_points" ref="pentacle" class="penta transparent" />
        <circle ref="penta_origin" :cx="pnt_Ps[4].x" :cy="pnt_Ps[4].y" r="5" class="penta_dot"></circle>
        <line ref="penta_done_ref" :x1="x_min" :y1="y0+penta_dy" :x2="x_min+penta_done" :y2="y0+penta_dy" :stroke="penta_color" class="line"/>
      </g>
    </svg>
  </div>
</div>
</template>

<style scoped>
.main {
  font-size: 90%;
  display: flex;
  flex-flow: column;
}
.svg-container {
  flex: 1;
  width: 100%;
}
.svg-content {
display: inline-block;
}
.line {
  stroke-width:3;
  stroke-linecap: round;
}
.top {
   stroke-dasharray: 10px;
}
.circle, .radius {
  color: v-bind(circle_color);
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
  color: v-bind(square_color);
}
.square_dot {
  fill: v-bind(square_color);
}
.triangle {
  stroke: v-bind(triangle_color);
  color: v-bind(triangle_color);
}
.triangle_dot {
  fill: v-bind(triangle_color);
}
.reuleaux {
  stroke: v-bind(reuleaux_color);
  color: v-bind(reuleaux_color);
}
.reuleaux_dot {
  fill: v-bind(reuleaux_color);
}
.penta {
  stroke: v-bind(penta_color);
  color: v-bind(penta_color);
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
.sans {
  font-family: sans-serif;
}
.main {
  width: 100%;
  height: 100%;
}
.absolute {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
</style>
