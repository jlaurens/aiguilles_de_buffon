<script lang="ts" setup>
import Slide from './bricks/Slide.vue'
import { ref, onMounted } from 'vue'
import { gsap, Power1 } from 'gsap'
const props = defineProps({
  size: {
    type: Number,
    default: 96,
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
const l9 = ref()
const from_alpha = ref()
const from_bet = ref()
const to_alpha = ref()
const to_bet = ref()
const alpha = ref()
const bet = ref()
const perimetros = ref()
const color = 'hsl('+Math.random()*360+',66%,44%)'
const opacity = (opacity: number, duration = 2) => {
  return {
    opacity, duration, ease: Power1.easeInOut,
  }
}
const animate = (s: number) => {
  const tl = gsap.timeline()
  for (let l of [l1, l2, l3]) {
    tl.to(l.value, opacity(1, 2), '+=0.5')
  }
  const alpha_el: HTMLElement = alpha.value
  const bet_el: HTMLElement = bet.value
  const from_alpha_r = from_alpha.value.getBoundingClientRect()
  const from_bet_r = from_bet.value.getBoundingClientRect()
  console.log('BEFORE from_alpha_r.top', from_alpha_r.top)
  tl.call(() => {
    const from_alpha_r = from_alpha.value.getBoundingClientRect()
    const from_bet_r = from_bet.value.getBoundingClientRect()
    console.log('AFTER from_alpha_r.top', from_alpha_r.top)
    alpha_el.style.top = (from_alpha_r.top-props.size) + 'px'
    alpha_el.style.left = from_alpha_r.left + 'px'
    bet_el.style.top = (from_bet_r.top-props.size) + 'px'
    bet_el.style.left = from_bet_r.left + 'px'
  })
  tl.to(alpha_el, opacity(1, 0.5), '+=0.5')
  tl.to(bet_el, opacity(1, 0.5))
  tl.to(alpha_el, {
    top: (from_alpha.value.getBoundingClientRect().top-props.size+window.innerHeight/8) + 'px',
    duration: 1,
    ease: Power1.easeInOut,
  })
  tl.to(bet_el, {
    top: (from_bet.value.getBoundingClientRect().top-props.size+window.innerHeight/8) + 'px',
    duration: 1,
    ease: Power1.easeInOut,
  })
  tl.to(alpha_el, {
    left: to_alpha.value.getBoundingClientRect().left + 'px',
    duration: 1,
    ease: Power1.easeInOut,
  }, 'X')
  tl.to(bet_el, {
    left: to_bet.value.getBoundingClientRect().left + 'px',
    duration: 1,
    ease: Power1.easeInOut,
  }, '<')
 tl.to(alpha_el, {
    top: (to_alpha.value.getBoundingClientRect().top-props.size) + 'px',
    duration: 1,
    ease: Power1.easeInOut,
  })
  tl.to(bet_el, {
    top: (to_bet.value.getBoundingClientRect().top-props.size) + 'px',
    duration: 1,
    ease: Power1.easeInOut,
  }, '<')
  tl.to(l4.value, opacity(1, 3), 'X')
  tl.to(l5.value, opacity(1, 3), '+=1')
  tl.to(l6.value, opacity(1, 2))
  tl.to(perimetros.value, {
    color: color,
    duration: 1,
  })
  for (let l of [l7, l8, l9]) {
    tl.to(l.value, opacity(1, 2))
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
  <div class="Pi1">
    <div class="center_h">
      <div class="center_v">
        <div class="content">
          <div class="hidden" ref="l1">
            <span class="greek colored">α</span> et <span class="greek colored">β</span> sont les deux premières lettres de l'alphabet grec.
          </div>
          <div>
            <span class="hidden" ref="l2"><span class="greek">α</span> est lue «<span class="from" ref="from_alpha">alpha</span>», </span>
            <span class="hidden" ref="l3"><span class="greek">β</span> est lue «<span class="from" ref="from_bet">bét</span>a»... </span>
            <span class="hidden" ref="l4"> d'où le mot <span class="to hidden" ref="to_alpha">alpha</span><span class="to hidden" ref="to_bet">bet</span></span>
            <span class="hidden absolute colored" ref="alpha">alpha</span><span class="hidden absolute colored" ref="bet">bet</span>
          </div>
          <div class="hidden" ref="l5">
            <span class="greek colored">π</span> correspond à notre lettre «p», elle est lue «pi»,
          </div>
          <div class="hidden" ref="l6">
            c'est la première lettre du mot grec <span class="greek shadow" ref="perimetros">περίμετρος</span>
          </div>
          <div class="hidden" ref="l7">
            qu'on prononce «périmétros»
          </div>
          <div class="hidden" ref="l8">
            et qui désigne le <span class="colored">périmètre</span>,
          </div>
          <div class="hidden" ref="l9">
            c'est-à-dire la <span class="colored">longueur du tour</span>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Pi1 {
  height:100%;
  font-size: 90%;
}
.center_v {
  height:100%;
  display:flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
}
.center_h {
  height:100%;
  width:100%;
  display:flex;
  align-items: left;
  justify-content: space-around;
}
.content {
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.absolute {
  position: absolute;
}
.greek {
  font-family: IBMPlexSans-Regular, sans-serif;
}
.hidden {
  opacity: 0;
}
.from, .to {
  display: inline-block;
  box-sizing: border-box;
}
.colored {
  color: v-bind('color');
}
.colored, .shadow {
  text-shadow: 0px 2px 3px rgba(0,0,0,0.25);
}
.main {
  padding-top:100px;
}
</style>
