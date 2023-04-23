import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

createApp(App).use(ElementPlus, { size: 'large', zIndex: 3000 }).use(createPinia()).mount('#app')
