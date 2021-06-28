import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/identity/Login.vue'
import Register from '../views/identity/Register.vue'
import TransportOffers from '../views/transportoffers/TransportOffers.vue'
import TransportOfferAdd from '../views/transportoffers/TransportOfferAdd.vue'
import TransportOfferDetails from '../views/transportoffers/TransportOfferDetails.vue'
import TransportOfferEdit from '../views/transportoffers/TransportOfferEdit.vue'
import TransportOfferDelete from '../views/transportoffers/TransportOfferDelete.vue'
import UserItems from '../views/useritems/UserItems.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/identity/login',
        name: 'identity-login',
        component: Login,
    },
    {
        path: '/identity/register',
        name: 'identity-register',
        component: Register,
    },
    {
        path: '/transportoffers/',
        name: 'transportoffers',
        component: TransportOffers,
    },
    {
        path: '/transportoffers/add',
        name: 'transportofferadd',
        component: TransportOfferAdd,
    },
    {
        path: '/transportoffers/details/:id',
        name: 'transportofferdetails',
        component: TransportOfferDetails,
        props: true,
    },
    {
        path: '/transportoffers/edit/:id',
        name: 'transportofferedit',
        component: TransportOfferEdit,
        props: true,
    },
    {
        path: '/useritems/',
        name: 'useritems',
        component: UserItems,
    },
    {
        path: '/transportoffers/delete/:id',
        name: 'transportofferdelete',
        component: TransportOfferDelete,
        props: true,
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
