import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/community',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/community.vue'], resolve)
                },

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/communityItem',
            component: resolve => require(['../components/page/communityItem.vue'], resolve),
            children:[
                {
                    path: '/',
                    redirect: '/comItemBase'
                },
                {
                path: '/comItemBase',
                component: resolve => require(['../components/page/comItemchild/comItemBase.vue'], resolve),
            },
                {
                path: '/comItemJob',
                component: resolve => require(['../components/page/comItemchild/comItemJob.vue'], resolve),
            },
                {
                path: '/comItemPerson',
                component: resolve => require(['../components/page/comItemchild/comItemPerson.vue'], resolve),
            },
                {
                path: '/comItemActive',
                component: resolve => require(['../components/page/comItemchild/comItemActive.vue'], resolve),
            }]
        },
    ]
})
