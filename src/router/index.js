import {createRouter, createWebHistory} from 'vue-router';

const CategoryView = () => import('@/views/CategoryView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: CategoryView
        },
        {
            path: '/home',
            redirect: '/'
        },
        {
            path: '/:category',
            component: CategoryView,
            children: [
                {
                    path: ':subcategory',
                    component: CategoryView,
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        }
    ],
});

export default router;
