<script lang="ts" setup>
import Slide from './bricks/Slide.vue'
import { Ref, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
const props = defineProps({
  size: {
    type: String,
    default: '96px',
  }
})
const l1 = ref()
const l2 = ref()
const l3 = ref()
const l4 = ref()
const l5 = ref()
const l6 = ref()
const l7 = ref()
const l8 = ref()
const from_alpha = ref()
const from_bet = ref()
const to_alpha = ref()
const to_bet = ref()
const alpha = ref()
const bet = ref()
const perimetros = ref()
const color = 'hsl('+Math.random()*360+',66%,44%)'
const animate = (s: number) => {
  const tl = gsap.timeline()
  for (let l of [l1, l2, l3]) {
    tl.to(l.value, {
      opacity:1,
      duration: 2,
    })
    tl.to({}, {
      duration: 0.5,
    })
  }
  let from_alpha_r = from_alpha.value.getBoundingClientRect()
  let from_bet_r = from_bet.value.getBoundingClientRect()
  let to_alpha_r = to_alpha.value.getBoundingClientRect()
  let to_bet_r = to_bet.value.getBoundingClientRect()
  const alpha_el: HTMLElement = alpha.value
  const bet_el: HTMLElement = bet.value
  alpha_el.style.top = from_alpha_r.top + 'px'
  alpha_el.style.left = from_alpha_r.left + 'px'
  bet_el.style.top = from_bet_r.top + 'px'
  bet_el.style.left = from_bet_r.left + 'px'
  tl.to(alpha_el, {
    opacity: 1,
    color: color,
    duration: 0.5,
  })
  tl.to(bet_el, {
    opacity: 1,
    color: color,
    duration: 0.5,
  })
  tl.to(alpha_el, {
    top: (to_alpha_r.top+window.innerHeight/8) + 'px',
    duration: 1,
    ease:'power1.inout',
  })
  tl.to(bet_el, {
    top: (to_alpha_r.top+window.innerHeight/8) + 'px',
    //left: to_alpha_r.left + 'px',
    duration: 1,
    ease:'power1.inout',
  })
  tl.to(alpha_el, {
    left: to_alpha_r.left + 'px',
    duration: 1,
    ease:'power1.inout',
  }, 'X')
  tl.to(bet_el, {
    left: to_bet_r.left + 'px',
    duration: 1,
    ease:'power1.inout',
  }, '<')
  tl.to(alpha_el, {
    top: to_alpha_r.top + 'px',
    duration: 1,
    ease:'power1.inout',
  })
  tl.to(bet_el, {
    top: to_alpha_r.top + 'px',
    duration: 1,
    ease:'power1.inout',
  }, '<')
  tl.to(l4.value, {
    opacity:1,
    duration: 3,
  }, 'X')
  tl.to({}, {duration: 1})
  tl.to(l5.value, {
    opacity:1,
    duration: 3,
  })
  tl.to(l6.value, {
    opacity: 1,
    duration: 2,
  })
  tl.to(perimetros.value, {
    color: color,
    duration: 1,
  })
  for (let l of [l7, l8]) {
    tl.to(l.value, {
      opacity: 1,
      duration: 2,
    })
    tl.to({}, {
      duration: 0.5,
    })
  }
}
onMounted(() => {
  setTimeout(() => {
    animate(10)
  }, 500);
})
</script>

<template>
<Slide :zIndex="2000">
  <div class="vertical">
    <div class="row">
      <div class="title">
        Les mathématiques doivent beaucoup<br>à la grèce antique.
      </div>
    </div>
    <div class="row last">
      <div class="main">
        <div class="body">
          <div class="hidden" ref="l1">
            <span class="greek">α</span> et <span class="greek">β</span> sont les deux premières lettres de l'alphabet grec.
          </div>
          <div>
            <span class="hidden" ref="l2"><span class="greek">α</span> est lue «<span class="from" ref="from_alpha">alpha</span>», </span>
            <span class="hidden" ref="l3"><span class="greek">β</span> est lue «<span class="from" ref="from_bet">bét</span>a»... </span>
            <span class="hidden" ref="l4"> d'où le mot <span class="to hidden" ref="to_alpha">alpha</span><span class="to hidden" ref="to_bet">bet</span></span>
            <span class="hidden absolute" ref="alpha">alpha</span><span class="hidden absolute" ref="bet">bet</span>
          </div>
          <div>
      <span class="hidden" ref="l5"><span class="greek colored">π</span> correspond à notre lettre «p», elle est lue «pi»,</span>
          </div>
          <div class="hidden" ref="l6">
    c'est la première lettre du mot grec <span class="greek" ref="perimetros">περίμετρος</span>
    <br><span class="hidden" ref="l7">qu'on prononce «périmétros»</span>
    <br><span class="hidden" ref="l8">
    et qui désigne le <span class="colored">périmètre</span> !
    </span>
          </div>      
        </div>
      </div>
    </div>
  </div>
</Slide>
</template>

<style scoped>
.absolute {
  position: absolute;
}
.vertical {
  display: table;
  table-layout: auto;
  height: v-bind('"calc(100% - "+props.size+")"');
  width: 100%;
}
.main {
  height: 100%;
}
.row {
  display: table-row;
}
.last {
  height: 100%;
}
.body {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.title {
  width:100%;
  font-size: 110%;
  text-shadow: 0px 2px 3px rgba(0,0,0,0.25);
  background-color: rgba(0,0,0,0.05);
  padding-top: 0.5ex;
  padding-bottom: 0.5ex;
}
.greek {
  font-family: IBMPlexSans-Regular, sans-serif;
}
.hidden {
  opacity: 0;
}
.from, .to {
  display: inline-block;
}
.colored {
  color: v-bind('color');
}
</style>
