import Vue from "vue";
import VueRouter from "vue-router";
import UserHomePage from '../components/UserHomePage';
import ConnexionPage from '../components/ConnexionPage';

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/connexionPage'},
    {path: '/connexionPage', component: ConnexionPage},
    {path: '/userHomePage', component: UserHomePage },
    {
        path: '/personne/:id',
        name: 'PersonneDetails',
        component: () => import('../components/PersonneDetailsPage.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;