import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
            name: 'about',
            component: () => import('../views/EditorView.vue')
        },
        {
            path: '/EditorView',
            name: 'jsonEditor',
            component: () => import('../views/EditorView.vue')
        }

    ]
})

export default router
