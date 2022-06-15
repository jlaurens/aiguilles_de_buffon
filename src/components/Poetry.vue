<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from 'gsap'

export default defineComponent({
  // type inference enabled
  props: {
  },
  data() {
    return {
      count: 1
    }
  },
  methods: {
    reset_aspect () {
      const f_w = (e) => {
        e.style.position = 'static'
        e.style.color = null
        e.style.borderColor = null
        e.style.opacity = 1
      }
      const f_n = (e) => {
        e.style.opacity = 0
      }
      for (var i=0 ; i <= 32 ; ++i) {
        var e
        if ((e = this.$refs['w'+i])) {
          f_w(e)
          if ((e = this.$refs['w'+i+'b'])) {
            f_w(e)
          }
        }
        if ((e = this.$refs['n'+i])) {
          f_n(e)
          if ((e = this.$refs['n'+i+'b'])) {
            f_n(e)
          }
        }
      }
    },
    reset_status (i) {
      var ew = this.$refs['w'+i]
      var en = this.$refs['n'+i]
      ew.classList.remove('status1', 'status2', 'status3')
      en.classList.remove('status1', 'status2', 'status3')
    },
    set_status_1 (i) {
      var ew = this.$refs['w'+i]
      var en = this.$refs['n'+i]
      ew.classList.add('status1')
      en.classList.add('status1')
    },
    set_status_2 (i) {
      var ew = this.$refs['w'+i]
      var en = this.$refs['n'+i]
      ew.classList.remove('status1')
      en.classList.remove('status1')
      ew.classList.add('status2')
      en.classList.add('status2')
    },
    set_status_3 (i) {
      var ew = this.$refs['w'+i]
      var en = this.$refs['n'+i]
      ew.classList.remove('status2')
      en.classList.remove('status2')
      en.classList.add('status3')
    },
    animate_first_line (duration) {
      var tl = gsap.timeline()
      var magenta = "rgb(192,0,192)"
      var f_1w = (ew, label) => {
        tl.to(ew, {
          color: magenta,
          borderColor: magenta,
          duration: duration,
        }, label)
      }
      var f_1n = (en, label) => {
        tl.to(en, {
          color: magenta,
          duration: 0,
        }, label)
        tl.to(en, {
          opacity: 1,
          duration: duration,
        }, label)
      }
      var c  = this.style_w1__.getPropertyValue('color')
      var bc = this.style_w1__.getPropertyValue('borderColor')
      var f_2 = (pw, pn, label) => {
        if (pw) {
          tl.to(pw, {
            color: c,
            borderColor: bc,
            duration: duration,
          }, label)          
          tl.to(pw, {
            color: null,
            duration: 0,
          }, label)      
          tl.to(pn, {
            color: this.style_w1__.getPropertyValue('color'),
            duration: duration,
          }, label)      
          tl.to(pn, {
            color: null,
            duration: 0,
          }, label)      
        }
      }
      var pw, pn, label
      for (var i = 1 ; i <= 11; ++i) {
        label = ''+i
        tl.addLabel(label)
        var ew = this.$refs['w'+i]
        var en = this.$refs['n'+i]
        f_1w(ew, label)
        f_1n(en, label)
        f_2(pw, pn, label)
        pw = ew
        pn = en
      }
      f_2(pw, pn)
      return tl
    },
    animate_hide_words (duration, i_min, i_max) {
      var tl = gsap.timeline()
      var f = (ew) => {
        tl.to(ew, {
          opacity: 0,
          duration: duration*(1+Math.random())/2,
          ease:'power1.in',
        }, 0)
      }
      for (var i = i_min ; i <= i_max; ++i) {
        var ew = this.$refs['w'+i]
        f(ew)
        if ((ew = this.$refs['w'+i+'b'])) {
          f(ew)
        }
      }
      return tl
    },
    animate_other_line (duration, i_min, i_max) {
      var tl = gsap.timeline()
      var label = '1'
      tl.addLabel(label)
      var f_1w = (ew, label) => {
        tl.to(ew, {
          color: "rgb(192,0,192)",
          borderColor: "rgb(192,0,192)",
          duration: duration,
        }, label)
      }
      var f_1n = (en, label) => {
        tl.to(en, {
          color: "rgb(192,0,192)",
          duration: 0,
        }, label)
        tl.to(en, {
          opacity: "1",
          duration: duration,
        }, label)
      }
      const c =  this.style_w1__.getPropertyValue('color')
      const bc = this.style_w1__.getPropertyValue('borderColor')
      var f_2 = (pw, pn, label) => {
        if (pw) {
          tl.to(pw, {
            color: c,
            borderColor: bc,
            duration: 2*duration,
          }, label)          
          tl.to(pw, {
            color: null,
            duration: 0,
          })
          tl.to(pn, {
            color: this.style_w1__.getPropertyValue('color'),
            duration: 2*duration,
          }, label)      
          tl.to(pn, {
            color: null,
            duration: 0,
          })      
        }
      }
      var pw, pn
      for (var i = i_min ; i <= i_max; ++i) {
        var ew = this.$refs['w'+i]
        f_1w(ew, label)
      }
      label = '2'
      tl.addLabel(label)
      for (var i = i_min ; i <= i_max; ++i) {
        var en = this.$refs['n'+i]
        f_1n(en, label)
      }
      tl.to({}, {duration:2*duration})
      label = '3'
      tl.addLabel(label)
      for (var i = i_min ; i <= i_max; ++i) {
        var ew = this.$refs['w'+i]
        var en = this.$refs['n'+i]
        f_2(ew, en, label)
      }
      return tl
    },
    animate_center (duration) {
      const tl = gsap.timeline()
      const t = ''+(window.innerHeight/2.1)+'px'
      const f = (en) => {
        tl.to(en, {
          top: t,
          duration: duration,
          ease: 'power1.inOut',
        }, 0)
      }
      for (var i = 0 ; i <= 32 ; ++i) {
        var en = this.$refs['n'+i]
        f(en)
        if ((en = this.$refs['n'+i+'b'])) {
          f(en)
        }
      }
      en = this.$refs['n32']
      tl.to(en, {
        opacity: 1,
        duration: duration,
        ease: 'power1.in',
      }, 0)
      return tl
    },
    animate_place_numbers (duration) {
      const tl = gsap.timeline()
      const e1 = this.$refs.n1
      var r = e1.getBoundingClientRect()
      const w = r.right - r.left
      const l = (window.innerWidth/2-16*w)
      const colors = {}
      const h = 360*Math.random()
      for (var i = 0; i < 10; ++i) {
        colors[''+i] = 'hsl('+(h+i*36)%360+',66%,50%)'
      }
      {
        let i = colors.length,  j;
        while (i) {
          j = Math.floor(Math.random() * i);
          i--;
          [colors[i], colors[j]] = [
            colors[j], colors[i]];
        }
      }
      var en = this.$refs.w31
      r = en.getBoundingClientRect()
      const t = ''+r.top+'px'
      en = this.$refs.n0
      en.style.display = 'block'
      en.style.position = 'absolute'
      en.style.zIndex = 99
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
      en = this.$refs.n0b
      en.style.display = 'block'
      en.style.position = 'absolute'
      en.style.zIndex = 99
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
      e1.style.zIndex = 99
      tl.to(e1, {
        color: colors[e1.textContent],
        top: t,
        left: l+'px',
        duration: duration,
        ease: 'power1.inOut',
      })
      en = this.$refs.n1b
      en.style.display = 'block'
      en.style.position = 'absolute'
      en.style.zIndex = 99
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
      for (var i = 2 ; i <= 31 ; ++i) {
        en = this.$refs['n'+i]
        en.style.zIndex = 100-i
        tl.to(en, {
          top: t,
          color: colors[en.textContent],
          left: (l+i*w)+'px',
          duration: duration,
          ease: 'power1.inOut',
        }, ">-="+(33+(i-2)/29*67)+"%")
      }
      en = this.$refs.n32
      en.style.display = 'block'
      en.style.position = 'absolute'
      en.style.zIndex = 99
      tl.to(en, {
        top: t,
        left: (l+32*w)+'px',
        duration: 0,
      })
      return tl
    },
    animate () {
      if (this.poetry_timeline__) {
        return
      }
      this.reset_aspect()
      this.reset_layout()
      var elem1 = this.$refs.w1;
      this.style_w1__ = window.getComputedStyle(elem1, null);
      const tl = gsap.timeline({
        onComplete: () => {
          this.poetry_timeline__ = null
        },
      })
      tl.add(this.animate_first_line(1))
      tl.add(this.animate_other_line(1, 12, 15))
      tl.add(this.animate_other_line(1, 16, 23))
      tl.add(this.animate_other_line(1, 24, 31))
      tl.add(this.animate_hide_words(1, 1,  31))
      tl.to({},{duration:1})
      tl.add(this.animate_place_numbers(1))
      tl.add(this.animate_center(1))
      this.poetry_timeline__ = tl
    },
    start () {
      this.reset_layout()
      this.$refs.numbers.style.opacity="1"
      this.current__ = 0
      this.status__ = 0
      for (var i = 1; i <= 31 ; ++i ) {
        this.reset_status(i)
      };
    },
    next (): boolean {
      var magenta = "rgb(192,0,192)"
      var ew = this.$refs['w'+this.current__]
      var en
      if (ew) {
        en = this.$refs['n'+this.current__]
        switch (++this.status__) {
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
      ++this.current__
      ew = this.$refs['w'+this.current__]
      if (ew) {
        en = this.$refs['n'+this.current__]
        this.status__ = 1
        ew.classList.add('status1')
        en.classList.add('status1')
        return true
      }
      return this.status__<3
    },
    reset_layout() {
      var min = 1;
      var T = 100;
      [11, 4, 8, 8].forEach((length) => {
        var top = Number.MAX_SAFE_INTEGER
        var bottom = Number.MAX_SAFE_INTEGER
        var height
        var position
        for (var i = min; i < min+length; ++i) {
          var ew = this.$refs['w'+i]
          var rw = ew.getBoundingClientRect()
          if (rw.top<top) {
            top = rw.top
          }
          if (rw.bottom<bottom) {
            bottom = rw.bottom
          }
          var en = this.$refs['n'+i]
          var rn = en.getBoundingClientRect()
          height = rn.bottom - rn.top
          position = ((rw.left+rw.right)/2-(rn.right-rn.left)/2)+'px'
          en.style.position = "absolute"
          en.style.left = position
          var rn1 = en.getBoundingClientRect()
        }
        position = (top - 0.65 * (bottom - top)-height)+'px'
        for (var i = min; i < min+length; ++i) {
          var en = this.$refs['n'+i]
          en.style.top = position
        }
        min+=length
        T += 100
      })
    }
  },
  mounted() {
    this.controller__ = new AbortController();
    document.addEventListener(
      "keyup",
      (e: KeyboardEvent) => {
        if (e.key ==  "a") {
          this.animate();
        } else if (e.key ==  "s") {
          this.start();
        } else if (e.key ==  "n") {
          this.next();
        }
      },
      { signal: this.controller__.signal }
    );
    setTimeout(() => {
      this.reset_layout()
    }, 1000);
  },
  unmounted() {
    this.controller__.abort()
  },
  activated () {
    
  },
  deactivated () {
    
  },
})
</script>

<template>
  <div class="main">
    <div ref="words">
      <div ref="l1" class="verse">
        <span ref="w1">Que</span>&nbsp;
        <span ref="w2">j</span>
        <span ref="w2b">'</span>
        <span ref="w3">aime</span>&nbsp;
        <span ref="w4">à</span>&nbsp;
        <span ref="w5">faire</span>&nbsp;
        <span ref="w6">apprendre</span>&nbsp;
        <span ref="w7">un</span>&nbsp;
        <span ref="w8">nombre</span>&nbsp;
        <span ref="w9">utile</span>&nbsp;
        <span ref="w10">aux</span>&nbsp;
        <span ref="w11">sages</span>&nbsp;
        <span ref="w11b">!</span>
      </div>
      <div ref="l2" class="verse">
        <span ref="w12">Glorieux</span>&nbsp;
        <span ref="w13">Archimède</span>
        <span ref="w13b">,</span>&nbsp;
        <span ref="w14">artiste</span>&nbsp;
        <span ref="w15">ingénieur</span>
        <span ref="w15b">,</span>
      </div>
      <div ref="l3" class="verse">
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
      <div ref="l4" class="verse">
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
      <p ref="n0">π</p>
      <p ref="n0b">=</p>
      <p ref="n1">3</p>
      <p ref="n1b">,</p>
      <p ref="n2">1</p>
      <p ref="n3">4</p>
      <p ref="n4">1</p>
      <p ref="n5">5</p>
      <p ref="n6">9</p>
      <p ref="n7">2</p>
      <p ref="n8">6</p>
      <p ref="n9">5</p>
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
      <p ref="n32">...</p>
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
  z-index: 50;
  left:0px;
  top:0px;
  height:100%;
  width:100%;
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
