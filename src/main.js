import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import store from './store'
import './index.css'
import vue3GoogleLogin from 'vue3-google-login'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
    .use(router)
    .use(store)
    .use(createMetaManager())
    .use(vue3GoogleLogin, {
        clientId:
            '613523520795-prtusecufq8d68qv8hjvk3a7hjsg78uv.apps.googleusercontent.com',
    })

router.isReady()
app.mount('#app')
