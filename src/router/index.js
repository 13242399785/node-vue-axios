import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Index',component: ()=>import('@/components/index')},
    {path: '/hello',name: 'HelloWorld',component: ()=>import('@/components/HelloWorld')}
  ]
})
