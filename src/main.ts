import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'unfonts.css'

import App from './App.vue'
import router from './router'
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)
app.use(createPinia())
app.use(router)
app.mount('#app')
document.addEventListener('contextmenu', function (e) {
  e.preventDefault()
})
