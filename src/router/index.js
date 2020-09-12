import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
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
          path:'editWorks',
          name: 'EditWorks',
          component: ()=>import('@/components/cookbook/EditWorks'),
        },
        {
          path: '/housing_order',
          name: 'Housing_order',
          component: ()=>import('@/components/cookbook/Housing_order'),
        },
        {
          path: 'studioTypes',
          name: 'StudioTypes',
          component: ()=>import('@/components/cookbook/StudioTypes'),
          redirect:'/studioTypes/StudioMain',
          children:[
            {
              path: 'CheckStudiesByType',
              name: 'CheckStudiesByType',
              component: ()=>import('@/components/cookbook/CheckStudiesByType'),
            },
            {
              path: 'CheckAllStudio',
              name: 'CheckAllStudio',
              component: ()=>import('@/components/cookbook/CheckAllStudio'),
            },
            {
              path: 'StudioMain',
              name: 'StudioMain',
              component: ()=>import('@/components/cookbook/StudioMain'),
            },
          ]
        },
        {
          path: 'WorkDynamic',
          name: 'WorkDynamic',
          component: ()=>import('@/components/cookbook/WorkDynamic'),
        },
        {
          path: 'AllWorks',
          name: 'AllWorks',
          component: ()=>import('@/components/cookbook/AllWorks'),
        },
        {
          path: 'updateMenus',
          name: 'UpdateMenus',
          component: ()=>import('@/components/cookbook/UpdateMenus'),
        },
        {
          path: 'firstpage/',
          name: 'firstpage',
          component: ()=>import('@/components/cookbook/firstpage'),
        },
        {
          path: 'MenuWorks',
          name: 'MenuWorks',
          component: ()=>import('@/components/cookbook/MenuWorks'),
        },
        {
          path: 'MenuWorks2',
          name: 'MenuWorks2',
          component: ()=>import('@/components/cookbook/MenuWorks2'),
        },
        {
          path: 'WorkDetail',
          name: 'WorkDetail',
          component: ()=>import('@/components/cookbook/WorkDetail'),
        },
        {
          path: 'LeavMessage',
          name: 'LeavMessage',
          component: ()=>import('@/components/cookbook/LeavMessage'),
        },
        {
          path: 'LeavMessage2',
          name: 'LeavMessage2',
          component: ()=>import('@/components/cookbook/LeavMessage2'),
        },
        {
          path: 'WriteLeavMessage',
          name: 'WriteLeavMessage',
          component: ()=>import('@/components/cookbook/WriteLeavMessage'),
        },
        {
          path: 'UsersShow',
          name: 'UsersShow',
          component: ()=>import('@/components/cookbook/UsersShow'),
        },
        {
          path: 'CheckUsers',
          name: 'CheckUsers',
          component: ()=>import('@/components/cookbook/CheckUsers'),
        },
        {
          path: 'MenusDetail',
          name: 'MenusDetail',
          component: ()=>import('@/components/cookbook/MenusDetail'),
        },
        {
          path: 'email',
          name: 'Email',
          component: ()=>import('@/components/cookbook/Email'),
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
            },
            {
              path: 'ChilerenAllMenus',
              name: 'ChilerenAllMenus',
              component: ()=>import('@/components/cookbook/ChilerenAllMenus'),

            },
            {
              path: 'CheckMenus',
              name: 'CheckMenus',
              component: ()=>import('@/components/cookbook/CheckMenus'),
            }
          ]
        },
        {
          path:'/createMenus',
          name:'CreateMenus',
          component:()=>import('@/components/cookbook/createMenus'),
        },
        {
          path:'/createStudio',
          name:'CreateStudio',
          component:()=>import('@/components/cookbook/CreateStudio'),
        },
        {
          path:'/studioBook',
          name:'StudioBook',
          component:()=>import('@/components/cookbook/StudioBook'),
        },
        {
          path: '/createWorks',
          name: 'CreateWorks',
          component: ()=>import('@/components/cookbook/CreateWorks'),
          meta: {allowBack: false}
        }
        ,
        {
          path: 'personal',
          name: 'Personal',
          component: ()=>import('@/components/cookbook/Personal'),
          children:[
            {
              path: 'chenWeiStudioChu',
              name: 'ChenWeiStudioChu',
              component: ()=>import('@/components/cookbook/ChenWeiStudioChu'),
            },
            {
              path: 'turnover',
              name: 'Turnover',
              component: ()=>import('@/components/cookbook/Turnover'),
            },
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
            },
            {
              path:'followMe',
              name:'FollowMe',
              component:()=>import("@/components/cookbook/FollowMe")
            },
            {
              path:'follows',
              name:'Follows',
              component:()=>import("@/components/cookbook/Follows")
            }
          ]
        },
        {
          path: 'theirPersonal',
          name: 'TheirPersonal',
          component: ()=>import('@/components/cookbook/TheirPersonal'),
          children:[
            {
              path:'thierMenus',
              name:'ThierMenus',
              component:()=>import("@/components/cookbook/ThierMenus")
            },
            {
              path:'thireWorks',
              name:'ThireWorks',
              component:()=>import("@/components/cookbook/ThireWorks")
            },
            {
              path:'thireStudio',
              name:'ThireStudio',
              component:()=>import("@/components/cookbook/ThireStudio")
            }
          ]
        },
        {
          path: '/tools',
          name: 'Tools',
          component: () => import('@/components/cookbook/Tools')
        }

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
      path: '/myVideo',
      name: 'MyVideo',
      component: () => import('@/components/cookbook/MyVideo')
    },
    {
      path: '/videoPlay',
      name: 'videoPlay',
      component: () => import('@/components/cookbook/videoPlay')
    },


    {
      path: '/tanwei_pay',
      name: 'Tanwei_pay',
      component: ()=>import('@/components/cookbook/Tanwei_pay'),
    }
    ,
    {
      path: '/success',
      name: 'Success',
      component: () => import('@/components/cookbook/Success')
    },



    {
      path: '/Login1',
      name: 'Login1',
      component: () => import('../components/backstage/Login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/backstage/home'),
      children: [
        {
          path: '/details',
          name: 'details',
          component: () => import('../components/backstage/details')
        },
        {
          path: '/Users',
          name: 'Users',
          component: () => import('../components/backstage/Users')
        },
        {
          path: '/functions',
          name: 'functions',
          component: () => import('../components/backstage/functions')
        },{
          path: '/backmenus',
          name: 'backmenus',
          component: () => import('../components/backstage/menus')
        },{
          path: '/Myself',
          name: 'Myself',
          component: () => import('../components/backstage/Myself')
        }
        ,{
          path: '/menuType',
          name: 'menuTypes',
          component: () => import('../components/backstage/menuTypes')
        }
        ,{
          path: '/CurriculumClassification',
          name: 'CurriculumClassification',
          component: () => import('../components/backstage/CurriculumClassification')
        }
        ,{
          path: '/works',
          name: 'works',
          component: () => import('../components/backstage/work')
        }
        ,{
          path: '/Msg',
          name: 'Back_LeaveMessage',
          component: () => import('../components/backstage/Back_LeaveMessage')
        },{
          path: '/form',
          name: 'Back_LeaveMessage',
          component: () => import('../components/backstage/Back_ReportForm')
        }
      ]
    }
  ]
})
