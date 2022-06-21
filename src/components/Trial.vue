<script setup lang="ts">
import { useTrialStore } from '../stores/trial'
import Slide from './bricks/Slide.vue'
import Title from './bricks/Title.vue'
import { ref, onMounted, computed, watch, nextTick } from 'vue'

type Point = [number, number]

const trial_store = useTrialStore()

const COLOR_RANGE = 30;
const PARQUET_COUNT = 6;
const PIN_RATIO = 4;
const PI_expected = 3.1415926535;

const goodColor = ref('')

const to_digits = (x: number): number[] => {
  const n = Math.floor(x)
  const d = (Math.floor((x - n)*10**10)+'').split('')
  return [n, ...(d.map(x => parseInt(x, 10)))]
}
const PI_ra = to_digits(PI_expected)
const pin_count = ref(0)
const pin_cross_count = ref(0)
var requested_count = 100000;
var front = 0;
const canvas_1 = ref('canvas_1')
const canvas_2 = ref('canvas_2')
var canvas_ra: any[] = [];
var parquet_width: number;
var half_pin_length: number;
const debounce = (f: () => void, ms = 500) => {
  let timer: ReturnType<typeof setTimeout>
  return () => {
    clearTimeout(timer)
    timer = setTimeout(f, ms)
  }; 
}
var willResize = false
const resize = () => {
    canvas_ra[0].width = canvas_ra[1].width  = window.innerWidth;
    parquet_width = Math.max(40, Math.floor(window.innerHeight / PARQUET_COUNT))
    half_pin_length = parquet_width / PIN_RATIO
    canvas_ra[0].height = canvas_ra[1].height  = parquet_width * PARQUET_COUNT;
    var ctx = canvas_ra[0].getContext("2d")
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx = canvas_ra[1].getContext("2d")
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    willResize = false
}
const resizeListener = () => {
  if (!willResize) {
    willResize = true
    debounce(resize)
  }
}
onMounted(() => {
  canvas_ra = [
    canvas_1.value,
    canvas_2.value,
  ]
})
var pin_paquet = 0;
const initUI = () => {
  goodColor.value = 'hsl('+Math.random()*360+',66%,50%)'
  swapCanvas()
  resize()
}
const getFrontCanvas = () => {
  return canvas_ra[front]
}
const getBackCanvas = () => {
  return canvas_ra[1-front]
}
const swapCanvas = () => {
  canvas_ra[front].style.zIndex = -1;
  front = 1-front;
  canvas_ra[front].style.zIndex = -2;
}
onMounted(() => {
  initUI()
  pin_paquet = 1
  setTimeout(() => {
    throw_pins (10)
  }, 500);
})
const ratio = ref(0)
var ratio_ra = ref<number[]>([])
var good_ra: boolean[] = []
watch(ratio_ra, (old_ra: number[], new_ra: number[]) => {
  const ra: boolean[] = []
  var torf = true
  new_ra && new_ra.forEach((x, i) => {
    torf = torf && x == PI_ra[i]
    ra.push(torf)
  })
  good_ra = ra
})
const throw_one_pin = (w: number, h: number, ctx?: CanvasRenderingContext2D) => {
  var ans = false
  var M = [
    Math.random()*w,
    Math.random()*h, // beware the height is not free
  ];
  var theta = Math.PI*Math.random();
  var P_1: Point = [
    M[0]+half_pin_length*Math.cos(theta),
    M[1]+half_pin_length*Math.sin(theta),
  ];
  var P_2: Point = [
    2 * M[0] - P_1[0],
    2 * M[1] - P_1[1],
  ];
  var level = [
    Math.floor(COLOR_RANGE*Math.random()),
    Math.floor(COLOR_RANGE*Math.random()),
    Math.floor(COLOR_RANGE*Math.random()),
  ];
  if (crossing(P_1, P_2)) {
    level[0] += 255-COLOR_RANGE;
    level[1] += 255-COLOR_RANGE;
    level[2] += 255-COLOR_RANGE;
    ans = true;
  }
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(...P_1);
    ctx.lineTo(...P_2);
    ctx.strokeStyle = "rgb("+level[0]+","+level[1]+","+level[2]+")";
    ctx.stroke();
    ctx.closePath();
  }
  return ans
}
const throw_pins = (j?: number) => {
  var jj = j || requested_count
  var w = getBackCanvas().width;
  var h = getBackCanvas().height;
  var iterate: () => void
  iterate = () => {
    if (jj-->0) {
      if (pin_paquet<0) {
        return
      }
      swapCanvas();
      var ctx = getFrontCanvas().getContext("2d");
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 0.9925**(1+pin_paquet);
      ctx.drawImage(getBackCanvas(), 0, 0);
      ctx.globalAlpha = 1;
      var k =  10**pin_paquet
      var now = Date.now() + 250
      const f_1 = () => {
        while(k--) {
          pin_count.value++;
          if (throw_one_pin(w, h, ctx)) {
            pin_cross_count.value++;
          }
          if (Date.now() > now) {
            now = Date.now() + 250
            update(f_1)
            return
          }
        }
        update(iterate)
      }
      const update = (f: () => void) => {
        ratio.value = pin_count.value/pin_cross_count.value
        if (ratio.value < 10) {
          ratio_ra.value = to_digits(ratio.value)
        } else {
          ratio_ra.value = []
        }
        setTimeout(f, 125)
      }
      f_1()
    } else {
      toggleRun()
    }
  }
  iterate()
}
const crossing = (P_1: Point, P_2: Point) => {
  return Math.floor(P_1[1]/parquet_width) != Math.floor(P_2[1]/parquet_width)
}
const expectedStyle = computed((): string => {
  return 'opacity:0'+(ratio.value && ratio.value < 10? '.166666;': ';')
})
const ratioStyle = computed(() => {
  let ra = ratio_ra.value
  return 'opacity:'+(ra && ra[0] && ra[0] < 10? '1;': '0;')
})
const digitStyle = (i: number): string => {
  var ans = good_ra[i]
    ? 'color:'+ goodColor.value + ';'
    : ''
  return ans
}
const ratioDigit = (i: number): string => {
  let ra = ratio_ra.value
  var ans = ra && ra[i] != undefined ? ''+ra[i] : '0'
  return ans
}
const range_10 = [1,2,3,4,5,6,7,8,9,10]
const parquet = "parquet-low-resolution.jpg"

const toggleRun = (count?: number) => {
  pin_paquet = -pin_paquet-1;
  if (pin_paquet>=0) {
    throw_pins(count);
    requested_count = count ? count : Math.floor(pin_count.value/4)  
  }
}
const accelerate = () => {
  if (pin_paquet>=0) {
    ++pin_paquet;
  } else {
    --pin_paquet;
  }
}
const decelerate = () => {
  if (pin_paquet>0) {
    --pin_paquet;
  } else if (pin_paquet<-1) {
    ++pin_paquet;
  }
}
const displayOn = ref(true)
const show = (yorn: boolean) => {
  displayOn.value = yorn
}
defineExpose({ show, toggleRun, accelerate, decelerate, resizeListener })
</script>

<template>
<Slide :z-index='-1000' :bg-name="parquet">
  <Title>
    <p class="trial-title"><span class="trial-digit">{{pin_count}}</span> aiguilles,
      <span class="trial-digit">{{pin_cross_count}}</span> sur une ligne</p>
    <p class="trial-title trial-digit" :if="pin_cross_count>0">
      &pi; &simeq; <span class="trial-digit">{{pin_count}}</span>/<span class="trial-digit">{{pin_cross_count}}</span>
      &simeq; <span class="trial-span">
      <span class="trial-expected" :style="expectedStyle">
        <span class="trial-digit">{{''+PI_ra[0]}}</span>
        <span class="trial-digit">,</span>
        <span class="trial-digit" v-for="i in range_10">{{''+PI_ra[i]}}</span>
      </span>
      <span class="trial-ratio" :style="ratioStyle">
        <span class="trial-digit" :style="digitStyle(0)">{{ratioDigit(0)}}</span>
        <span class="trial-digit">,</span>
        <span v-for="i in range_10">
          <span :style="digitStyle(i)" class="trial-digit">{{ratioDigit(i)}}</span>
        </span>
      </span>
      </span>
    </p>
  </Title>
  <canvas ref="canvas_1" class="trial-canvas"></canvas>
  <canvas ref="canvas_2" class="trial-canvas"></canvas>
</Slide>
</template>

<style scoped>
.trial   {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}
h1 {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  margin-top: 0px;
  background-color: #eee;
  padding: 2px 4px;
  color: #304455;
}
.trial-title {
  font-family: VictorMono-Italic, JetBrainsMono, monospace;
  margin:10px;
  text-align: center;
}
canvas.trial-canvas {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  min-height: 480px;
}
.trial-expected {
  opacity: 0.1666;
}
.trial-span {
  display: inline-block;
  position: relative;
}
.trial-ratio {
  position: absolute;
  top:0px;
  left:0px;
}
.trial-digit {
  font-family: VictorMono-Regular, JetBrainsMono, monospace;
}
</style>
