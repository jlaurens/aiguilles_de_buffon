<script setup lang="ts">
// const WIDTH = 5616
// const HEIGHT = 2886
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { gsap } from 'gsap'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTrialStore } from './stores/trial'
import Icon from './components/bricks/Icon.vue'
import Title from './components/bricks/Title.vue'
import Slide from './components/bricks/Slide.vue'
import Toolbar from './components/bricks/Toolbar.vue'
import Rain from './components/bricks/Rain.vue'
import QR from './components/bricks/QR.vue'
import Trial from './components/Trial.vue'
import Menu from './components/Menu.vue'
import Pi1 from './components/Pi1.vue'
import Pi2 from './components/Pi2.vue'
import Game from './components/Game.vue'
import Barbier1 from './components/Barbier1.vue'
import Barbier2 from './components/Barbier2.vue'
const rain = ref()
const rainIsOn = ref(true)
const pi1 = ref()
const pi2 = ref()
const game = ref()
const trial = ref()
const barbier1 = ref()
const barbier2 = ref()
const panel = ref(null as any)
panel.value = Menu
const menuIsOn = ref(true)
const page = ref('NONE')
const trialIsOn = ref(false)
const qrIsOn = ref(false)
const title_by_name = {
  'Pi1': 'Savez-vous parler grec ?',
  'Pi2': '',
  'Game': 'Le jeux des aiguilles',
  'Barbier1': 'Des roues pas vraiment rondes',
  'Barbier2': 'Des roues qui avancent pareil',
  'Menu': 'Les aiguilles de Buffon',
}
const title = ref(title_by_name['Menu'])
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
    case 'Barbier2':
      title.value = title_by_name[name]
      page.value = name
      menuIsOn.value = false
      rainIsOn.value = true
      trialIsOn.value = false
      qrIsOn.value = false
      trial.value && trial.value.show(false)
      break
    case 'Trial':
      title.value = ''
      page.value = name
      trial.value && trial.value.show(true)
      menuIsOn.value = false
      rainIsOn.value = false
      trialIsOn.value = true
      qrIsOn.value = false
      break
    default:
      title.value = title_by_name['Menu']
      menuIsOn.value = true
      rainIsOn.value = true
      trialIsOn.value = false
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
  switchPage('Pi1')
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
  barbier1.value && barbier1.value.resizeListener()
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
const height = computed(() => {
  return 3*window.innerHeight/24
})
</script>
<template>
  <!--Trial ref="trial" />
  <Rain ref='rain' :z-index='999' v-if="rainIsOn"/>
  <Transition
    name='fade'
    v-if="qrIsOn"
  >
    <QR :bg-name='qrImage' bg-size="contain" @click="dismissQR()">
      <div class="qrcode-help">Cliquer l'image pour fermer</div>
    </QR>
  </Transition-->
  <Slide v-if="!trialIsOn" :z-index="1000">
    <Title>{{title}}</Title>
    <Slide :v-padding="height" :z-index="1000">
    <Transition
      :css='false'
      @before-enter='beforeEnter'
      @enter='enter'
      v-if="menuIsOn"
    >
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
      v-else-if="isPage('Barbier2')"
    >
      <Barbier2 ref="barbier2"></Barbier2>
    </Transition>
    <Transition
      name='fade'
      v-else-if="isPage('Game')"
    >
      <Game ref="game"></Game>
    </Transition>
    </Slide>
  </Slide>
  <Toolbar>
    <Icon image="menu_dots.png" @click="switchPage('Menu')"/>
    <Icon image="logo_IMB.png" @click="switchPage('IMB')"/>
    <Icon image="logo-uB-filet.png" @click="switchPage('uB')"/>
    <Icon image="logo_CNRS.png" @click="switchPage('CNRS')"/>
  </Toolbar>
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
