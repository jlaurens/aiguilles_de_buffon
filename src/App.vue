<script setup lang="ts">
// const WIDTH = 5616
// const HEIGHT = 2886
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { gsap } from 'gsap'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTrialStore } from './stores/trial'
import { useMainStore } from './stores/main'
import Icon from './components/bricks/Icon.vue'
import Title from './components/bricks/Title.vue'
import Slide from './components/bricks/Slide.vue'
import Toolbar from './components/bricks/Toolbar.vue'
import Rain from './components/bricks/Rain.vue'
import QR from './components/bricks/QR.vue'
import ProgressBar from './components/bricks/ProgressBar.vue'
import Menu from './components/Menu.vue'
import Start from './components/Start.vue'
import Game from './components/Game.vue'
import Pi1 from './components/Pi1.vue'
import Pi2 from './components/Pi2.vue'
import Barbier1 from './components/Barbier1.vue'
import Barbier2 from './components/Barbier2.vue'
import Trial from './components/Trial.vue'
import About from './components/About.vue'
const mainStore = useMainStore()
const rain = ref()
const rainIsOn = ref(true)
const start = ref()
const game = ref()
const pi1 = ref()
const pi2 = ref()
const barbier1 = ref()
const barbier2 = ref()
const trial = ref()
const about = ref()
const menuIsOn = ref(true)
const page = ref('')
const trialIsOn = ref(false)
const qrIsOn = ref(false)
const autoStart = ref(false)
const names = ['Start', 'Game', 'Pi1', 'Pi2', 'Barbier1', 'Barbier2', 'About']
const title_by_name = {
  'Start': 'Commencer',
  'Game': 'Le jeux des aiguilles',
  'Pi1': 'Savez-vous parler grec&thinsp;?',
  'Pi2': 'Combien vaut <span class="greek">π</span>',
  'Barbier1': 'Des roues pas vraiment rondes',
  'Barbier2': 'Des roues qui avancent pareil',
  'Trial': 'Simulation de lancers',
  'About': 'À propos',
  'Menu': 'Les aiguilles de Buffon',
}
const title_ref = ref<HTMLElement>()
const title = ref(title_by_name['Start'])
const goodColor = ref('hsl('+Math.random()*360+',66%,50%)')
const switchPage = (name: string) => {
  console.log('PAGE SWITCH', name)
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
    case 'Start':
    case 'Game':
    case 'Pi1':
    case 'Pi2':
    case 'Barbier1':
    case 'Barbier2':
    case 'About':
      if (page.value != name) {
        currentTimeline?.kill()
        currentTimeline = undefined
      }
      title.value = title_by_name[name]
      page.value = name
      menuIsOn.value = false
      qrIsOn.value = false
      rainIsOn.value = true
      trialIsOn.value = false
      trial.value?.show(false)
      break
    case 'Trial':
      title.value = title_by_name[name]
      page.value = name
      menuIsOn.value = false
      rainIsOn.value = false
      qrIsOn.value = false
      trialIsOn.value = true
      trial.value?.show(true)
      trial.value?.run()
      progress.value = 0
      goodColor.value = 'hsl('+Math.random()*360+',66%,50%)'
      break
    case 'Menu':
      currentTimeline?.kill()
      currentTimeline = undefined
      title.value = title_by_name[name]
      page.value = name
      menuIsOn.value = true
      rainIsOn.value = true
      qrIsOn.value = false
      trialIsOn.value = false
      trial.value?.show(false)
      break
    default:
      currentTimeline?.kill()
      currentTimeline = undefined
      title.value = ''
      menuIsOn.value = false
      rainIsOn.value = false
      qrIsOn.value = false
      trialIsOn.value = false
      trial.value?.show(false)
      break
  }
}
const trialStore = useTrialStore()
if (Menu && Pi1) {}
var controller: AbortController|null
const tl = gsap.timeline()
onMounted(()=>{
  controller = new AbortController();
  document.addEventListener(
    "keyup",
    (e: KeyboardEvent) => {
      if (e.key ==  "0") {
        if (currentTimeline?.labels.Trial) {
          currentTimeline.seek('Trial')
          currentTimeline.resume()
        } else {
          // const ts = currentTimeline?.timeScale()
          // currentTimeline?.kill()
          // currentTimeline = gsap.timeline()
          // .call(() => {
          //   switchPage('Start')
          // }, [], '+=15')
          // ts && currentTimeline?.timeScale(ts)
          // trial.value.run()
        }
      } else if (e.key ==  "1") {
        switchPage('Start')
      } else if (e.key ==  "2") {
        switchPage('Game')
      } else if (e.key ==  "3") {
        switchPage('Pi1')
      } else if (e.key ==  "4") {
        switchPage('Pi2')
      } else if (e.key ==  "5") {
        switchPage('Barbier1')
      } else if (e.key ==  "6") {
        switchPage('Barbier2')
      } else if (e.key ==  "7") {
        switchPage('About')
      } else if (e.key ==  "+") {
        if (trialIsOn.value) {
          trial.value.accelerate()
        } else if (currentTimeline) {
          currentTimeline.timeScale(2*currentTimeline.timeScale())
        }
      } else if (e.key ==  "-") {
        if (trialIsOn.value) {
          trial.value.decelerate()
        } else if (currentTimeline) {
          currentTimeline.timeScale(currentTimeline.timeScale()/2)
        }
      } else if (e.key ==  "r") {
        trial.value && trial.value.toggleRun()
      } else if (e.key ==  "R") {
        trial.value && trial.value.toggleRun(Number.MAX_SAFE_INTEGER)
      } else if (e.key ==  "x") {
        trial.value && trial.value.activate(true)
      } else if (e.key ==  "X") {
        trial.value && trial.value.activate(false)
      } else if (e.key ==  " ") {
        currentTimeline?.paused( !currentTimeline?.paused() )
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
  var newFontSize = Math.max(40, height/16)
  if (newFontSize >= 1.1 * fontSize
  || 1.1 * newFontSize <= fontSize ) {
    body.style.fontSize = newFontSize+'px'
  }
  mainStore.setFooterSize(3*window.innerHeight/24)
  trial.value?.resizeListener()
  rain.value?.resizeListener()
  pi2.value?.resizeListener()
  barbier1.value?.resizeListener()
  game.value?.resizeListener()
}
onMounted(() => {
  window.addEventListener('resize', resizeListener)
  resizeListener()
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeListener)
})
var qrImage = ref('None')
const dismissQR = () => {
  qrIsOn.value = false
}
const isPage = (s: string): boolean => {
  return page.value == s
}
const height = computed(() => {
  return 3*window.innerHeight/24
})
const height1 = computed(() => {
  return isPage('Start') ? 0 : height.value
})
type key_t = keyof typeof title_by_name

const items: Array<[key_t, String]> = ['Start', 'Game', 'Pi1', 'Pi2', 'Barbier1', 'Barbier2', 'Trial', 'About'].map(
  (k) => { return [k, title_by_name[k as key_t]] }
) as unknown as Array<[key_t, String]>

const nextPage = (name: string) => {
  return {
    Start: 'Game',
    Game: 'Pi1',
    Pi1: 'Pi2',
    Pi2: 'Barbier1',
    Barbier1: 'Barbier2',
    Barbier2: 'About',
    About: 'Start',
  } [name] || 'Start'
}
let currentTimeline: gsap.core.Timeline | undefined
switchPage('Start')
const registerTimeline = (tl: (vars?: gsap.TimelineVars) => gsap.core.Timeline, name: string) => {
  console.log('FROM', name, 'TO', nextPage(name))
  if (currentTimeline) {
    currentTimeline.restart()
  } else {
    currentTimeline = tl()
    if (!isPage('Start')) {
      currentTimeline.call(() => {
        progress.value = 0
        console.log('WRAPPER DONE', name, 'Trial', progress.value)
        switchPage('Trial')
      }, [], 'Trial')
      .to(progress, {
        value: 2 * Math.PI,
        duration: 15,
      })
    }
    currentTimeline.call(() => {
      console.log('DONE', nextPage(name))
      switchPage(nextPage(name))
    }, [])
    .addLabel('NEXT', '<')
    console.log('DURATION', name, currentTimeline.duration())
//    currentTimeline.duration(10)
  }
}
const progress = ref(0)
</script>
<template>
  <Trial ref="trial" :color="goodColor"/>
  <Rain ref='rain' :z-index='999' v-if="rainIsOn"/>
  <Transition
    name='fade'
    mode="out-in"
  >
    <QR v-if="qrIsOn" :bg-name='qrImage' bg-size="contain" @click="dismissQR()">
      <div class="qrcode-help">Cliquer l'image pour fermer</div>
    </QR>
  </Transition>
  <Slide v-if="!trialIsOn" :z-index="1000">
    <Title v-if="!isPage('Start')"><span v-html="title" ref="title_ref"></span></Title>
    <Slide :v-padding="height1" :z-index="1000">
      <Transition
        name='fade'
        mode="out-in"
      >
        <Menu v-if="menuIsOn" @on-selected="switchPage" :items="items"></Menu>
        <Start v-else-if="isPage('Start')" ref="start" :auto-start="autoStart" @mounted="registerTimeline"></Start>
        <Game v-else-if="isPage('Game')" ref="game" :auto-start="autoStart" @mounted="registerTimeline"></Game>
        <Pi1 v-else-if="isPage('Pi1')" ref="pi1" :auto-start="autoStart" @mounted="registerTimeline"></Pi1>
        <Pi2 v-else-if="isPage('Pi2')" ref="pi2" :auto-start="autoStart" @mounted="registerTimeline"></Pi2>
        <Barbier1 v-else-if="isPage('Barbier1')" ref="barbier1" :auto-start="autoStart" @mounted="registerTimeline"></Barbier1>
        <Barbier2 v-else-if="isPage('Barbier2')" ref="barbier2" :auto-start="autoStart" @mounted="registerTimeline"></Barbier2>
        <About v-else-if="isPage('About')" ref="about" :auto-start="autoStart" @mounted="registerTimeline"></About>
      </Transition>
    </Slide>
  </Slide>
  <Toolbar :height="height">
    <Icon image="menu_dots.png" @click="switchPage('Menu')" :size="height"/>
    <Icon image="logo_IMB.png" @click="switchPage('IMB')" :size="height"/>
    <Icon image="logo-uB-filet.png" @click="switchPage('uB')" :size="height"/>
    <Icon image="logo_CNRS.png" @click="switchPage('CNRS')" :size="height"/>
  </Toolbar>
  <ProgressBar v-if="trialIsOn"
    ref="progress_bar"
    :size="height"
    :progress="progress"
    :color="goodColor"
  ></ProgressBar>
</template>

<style lang="scss">
@font-face {
  font-family: LifeSavers;
  src: url('./fonts/LifeSavers-Bold.woff') format('woff');
}
@font-face {
  font-family: LifeSaversBold;
  src: url('./fonts/LifeSavers-ExtraBold.woff') format('woff');
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
b {
  font-family: LifeSaversBold, sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.qrcode-help {
  position: relative;
  color: rgba(0,0,0,0.1);
}
@media only screen and (orientation:portrait) {
  body {
    height: 100vw;
    transform: rotate(90deg);
  }
}
.greek {
  font-family: IBMPlexSans-Regular, sans-serif;
}
</style>
