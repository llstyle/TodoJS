import { createApp } from 'vue'
import { createPinia } from 'pinia'

import components from '@/components/UI';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(pinia)
    .use(router)
    .mount('#app')
