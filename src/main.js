import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css"
import './assets/css/tailwind.css'
import './assets/css/fonts.css'
import 'animate.css'

const app = createApp(App)
app.use(router)
app.use(Toast)
app.mount('#app')
