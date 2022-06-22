<script setup lang="ts">
// const WIDTH = 5616
// const HEIGHT = 2886
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { gsap } from 'gsap'
import { ref, onMounted, onUnmounted } from 'vue'
import { useTrialStore } from './stores/trial'
import Trial from './components/Trial.vue'
import Toolbar from './components/Toolbar.vue'
import Menu from './components/Menu.vue'
import Pi1 from './components/Pi1.vue'
import Pi2 from './components/Pi2.vue'
import Game from './components/Game.vue'
import Rain from './components/bricks/Rain.vue'
import QR from './components/bricks/QR.vue'
import Barbier1 from './components/Barbier1.vue'
const rain = ref()
const rainIsOn = ref(true)
const pi1 = ref()
const pi2 = ref()
const game = ref()
const trial = ref()
const barbier1 = ref()
const panel = ref(null as any)
panel.value = Menu
const menuIsOn = ref(true)
const page = ref('NONE')
const qrIsOn = ref(false)
const switchPage = (name: string) => {
  const qr = (name: string) => {
    const png = name
    if (qrImage.value == png) {
      qrImage.value = 'NONE'
      qrIsOn.value = false
    } else {
      qrImage.value = name
      qrIsOn.value = true
    }
  }
  switch(name) {
    case 'CNRS':
    case 'uB':
    case 'IMB':
      qr(name)
      break
    case 'Pi1':
    case 'Pi2':
    case 'Game':
    case 'Barbier1':
      page.value = name
      menuIsOn.value = false
      rainIsOn.value = true
      qrIsOn.value = false
      trial.value && trial.value.show(false)
      break
    case 'Trial':
      page.value = 'Trial'
      trial.value && trial.value.show(true)
      menuIsOn.value = false
      rainIsOn.value = false
      qrIsOn.value = false
      break
    default:
      menuIsOn.value = true
      rainIsOn.value = true
      qrIsOn.value = false
      trial.value && trial.value.show(false)
      break
  }
}
const main_store = useTrialStore()
if (Menu && Pi1) {}
var controller: AbortController|null
onMounted(()=>{
  controller = new AbortController();
  document.addEventListener(
    "keyup",
    (e: KeyboardEvent) => {
      if (e.key ==  "p") {
        panel.value = Pi1
      } else if (e.key ==  "+") {
        trial.value && trial.value.accelerate()
      } else if (e.key ==  "-") {
        trial.value && trial.value.decelerate()
      } else if (e.key ==  "r") {
        trial.value && trial.value.toggleRun()
      } else if (e.key ==  "R") {
        trial.value && trial.value.toggleRun(Number.MAX_SAFE_INTEGER)
      } else if (e.key ==  "x") {
        trial.value && trial.value.activate(true)
      } else if (e.key ==  "X") {
        trial.value && trial.value.activate(false)
      }
    },
    { signal: controller.signal }
  );
})
const isAbortController = (controller: AbortController|null): controller is AbortController => {
  return !!controller
}
onUnmounted(() => {
  isAbortController(controller) && controller.abort()
  controller = null
})
const resizeListener = () => {
  var body = document.body
  var style = window.getComputedStyle(body, null)
  var fontSize = parseFloat(style.getPropertyValue('font-size'))
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log("width, height", width, height, fontSize)
  var newFontSize = Math.max(40, height/16)
  if (newFontSize >= 1.1 * fontSize
  || 1.1 * newFontSize <= fontSize ) {
    body.style.fontSize = newFontSize+'px'
  }
  trial.value && trial.value.resizeListener()
  rain.value  && rain.value.resizeListener()
  pi2.value && pi2.value.resizeListener()
}
onMounted(() => {
  window.addEventListener('resize', resizeListener)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeListener)
})
const beforeEnter = (el: Element) => {
  gsap.set(el, {
    opacity:0,
    scale:0,
  })
}
const enter = (el: Element, done: any) => {
  gsap.to(el, {
    opacity:1,
    scale:1,
    duration:1,
    onComplete: done,
  })
}
var qrImage = ref('None')
const dismissQR = () => {
  qrIsOn.value = false
}
const isPage = (s: string): boolean => {
  console.log('IS_PAGE', s, page.value)
  return page.value == s
}
</script>
<template>
  <Trial ref="trial" />
  <Rain ref='rain' :z-index='999' v-if="rainIsOn"/>
  <Transition
    name='fade'
    v-if="qrIsOn"
  >
    <QR :bg-name='qrImage' bg-size="contain" @click="dismissQR()">
    <div class="qrcode-help">Cliquer l'image pour fermer</div>
    </QR>
  </Transition>
  <Transition
    :css='false'
    @before-enter='beforeEnter'
    @enter='enter'
    v-else-if="menuIsOn"
  >
    <!--component :if="panel" :is="panel" /-->
    <Menu @on-selected="switchPage"></Menu>
  </Transition>
  <Transition
    name='fade'
    v-else-if="isPage('Pi1')"
  >
    <Pi1 ref="pi1"></Pi1>
  </Transition>
  <Transition
    name='fade'
    v-else-if="isPage('Pi2')"
  >
    <Pi2 ref="pi2"></Pi2>
  </Transition>
  <Transition
    name='fade'
    v-else-if="isPage('Barbier1')"
  >
    <Barbier1 ref="barbier1"></Barbier1>
  </Transition>
  <Transition
    name='fade'
    v-else-if="isPage('Game')"
  >
    <Game ref="game"></Game>
  </Transition>
  <Toolbar @clicked="(n) => switchPage(n)"/>
</template>

<style lang="scss">
@font-face {
  font-family: LifeSavers;
  src: url('./fonts/LifeSavers-Bold.woff') format('woff');
}
@font-face {
  font-family: JetBrainsMono;
  src: url('./fonts/JetBrainsMono-VariableFont_wght.woff') format('woff');
}
@font-face {
  font-family: VictorMono-Regular;
  src: url('./fonts/VictorMono-SemiBold.woff') format('woff');
}
@font-face {
  font-family: VictorMono-Italic;
  src: url('./fonts/VictorMono-SemiBoldItalic.woff') format('woff');
}
@font-face {
  font-family: GFSNeohellenic-Regular;
  src: url('./fonts/GFSNeohellenic-Regular.woff') format('woff');
}
@font-face {
  font-family: IBMPlexSans-Regular;
  src: url('./fonts/IBMPlexSans-Regular.woff') format('woff');
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
}
html, body {
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}
body {
  font-family: LifeSavers, sans-serif;
  font-size:40px;
  color: #594471;
  background-color:white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.qrcode-help {
  position: relative;
  color: rgba(0,0,0,0.1);
}
</style>
