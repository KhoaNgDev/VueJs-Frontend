import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { useAuthStore } from './stores/authStore'

axios.defaults.baseURL = 'https://api.webnew.info.vn' // API domain
axios.defaults.withCredentials = false // chỉ dùng Bearer token

const app = createApp(App)
app.use(createPinia())

// Khởi tạo Auth Store trước khi mount app
const authStore = useAuthStore()
authStore.initAuth()

app.use(router)
app.mount('#app')
