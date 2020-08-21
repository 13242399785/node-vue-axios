import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Index',component: ()=>import('@/components/index')},
    {path: '/hello',name: 'HelloWorld',component: ()=>import('@/components/HelloWorld')},
    {path: '/content',name: 'content',component: ()=>import('@/components/content')},
    {path: '/slide',name: 'slide',component: ()=>import('@/components/slide')},
    {path: '/login',name: 'login',component: ()=>import('@/components/login')},
    {path: '/upload',name: 'upload',component: ()=>import('@/components/upload')}
  ]
})
