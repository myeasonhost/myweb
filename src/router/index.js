import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
import Full2 from '@/containers/Full2'

import Buttons from '@/views/components/Buttons'

// Views - Pages
import Page404 from '@/views/errorPages/Page404'
import Page500 from '@/views/errorPages/Page500'


/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    {path: '/pages',redirect: '/pages/p404', name: 'Pages',
          component: {
            render (c) { return c('router-view') }
              // Full,
          },
          children: [{path: '404',  name: 'Page404', component: _import('errorPages/Page404') },
                     {path: '500',name: 'Page500',component: _import('errorPages/Page404')},
                    ]
    }


]

export default new Router({
  mode: 'hash', 
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [

 {
    path: '/',
    redirect: '/zbList',
    name: '首页',
    component: Full,
    hidden:false,
    children: [
        // {path: '/dashboard',name: '直播总览',icon:'speedometer',component: _import('Dashboard')},
        // {path: '/introduction',name: '直播排行',icon:'thumbsup',component: _import('Introduction')},
        {path: '/zbList',name: '直播列表',icon:"home",component: _import('zbList')},
        { path: '/zbList/details', icon:"home",name: '直播间', component: _import('zbListDetails'),hidden: true }
    ]
  },
  //  {
  //   path: '/home1',
  //   redirect: '/home1/introduction',
  //   name: '首页2',
  //   component: Full2,
  //   hidden:false,
  //   children: [
  //    {path: '/home1/dashboard',name: '热门',icon:'speedometer',component: _import('Dashboard')},
  //    {path: '/home1/introduction',name: '最新',icon:'thumbsup',component: _import('Introduction')},
  //    {path: '/home1/table',name: '收费',icon:'spoon',component: _import('Table')},
  //    {path: '/home1/jsonTree',name: '收藏',icon:'tshirt',component: _import('JsonTree')},
  //   ]
  // },

  { path: '*', redirect: '/pages/404', hidden: true }
  
];
