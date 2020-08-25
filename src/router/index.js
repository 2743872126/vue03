import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }*/
    {
      path: '/',
      name: 'main',
      component: ()=>import('@/components/cookbook/main'),
      children:[

        {
          path: 'firstpage',
          name: 'firstpage',
          component: ()=>import('@/components/cookbook/firstpage'),
        }
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/cookbook/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/cookbook/Register')
    }
  ]
})
