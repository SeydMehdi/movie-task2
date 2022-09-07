import { createRouter,  createWebHistory } from "vue-router";
import indexPage from '../pages/index.vue'
const routes = [
    {
        path :'/' , 
        name : "home" , 
        component : indexPage
    } , 
    {
        path : '/detail/:id' ,
        name :'detail',  
        component : import('../pages/detail.vue')
    }
]
export default createRouter({
    history : createWebHistory() , 
    routes
})