<script lang="ts" setup>
import { Ref, ref, onMounted, onUnmounted } from 'vue'
import { gsap, Power1 } from 'gsap'
const props = defineProps({
  size: {
    type: Number,
    default: 96,
  },
  autoStart: {
    type: Boolean,
    default: false,
  }
})
const w01  = ref<HTMLElement>()
const w02  = ref<HTMLElement>()
const w02b = ref<HTMLElement>()
const w03  = ref<HTMLElement>()
const w04  = ref<HTMLElement>()
const w05  = ref<HTMLElement>()
const w06  = ref<HTMLElement>()
const w07  = ref<HTMLElement>()
const w08  = ref<HTMLElement>()
const w09  = ref<HTMLElement>()
const w10  = ref<HTMLElement>()
const w11  = ref<HTMLElement>()
const w11b = ref<HTMLElement>()
const w12  = ref<HTMLElement>()
const w13  = ref<HTMLElement>()
const w13b = ref<HTMLElement>()
const w14  = ref<HTMLElement>()
const w15  = ref<HTMLElement>()
const w15b = ref<HTMLElement>()
const w16  = ref<HTMLElement>()
const w17  = ref<HTMLElement>()
const w18  = ref<HTMLElement>()
const w19  = ref<HTMLElement>()
const w19b = ref<HTMLElement>()
const w20  = ref<HTMLElement>()
const w21  = ref<HTMLElement>()
const w22  = ref<HTMLElement>()
const w23  = ref<HTMLElement>()
const w23b = ref<HTMLElement>()
const w24  = ref<HTMLElement>()
const w25  = ref<HTMLElement>()
const w25b = ref<HTMLElement>()
const w26  = ref<HTMLElement>()
const w27  = ref<HTMLElement>()
const w28  = ref<HTMLElement>()
const w29  = ref<HTMLElement>()
const w30  = ref<HTMLElement>()
const w31  = ref<HTMLElement>()
const w31b = ref<HTMLElement>()
const n00  = ref<HTMLElement>()
const n00b = ref<HTMLElement>()
const n01  = ref<HTMLElement>()
const n01b = ref<HTMLElement>()
const n02  = ref<HTMLElement>()
const n03  = ref<HTMLElement>()
const n04  = ref<HTMLElement>()
const n05  = ref<HTMLElement>()
const n06  = ref<HTMLElement>()
const n07  = ref<HTMLElement>()
const n08  = ref<HTMLElement>()
const n09  = ref<HTMLElement>()
const n10 = ref<HTMLElement>()
const n11 = ref<HTMLElement>()
const n12 = ref<HTMLElement>()
const n13 = ref<HTMLElement>()
const n14 = ref<HTMLElement>()
const n15 = ref<HTMLElement>()
const n16 = ref<HTMLElement>()
const n17 = ref<HTMLElement>()
const n18 = ref<HTMLElement>()
const n19 = ref<HTMLElement>()
const n20 = ref<HTMLElement>()
const n21 = ref<HTMLElement>()
const n22 = ref<HTMLElement>()
const n23 = ref<HTMLElement>()
const n24 = ref<HTMLElement>()
const n25 = ref<HTMLElement>()
const n26 = ref<HTMLElement>()
const n27 = ref<HTMLElement>()
const n28 = ref<HTMLElement>()
const n29 = ref<HTMLElement>()
const n30 = ref<HTMLElement>()
const n31 = ref<HTMLElement>()
const n31b = ref<HTMLElement>()
const refs = {
  l0:     [ w01, w02, w03, w04, w05, w06, w07, w08, w09, w10, w11 ],
  l0_b:   [ w02b, w11b ],
  l0_all: [ w01, w02, w02b, w03, w04, w05, w06, w07, w08, w09, w10, w11, w11b ],
  l1:     [ w12, w13, w14, w15 ],
  l1_b:   [ w13b, w15b ],
  l1_all: [ w12, w13, w13b, w14, w15, w15b ],
  l2:     [ w16, w17, w18, w19, w20, w21, w22, w23 ],
  l2_b:   [ w19b, w23b ],
  l2_all: [ w16, w17, w18, w19, w19b, w20, w21, w22, w23, w23b ],
  l3:     [ w24, w25, w26, w27, w28, w29, w30, w31 ],
  l3_b:   [ w25b, w31b ],
  l3_all: [ w24, w25, w25b, w26, w27, w28, w29, w30, w31, w31b ],
  w:      [ w01, w02, w03, w04, w05, w06, w07, w08, w09, w10, w11,
            w12, w13, w14, w15,
            w16, w17, w18, w19, w20, w21, w22, w23,
            w24, w25, w25b, w26, w27, w28, w29, w30, w31,
          ],
  w_all:  [ w01, w02, w02b, w03, w04, w05, w06, w07, w08, w09, w10, w11, w11b,
            w12, w13, w13b, w14, w15, w15b,
            w16, w17, w18, w19, w19b, w20, w21, w22, w23, w23b,
            w24, w25, w25b, w26, w27, w28, w29, w30, w31, w31b 
  ] as Ref<HTMLElement>[],
  n0:     [ n01, n02, n03, n04, n05, n06, n07, n08, n09, n10, n11 ],
  n1:     [ n12, n13, n14, n15 ],
  n2:     [ n16, n17, n18, n19, n20, n21, n22, n23 ],
  n3:     [ n24, n25, n26, n27, n28, n29, n30, n31 ],
  n_alt:  [
            n01, n02, n03, n04, n05, n06, n07, n08, n09, n10, n11,
            n12, n13, n14, n15,
            n16, n17, n18, n19, n20, n21, n22, n23,
            n24, n25, n26, n27, n28, n29, n30, n31
  ],
  n:      [
    n00, n01, n02, n03, n04, n05, n06, n07, n08, n09,
    n10, n11, n12, n13, n14, n15, n16, n17, n18, n19,
    n20, n21, n22, n23, n24, n25, n26, n27, n28, n29,
    n30, n31
  ],
  n_b:    [
    n00b, n01b, n31b
  ],
  n_all:  [
    n00, n00b, n01, n01b, n02, n03, n04, n05, n06, n07, n08, n09, n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, n20, n21, n22, n23, n24, n25, n26, n27, n28, n29, n30, n31, n31b
  ]
}
const reset_aspect = () => {
  refs.w_all.forEach((r) => {
    var e: HTMLElement = r.value!
    e.style.position = 'static'
    e.style.color = ''
    e.style.borderColor = ''
    e.style.opacity = '1'
  })
  refs.n_all.forEach((r) => {
    var e: HTMLElement = r.value!
    e.style.opacity = '0'
  })
}
let color = 'hsl('+360*Math.random()+',66%,50%)'
const timeline_first_line = (duration: number) => {
  let d = duration
  const tl = gsap.timeline()
  const f_1 = (ew: HTMLElement, en: HTMLElement, label: string) => {
    tl.to(ew, {
      color: color,
      borderColor: color,
      duration: d,
    }, label).fromTo(en, {
      color: color,
      duration: 0,
    }, {
      opacity: 1,
      duration: d,
    })
    d *= 0.9
  }
  if (!style_w01__) {
    return tl
  }
  const c  = style_w01__.getPropertyValue('color')
  const bc = style_w01__.getPropertyValue('borderColor')
  const f_2 = (pw: HTMLElement, _: HTMLElement, label: string) => {
    tl.to(pw, {
      color: c,
      borderColor: bc,
      duration: d,
    }, label).to(pw, {
      color: '',
      borderColor: '',
      duration: 0,
    })
  }
  var pw: HTMLElement|null = null
  var pn: HTMLElement|null = null
  var i = 1
  var label = ''+i++
  tl.addLabel(label)
  for (let [ewr, enr] of [[w01, n01], [w02, n02], [w03, n03], [w04, n04], [w05, n05], [w06, n06], [w07, n07], [w08, n08], [w09, n09], [w10, n10], [w11, n11]
  ]) {
    var ew = ewr.value!
    var en = enr.value!
    f_1(ew, en, label)
    pw && pn && f_2(pw, pn, label)
    pw = ew
    pn = en
    label = ''+i++
    tl.addLabel(label)
  }
  pw && pn && f_2(pw, pn, label)
  return tl
}
const timeline_hide_words = (duration: number, rs: Ref<HTMLElement>[]) => {
  var tl = gsap.timeline()
  for (let r of rs) {
    tl.to(r.value!, {
      opacity: 0,
      duration: duration*(1+2*Math.random())/2,
      ease:Power1.easeInOut,
    }, 0)
  }
  return tl
}
function generator_maker<Type> (rs: Ref<Type>[]) {
  return function * () {
    for (let entry of rs) {
      yield entry.value!
    }
  }
}
const timeline_other_line = (
  duration: number,
  rws: () => IterableIterator<HTMLElement>,
  rns: () => IterableIterator<HTMLElement>
) => {
  const tl = gsap.timeline()
  var label = '1'
  tl.addLabel(label)
  var f_1w = (ew: HTMLElement, label: string) => {
    tl.to(ew, {
      color: color,
      borderColor: color,
      duration: duration,
    }, label)
  }
  var f_1n = (en: HTMLElement, label: string) => {
    tl.fromTo(en, {
      color: color,
    }, {
      opacity: 1,
      duration: duration,
    }, label)
  }
  if (!style_w01__) {
    return tl
  }
  const c =  style_w01__.getPropertyValue('color')
  const bc = style_w01__.getPropertyValue('borderColor')
  var f_2 = (pw: HTMLElement, pn: HTMLElement, label?: string) => {
    tl.to(pw, {
      color: c,
      borderColor: bc,
      duration: duration,
    }, label)          
    tl.to(pw, {
      color: '',
      duration: 0,
    })
    if (style_w01__) {
      tl.to(pn, {
        color: style_w01__.getPropertyValue('color'),
        duration: duration,
      }, label).to(pn, {
        color: '',
        duration: 0,
      })      
    }
  }
  for(let e of rws()) {
    f_1w(e, label)
  }
  label = '2'
  tl.addLabel(label)
  for(let e of rns()) {
    f_1n(e, label)
  }
  label = '3'
  tl.addLabel(label, '+='+duration)
  const rng = rns()
  for(let e of rws()) {
    f_2(e, rng.next().value.value, label)
  }
  return tl
}
const timeline_center = (duration: number) => {
  const tl = gsap.timeline()
  const t = (window.innerHeight/2.5-props.size)+'px'
  const f = (en: HTMLElement) => {
    tl.to(en, {
      top: t,
      duration: duration,
      ease: Power1.easeInOut,
    }, 0)
  }
  for (let r of refs.n_all) {
    f(r.value!)
  }
  tl.to(n31b.value!, {
    opacity: 1,
    duration: duration,
    ease: Power1.easeIn,
  }, 0)
  return tl
}
const timeline_place_numbers = (duration: number) => {
  const tl = gsap.timeline()
  const e1: HTMLElement = n01.value!
  var r = e1.getBoundingClientRect()
  const w = r.right - r.left
  const l = (window.innerWidth/2-16*w)
  const colors: { [key: string]: string } = {}
  const h = 360*Math.random()
  for (var i = 0; i < 10; ++i) {
    colors[''+i] = 'hsl('+(h+i*36)%360+',66%,50%)'
  }
  {
    let i = Object.keys(colors).length, j;
    while (i) {
      j = Math.floor(Math.random() * i);
      i--;
      [colors[''+i], colors[''+j]] = [
        colors[''+j], colors[''+i]];
    }
  }
  var en: HTMLElement = n31.value!
  r = en.getBoundingClientRect()
  const t = (3 * r.bottom - 2 * r.top)+'px'
  en = n00.value!
  en.style.display = 'block'
  en.style.position = 'absolute'
  en.style.zIndex = '1099'
  tl.to(en, {
    top: t,
    left: (l-4*w)+'px',
    duration: 0,
  })
  tl.to(en, {
    opacity: 1,
    duration: duration,
    ease: Power1.easeIn,
  })
  en = n00b.value!
  en.style.display = 'block'
  en.style.position = 'absolute'
  en.style.zIndex = '1099'
  tl.to(en, {
    top: t,
    left: (l-2*w)+'px',
    duration: 0,
  })
  tl.to(en, {
    opacity: 1,
    duration: duration,
    ease: Power1.easeIn,
  })
  e1.style.zIndex = '1099'
  tl.to(e1, {
    color: colors[e1.textContent || ''],
    top: t,
    left: l+'px',
    duration: duration,
    ease: Power1.easeInOut,
  })
  en = n01b.value!
  en.style.display = 'block'
  en.style.position = 'absolute'
  en.style.zIndex = '1099'
  tl.to(en, {
    top: t,
    left: (l+w)+'px',
    duration: 0,
  })
  tl.to(en, {
    opacity: 1,
    duration: duration,
    ease: Power1.easeIn,
  }, "<33%")
  var i = 0
  for (let r of refs.n) {
    if (i>1) {
      en = r.value!
      en.style.zIndex = ''+(1100-i)
      tl.to(en, {
        top: t,
        color: colors[en.textContent || ''],
        left: (l+i*w)+'px',
        duration: duration,
        ease: Power1.easeInOut,
      }, ">-="+(33+(i-2)/29*67)+"%")
    }
    ++i
  }
  en = n31b.value!
  en.style.display = 'block'
  en.style.position = 'absolute'
  en.style.zIndex = '1099'
  tl.to(en, {
    top: t,
    left: (l+32*w)+'px',
    duration: 0,
  })
  return tl
}
const timeline = () => {
  const tl = gsap.timeline()
  tl.call(() => {
    reset_aspect()
    reset_layout()
  })
  style_w01__ = window.getComputedStyle(w01.value!, null)
  tl.add(timeline_first_line(2))
  tl.add(timeline_other_line(
    2,
    generator_maker(refs.l1),
    generator_maker(refs.n1)
  ))
  tl.add(timeline_other_line(
    2,
    generator_maker(refs.l2),
    generator_maker(refs.n2)
  ), '<2')
  tl.add(timeline_other_line(
    2,
    generator_maker(refs.l3),
    generator_maker(refs.n3)
  ), '<2')
  tl.add(timeline_hide_words(2, refs.w_all))
  tl.add(timeline_place_numbers(2), '+=0.5')
  tl.add(timeline_center(2))
  tl.to({},{duration:2})
  return tl
}
var style_w01__: CSSStyleDeclaration | null = null
const main = ref<HTMLElement>()
const numbers = ref<HTMLElement>()
const reset_layout = () => {
  var T = 100;
  ;[
    [ generator_maker(refs.l0), generator_maker(refs.n0)],
    [ generator_maker(refs.l1), generator_maker(refs.n1)],
    [ generator_maker(refs.l2), generator_maker(refs.n2)],
    [ generator_maker(refs.l3), generator_maker(refs.n3)],
  ].forEach((gwn) => {
    var top = Number.MAX_SAFE_INTEGER
    var bottom = Number.MAX_SAFE_INTEGER
    var height
    var position
    const gn = gwn[1]()
    for (let ew of gwn[0]()) {
      var rw = ew.getBoundingClientRect()
      if (rw.top<top) {
        top = rw.top
      }
      if (rw.bottom<bottom) {
        bottom = rw.bottom
      }
      var en = gn.next().value!
      var rn = en.getBoundingClientRect()
      height = rn.bottom - rn.top
      position = ((rw.left+rw.right)/2-(rn.right-rn.left)/2)+'px'
      en.style.position = "absolute"
      en.style.left = position
      ew.classList.remove('status1', 'status2', 'status3')
      en.classList.remove('status1', 'status2', 'status3')
    }
    if (height) {
      position = (top - props.size - 0.65 * (bottom - top)-height)+'px'
    }
    if (position) {
      for (let e of gwn[1]()) {
        e.style.top = position
      }
    }
    T += 100
  })
}
const $emit = defineEmits([
  'mounted'
])
onMounted(() => {
  resizeListener()
  if (props.autoStart) {
    timeline()
  } else {
    $emit('mounted', timeline, 'Pi2')
  }
})
onUnmounted(() => {
  resizeListener()
})

const l0 = ref<HTMLElement>()
const l1 = ref<HTMLElement>()
const l2 = ref<HTMLElement>()
const l3 = ref<HTMLElement>()
const words = ref<HTMLElement>()
const resizeListener = () => {
  console.log('RESIZE POETRY')
  const m = main.value
  if (m) {
    m.style.fontSize = ''
    const style = window.getComputedStyle(m, null)
    let i = parseFloat(style.getPropertyValue('font-size'))
    const r = m.getBoundingClientRect()
    const w = r.right - r.left
    console.log('font-size', i, w*0.0345)
    if (i>w*0.034) {
      i = w*0.034
      m.style.fontSize = i + 'px'
    }
  }
}
defineExpose( { resizeListener } )
onMounted(() => {
  resizeListener()
})
</script>

<template>
  <div ref = "main" class="main">
    <div ref="words">
      <div ref="l0" class="verse">
        <span ref="w01">Que</span>&nbsp;
        <span ref="w02">j</span>
        <span ref="w02b">'</span>
        <span ref="w03">aime</span>&nbsp;
        <span ref="w04">à</span>&nbsp;
        <span ref="w05">faire</span>&nbsp;
        <span ref="w06">apprendre</span>&nbsp;
        <span ref="w07">un</span>&nbsp;
        <span ref="w08">nombre</span>&nbsp;
        <span ref="w09">utile</span>&nbsp;
        <span ref="w10">aux</span>&nbsp;
        <span ref="w11">sages</span>&nbsp;
        <span ref="w11b">!</span>
      </div>
      <div ref="l1" class="verse">
        <span ref="w12">Glorieux</span>&nbsp;
        <span ref="w13">Archimède</span>
        <span ref="w13b">,</span>&nbsp;
        <span ref="w14">artiste</span>&nbsp;
        <span ref="w15">ingénieur</span>
        <span ref="w15b">,</span>
      </div>
      <div ref="l2" class="verse">
        <span ref="w16">Qui</span>&nbsp;
        <span ref="w17">de</span>&nbsp;
        <span ref="w18">ton</span>&nbsp;
        <span ref="w19">jugement</span>
        <span ref="w19b">,</span>&nbsp;
        <span ref="w20">peut</span>&nbsp;
        <span ref="w21">priser</span>&nbsp;
        <span ref="w22">la</span>&nbsp;
        <span ref="w23">valeur</span>&nbsp;
        <span ref="w23b">?</span>
      </div>
      <div ref="l3" class="verse">
        <span ref="w24">Pour</span>&nbsp;
        <span ref="w25">moi</span>
        <span ref="w25b">,</span>&nbsp;
        <span ref="w26">ton</span>&nbsp;
        <span ref="w27">problème</span>&nbsp;
        <span ref="w28">eut</span>&nbsp;
        <span ref="w29">de</span>&nbsp;
        <span ref="w30">pareils</span>&nbsp;
        <span ref="w31">avantages</span>
        <span ref="w31b">.</span>
      </div>
    </div>
    <div ref="numbers" class="numbers">
      <p ref="n00">π</p>
      <p ref="n00b">=</p>
      <p ref="n01">3</p>
      <p ref="n01b">,</p>
      <p ref="n02">1</p>
      <p ref="n03">4</p>
      <p ref="n04">1</p>
      <p ref="n05">5</p>
      <p ref="n06">9</p>
      <p ref="n07">2</p>
      <p ref="n08">6</p>
      <p ref="n09">5</p>
      <p ref="n10">3</p>
      <p ref="n11">5</p>
      <p ref="n12">8</p>
      <p ref="n13">9</p>
      <p ref="n14">7</p>
      <p ref="n15">9</p>
      <p ref="n16">3</p>
      <p ref="n17">2</p>
      <p ref="n18">3</p>
      <p ref="n19">8</p>
      <p ref="n20">4</p>
      <p ref="n21">6</p>
      <p ref="n22">2</p>
      <p ref="n23">6</p>
      <p ref="n24">4</p>
      <p ref="n25">3</p>
      <p ref="n26">3</p>
      <p ref="n27">8</p>
      <p ref="n28">3</p>
      <p ref="n29">2</p>
      <p ref="n30">7</p>
      <p ref="n31">9</p>
      <p ref="n31b">...</p>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  z-index: 1050;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
}
.verse {
  min-height: 15vh;
  color: black;
}
.verse>span {
  display: inline-block;
  border-width: 2px;
  border-radius: 6px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0);
}
.verse>span.status1, .verse>span.status2 {
  color: v-bind(color);
  border-color: v-bind(color);
}
.verse>span.timeline_hide_words_1 {
  opacity: 0;
}
.numbers {
  font-family: VictorMono-Regular, monospace;
  display: flex wrap;
  position: absolute;
  top:0px;
  left:0px;
}
.numbers > p {
  display: inline-block;
  position: absolute;
  opacity:0;
}
.numbers > p.status1 {
  opacity:0;
}
.numbers > p.status2 {
  opacity:1;
  color: v-bind(color);
}
.numbers > p.status3 {
  opacity:1;
}
.count {
  display: inline-block;
  opacity: 0;
  width: 0px;
}
</style>
