<script setup lang="ts">
// const WIDTH = 5616
// const HEIGHT = 2886
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { gsap } from 'gsap'
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import { useTrialStore } from './stores/trial'
import Trial from './components/Trial.vue'
import Toolbar from './components/Toolbar.vue'
import Menu from './components/Menu.vue'
import Poetry from './components/Poetry.vue'
import Rain from './components/bricks/Rain.vue'
import QR from './components/bricks/QR.vue'
const main_store = useTrialStore()
if (Menu && Poetry) {}
const panel = ref(null as any)
panel.value = Menu
var controller: AbortController|null
onMounted(()=>{
  controller = new AbortController();
  document.addEventListener(
    "keyup",
    (e: KeyboardEvent) => {
      if (e.key ==  "p") {
        panel.value = Poetry
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
  var style = window.getComputedStyle(body, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style); 
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log("width, height", width, height, fontSize)
  var newFontSize = Math.max(40, height/16)
  if (newFontSize >= 1.1 * fontSize
  || 1.1 * newFontSize <= fontSize ) {
    body.style.fontSize = newFontSize+'px'
  }
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
const qrIsOn = ref(false)
var qrImage = ref('None')
const clicked = (what: string) => {
  console.log('CLICKED', what)
  switch (what) {
    case 'CNRS':
      qrIsOn.value = true
      qrImage.value = 'QRCode-CNRS.png'
      break
    case 'uB':
      qrIsOn.value = true
      qrImage.value = 'QRCode-uB.png'
      break
    case 'IMB':
      qrIsOn.value = true
      qrImage.value = 'QRCode-IMB.png'
      break
  }
  console.log('CLICKED', qrImage)
}
const dismissQR = () => {
  qrIsOn.value = false
}
</script>
<template>
  <Trial/>
  <Rain :z-index='999'/>
  <Transition
    name='qrcode'
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
    v-else
  >
    <!--component :if="panel" :is="panel" /-->
    <Menu msg='FOO'></Menu>
  </Transition>
  <Toolbar @clicked="(n) => clicked(n)"/>
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
.qrcode-enter-active {
  transition: all 1s ease-out;
}
.qrcode-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.qrcode-enter-from,
.qrcode-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
.qrcode-help {
  position: relative;
  color: rgba(0,0,0,0.1);
}
</style>
