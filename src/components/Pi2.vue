<script lang="ts" setup>
import { Ref, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
const w01  = ref()
const w02  = ref()
const w02b = ref()
const w03  = ref()
const w04  = ref()
const w05  = ref()
const w06  = ref()
const w07  = ref()
const w08  = ref()
const w09  = ref()
const w10  = ref()
const w11  = ref()
const w11b = ref()
const w12  = ref()
const w13  = ref()
const w13b = ref()
const w14  = ref()
const w15  = ref()
const w15b = ref()
const w16  = ref()
const w17  = ref()
const w18  = ref()
const w19  = ref()
const w19b = ref()
const w20  = ref()
const w21  = ref()
const w22  = ref()
const w23  = ref()
const w23b = ref()
const w24  = ref()
const w25  = ref()
const w25b = ref()
const w26  = ref()
const w27  = ref()
const w28  = ref()
const w29  = ref()
const w30  = ref()
const w31  = ref()
const w31b = ref()
const n00  = ref()
const n00b = ref()
const n01  = ref()
const n01b = ref()
const n02  = ref()
const n03  = ref()
const n04  = ref()
const n05  = ref()
const n06  = ref()
const n07  = ref()
const n08  = ref()
const n09  = ref()
const n10 = ref()
const n11 = ref()
const n12 = ref()
const n13 = ref()
const n14 = ref()
const n15 = ref()
const n16 = ref()
const n17 = ref()
const n18 = ref()
const n19 = ref()
const n20 = ref()
const n21 = ref()
const n22 = ref()
const n23 = ref()
const n24 = ref()
const n25 = ref()
const n26 = ref()
const n27 = ref()
const n28 = ref()
const n29 = ref()
const n30 = ref()
const n31 = ref()
const n31b = ref()
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
          ],
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
const key_of = (worn: Ref<any>): any => {
  switch (worn) {
    case w01: return '01'
    case w02: return '02'
    case w02b: return '02b'
    case w03: return '03'
    case w04: return '04'
    case w05: return '05'
    case w06: return '06'
    case w07: return '07'
    case w08: return '08'
    case w09: return '09'
    case w10: return '10'
    case w11: return '11'
    case w11b: return '11b'
    case w12: return '12'
    case w13: return '13'
    case w13b: return '13b'
    case w14: return '14'
    case w15: return '15'
    case w15b: return '15b'
    case w16: return '16'
    case w17: return '17'
    case w18: return '18'
    case w19: return '19'
    case w19b: return '19b'
    case w20: return '20'
    case w21: return '21'
    case w22: return '22'
    case w23: return '23'
    case w23b: return '23b'
    case w24: return '24'
    case w25: return '25'
    case w25b: return '25b'
    case w26: return '26'
    case w27: return '27'
    case w28: return '28'
    case w29: return '29'
    case w30: return '30'
    case w31: return '31'
    case w31b: return '31b'
    case n00: return '00'
    case n00b: return '00b'
    case n01: return '01'
    case n01b: return '01b'
    case n02: return '02'
    case n03: return '03'
    case n04: return '04'
    case n05: return '05'
    case n06: return '06'
    case n07: return '07'
    case n08: return '08'
    case n09: return '09'
    case n10: return '10'
    case n11: return '11'
    case n12: return '12'
    case n13: return '13'
    case n14: return '14'
    case n15: return '15'
    case n16: return '16'
    case n17: return '17'
    case n18: return '18'
    case n19: return '19'
    case n20: return '20'
    case n21: return '21'
    case n22: return '22'
    case n23: return '23'
    case n24: return '24'
    case n25: return '25'
    case n26: return '26'
    case n27: return '27'
    case n28: return '28'
    case n29: return '29'
    case n30: return '30'
    case n31: return '31'
    case n31b: return '31b'
  }
}
let controller__: AbortController|null = null
let poetry_timeline__: any = null
const reset_aspect = () => {
  refs.w_all.forEach((r) => {
    var e: HTMLElement = r.value
    e.style.position = 'static'
    e.style.color = ''
    e.style.borderColor = ''
    e.style.opacity = '1'
  })
  refs.n_all.forEach((r) => {
    var e: HTMLElement = r.value
    e.style.opacity = '0'
  })
}
const reset_status = (e: HTMLElement) => {
  e.classList.remove('status1', 'status2', 'status3')
}
const animate_first_line = (duration: number) => {
  var tl = gsap.timeline()
  var magenta = "rgb(192,0,192)"
  var f_1w = (ew: HTMLElement, label: string) => {
    tl.to(ew, {
      color: magenta,
      borderColor: magenta,
      duration: duration,
    }, label)
  }
  var f_1n = (en: HTMLElement, label: string) => {
    tl.to(en, {
      color: magenta,
      duration: 0,
    }, label)
    tl.to(en, {
      opacity: 1,
      duration: duration,
    }, label)
  }
  if (!style_w01__) {
    return tl
  }
  var c  = style_w01__.getPropertyValue('color')
  var bc = style_w01__.getPropertyValue('borderColor')
  var f_2 = (pw: HTMLElement, pn: HTMLElement, label: string) => {
    tl.to(pw, {
      color: c,
      borderColor: bc,
      duration: duration,
    }, label)          
    tl.to(pw, {
      color: '',
      duration: 0,
    }, label)
  }
  var pw: HTMLElement|null = null
  var pn: HTMLElement|null = null
  var i = 1
  var label: string|null = null
  ;[[w01, n01], [w02, n02], [w03, n03], [w04, n04], [w05, n05], [w06, n06], [w07, n07], [w08, n08], [w09, n09], [w10, n10], [w11, n11]
  ].forEach((rwn) => {
    label = ''+i
    ++i
    tl.addLabel(label)
    var ew: HTMLElement = rwn[0].value
    var en: HTMLElement = rwn[1].value
    f_1w(ew, label)
    f_1n(en, label)
    pw && pn && f_2(pw, pn, label)
    pw = ew
    pn = en
  })
  pw && pn && label && f_2(pw, pn, label)
  return tl
}
const animate_hide_words = (duration: number, rs: Ref<HTMLElement>[]) => {
  var tl = gsap.timeline()
  for (let r of rs) {
    tl.to(r.value, {
      opacity: 0,
      duration: duration*(1+Math.random())/2,
      ease:'power1.in',
    }, 0)
  }
  return tl
}
function generator_maker<Type> (rs: Ref<Type>[]) {
  return function * () {
    for (let entry of rs) {
      yield entry.value
    }
  }
}
const animate_other_line = (
  duration: number,
  rws: () => IterableIterator<HTMLElement>,
  rns: () => IterableIterator<HTMLElement>
) => {
  var tl = gsap.timeline()
  var label = '1'
  tl.addLabel(label)
  var f_1w = (ew: HTMLElement, label: string) => {
    tl.to(ew, {
      color: "rgb(192,0,192)",
      borderColor: "rgb(192,0,192)",
      duration: duration,
    }, label)
  }
  var f_1n = (en: HTMLElement, label: string) => {
    tl.to(en, {
      color: "rgb(192,0,192)",
      duration: 0,
    }, label)
    tl.to(en, {
      opacity: "1",
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
      duration: 2*duration,
    }, label)          
    tl.to(pw, {
      color: '',
      duration: 0,
    })
    if (style_w01__) {
      tl.to(pn, {
        color: style_w01__.getPropertyValue('color'),
        duration: 2*duration,
      }, label)      
      tl.to(pn, {
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
  tl.to({}, { duration: 2*duration })
  label = '3'
  tl.addLabel(label)
  const rng = rns()
  for(let e of rws()) {
    f_2(e, rng.next().value.value, label)
  }
  return tl
}
const animate_center = (duration: number) => {
  const tl = gsap.timeline()
  const t = ''+(window.innerHeight/2.5)+'px'
  const f = (en: HTMLElement) => {
    tl.to(en, {
      top: t,
      duration: duration,
      ease: 'power1.inOut',
    }, 0)
  }
  for (let r of refs.n_all) {
    f(r.value)
  }
  tl.to(n31b.value, {
    opacity: 1,
    duration: duration,
    ease: 'power1.in',
  }, 0)
  return tl
}
const animate_place_numbers = (duration: number) => {
  const tl = gsap.timeline()
  const e1: HTMLElement = n01.value
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
  var en: HTMLElement = n31.value
  r = en.getBoundingClientRect()
  const t = ''+r.top+'px'
  en = n00.value
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
    ease: 'power1.in',
  })
  en = n00b.value
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
    ease: 'power1.in',
  })
  e1.style.zIndex = '1099'
  tl.to(e1, {
    color: colors[e1.textContent || ''],
    top: t,
    left: l+'px',
    duration: duration,
    ease: 'power1.inOut',
  })
  en = n01b.value
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
    ease: 'power1.in',
  }, "<33%")
  var i = 0
  for (let r of refs.n) {
    if (i>1) {
      en = r.value
      en.style.zIndex = ''+(1100-i)
      tl.to(en, {
        top: t,
        color: colors[en.textContent || ''],
        left: (l+i*w)+'px',
        duration: duration,
        ease: 'power1.inOut',
      }, ">-="+(33+(i-2)/29*67)+"%")
    }
    ++i
  }
  en = n31b.value
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
var style_w01__: CSSStyleDeclaration | null = null
const animate = () => {
  if (poetry_timeline__) {
    return
  }
  reset_aspect()
  reset_layout()
  style_w01__ = window.getComputedStyle(w01.value, null)
  const tl = gsap.timeline({
    onComplete: () => {
      poetry_timeline__ = null
    },
  })
  tl.add(animate_first_line(2))
  tl.add(animate_other_line(
    2,
    generator_maker(refs.l1),
    generator_maker(refs.n1)
  ))
  tl.add(animate_other_line(
    2,
    generator_maker(refs.l2),
    generator_maker(refs.n2)
  ))
  tl.add(animate_other_line(
    2,
    generator_maker(refs.l3),
    generator_maker(refs.n3)
  ))
  tl.add(animate_hide_words(2, refs.w_all))
  tl.to({},{duration:4})
  tl.add(animate_place_numbers(2))
  tl.add(animate_center(2))
  poetry_timeline__ = tl
}
const numbers = ref() as unknown as Ref<HTMLElement>
let current__ = 0
let status__ = 0
const start = () => {
  reset_layout()
  numbers.value.style.opacity="1"
  current__ = 0
  status__ = 0
  refs.w_all.forEach((r) => {
    reset_status(r.value)
  })
  refs.n_all.forEach((r) => {
    reset_status(r.value)
  })
}
// const nextX = (): boolean => {
//   var ew = $w(current__)
//   var en
//   if (ew) {
//     en = $n(current__)
//     switch (++status__) {
//       case 1:
//         ew.classList.add('status1')
//         en.classList.add('status1')
//         return true
//       case 2:
//         ew.classList.remove('status1')
//         en.classList.remove('status1')
//         ew.classList.add('status2')
//         en.classList.add('status2')
//         return true
//       default:
//         break;
//     }
//     ew.classList.remove('status2')
//     en.classList.remove('status2')
//     en.classList.add('status3')
//   }
//   ++current__
//   ew = refs(current__)
//   if (ew) {
//     en = $n(current__)
//     status__ = 1
//     ew.classList.add('status1')
//     en.classList.add('status1')
//     return true
//   }
//   return status__<3
// }
const next = (): boolean => {
  var ew = refs.w[current__].value
  var en
  if (ew) {
    en = refs.n_alt[current__].value
    switch (++status__) {
      case 1:
        ew.classList.add('status1')
        en.classList.add('status1')
        return true
      case 2:
        ew.classList.remove('status1')
        en.classList.remove('status1')
        ew.classList.add('status2')
        en.classList.add('status2')
        return true
      default:
        break;
    }
    ew.classList.remove('status2')
    en.classList.remove('status2')
    en.classList.add('status3')
  }
  ++current__
  ew = refs.w[current__].value
  if (ew) {
    en = refs.n_alt[current__].value
    status__ = 1
    ew.classList.add('status1')
    en.classList.add('status1')
    return true
  }
  return status__<3
}
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
      var en = gn.next().value
      var rn = en.getBoundingClientRect()
      height = rn.bottom - rn.top
      position = ((rw.left+rw.right)/2-(rn.right-rn.left)/2)+'px'
      en.style.position = "absolute"
      en.style.left = position
      ew.classList.remove('status1', 'status2', 'status3')
      en.classList.remove('status1', 'status2', 'status3')
    }
    if (height) {
      position = (top - 0.65 * (bottom - top)-height)+'px'
    }
    if (position) {
      for (let e of gwn[1]()) {
        e.style.top = position
      }
    }
    T += 100
  })
}
onMounted(() => {
  controller__ = new AbortController();
  document.addEventListener(
    "keyup",
    (e: KeyboardEvent) => {
      if (e.key ==  "a") {
        animate();
      } else if (e.key ==  "s") {
        start();
      } else if (e.key ==  "n") {
        next();
      }
    },
    { signal: controller__.signal }
  )
  nextTick( () => {
    reset_layout()
  })
})
onUnmounted(() => {
  controller__ && controller__.abort()
  resizeListener()
})

const isOverflown = ({ clientHeight, scrollHeight }: { clientHeight: number, scrollHeight: number }) => scrollHeight > clientHeight
const resizeText = (
  r: Ref<HTMLElement|undefined>,
  step = 1,
) => {
  const element = r.value
  if (element) {
    const parent = element.parentElement
    if (parent) {
      element.style.fontSize = ''
      const style = window.getComputedStyle(parent, null)
      let i = parseFloat(style.getPropertyValue('font-size'))
      while (true) {
        element.style.fontSize = i + 'px'
        if (!isOverflown(parent)) break
        i -= step
      }
    }
  }
}
const l0: Ref<HTMLElement|undefined> = ref()
const l1: Ref<HTMLElement|undefined> = ref()
const l2: Ref<HTMLElement|undefined> = ref()
const l3: Ref<HTMLElement|undefined> = ref()
const words: Ref<HTMLElement|undefined> = ref()
const resizeListener = () => {
  console.log('RESIZE POETRY')
  const e = words.value
  const n = numbers.value
  if (e && n) {
    e.style.fontSize = ''
    const style = window.getComputedStyle(e, null)
    let i = parseFloat(style.getPropertyValue('font-size'))
    const r = e.getBoundingClientRect()
    const w = r.right - r.left
    console.log('font-size', i, w*0.0345)
    if (i>w*0.034) {
      i = w*0.034
      e.style.fontSize = n.style.fontSize = i + 'px'
    }
  }
}
defineExpose( { resizeListener } )
onMounted(() => {
  resizeListener()
})
</script>

<template>
  <div class="main">
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
  color: rgb(192, 0, 192);
  border-color: rgb(192, 0, 192);
}
.verse>span.animate_hide_words_1 {
  opacity: 0;
}
.numbers {
  font-family: "JetBrainsMono";
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
  color: rgb(192, 0, 192);
}
.numbers > p.status3 {
  opacity:1;
}
</style>
