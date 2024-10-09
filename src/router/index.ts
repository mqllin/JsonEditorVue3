import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/',
            name: 'home',
            component: () => import('../views/EditorView.vue')
        }

    ]
})

export default router
