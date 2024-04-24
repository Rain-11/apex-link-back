export default [
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
      { name: '接口管理', icon: 'table', path: '/admin/list', component: './TableList' },
      { path: '/admin/UserManager', name: '用户管理', component: './UserManager' },
    ],
  },
  {
    path: '/home',
    name: '接口信息',
    icon: 'CloudOutlined',
    routes: [
      { path: '/home', redirect: '/home/list' },
      { name: '接口列表', icon: 'table', path: '/home/list', component: './Home' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
