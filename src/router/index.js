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
      redirect:'/firstpage',
      children:[
        {
          path: 'firstpage',
          name: 'firstpage',
          component: ()=>import('@/components/cookbook/firstpage'),
        },
        {
          path: 'Menus',
          name: 'menus',
          component: ()=>import('@/components/cookbook/Menus'),
          children:[
            {
              path: 'ChildrenMenu',
              name: 'ChildrenMenu',
              component: ()=>import('@/components/cookbook/ChildrenMenu'),
            },
            {
              path: 'ChildrenMenu2',
              name: 'ChildrenMenu2',
              component: ()=>import('@/components/cookbook/ChildrenMenu2'),
            }
          ]
        },
        {
          path:'/createMenus',
          name:'CreateMenus',
          component:()=>import('@/components/cookbook/createMenus'),
        }
        ,
        {
          path: 'personal',
          name: 'Personal',
          component: ()=>import('@/components/cookbook/Personal'),
          children:[
            {
              path: 'general',
              name: 'General',
              component: ()=>import('@/components/cookbook/General'),
            },
            {
              path: 'mymenus',
              name: 'Mymenus',
              component: ()=>import('@/components/cookbook/Mymenus'),
            },
            {
              path: 'myworks',
              name: 'Myworks',
              component: ()=>import('@/components/cookbook/Myworks'),
            },
            {
              path: 'myStudio',
              name: 'MyStudio',
              component: ()=>import('@/components/cookbook/MyStudio'),
            },
            {
              path: 'myStudio2',
              name: 'MyStudio2',
              component: ()=>import('@/components/cookbook/MyStudio2'),
            },
            {
              path: 'collected',
              name: 'Collected',
              component: ()=>import('@/components/cookbook/Collected'),
            },
            {
              path: 'collected2',
              name: 'Collected2',
              component: ()=>import('@/components/cookbook/Collected2'),
            },
            {
              path: 'drafts',
              name: 'Drafts',
              component: ()=>import('@/components/cookbook/Drafts'),
            }
          ]
        },
      ],
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/cookbook/Register')
    },
    {
      path: '/login2',
      name: 'Login2',
      component: () => import('@/components/cookbook/Login2')
    },
    {
      path: '/tools',
      name: 'Tools',
      component: () => import('@/components/cookbook/Tools')
    }
  ]
})
