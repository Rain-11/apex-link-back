﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      {
        name: '注册',
        path: '/user/register',
        component: './User/Register',
      },
      {
        name: '忘记密码',
        path: '/user/forgotPassword',
        component: './User/ForgotPassword',
      },
    ],
  },
  {
    path: '/admin',
    name: '系统管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/list' },
      { name: '接口管理', path: '/admin/list', component: './TableList' },
      { path: '/admin/UserManager', name: '用户管理', component: './UserManager' },
    ],
  },
  {
    path: '/home',
    name: '接口信息',
    icon: 'CloudOutlined',
    routes: [
      { path: '/home', redirect: '/home/list' },
      { name: '接口列表', path: '/home/list', component: './Home' },
      {
        name: '接口详情',
        path: '/home/interfaceDetails/:id',
        hideInMenu: true,
        component: './Home/InterfaceDetails',
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '个人信息',
    path: '/user/personalInformation',
    component: './User/PersonalInformation',
    hideInMenu: true,
  },
  { path: '*', layout: false, component: './404' },
];
