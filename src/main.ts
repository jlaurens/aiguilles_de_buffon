import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './scss/app.scss'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

let app=createApp(App)
app.use(createPinia())
app.use(createVuestic())
app.mount('#app')


