export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/admin',
    name: '接口管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/list' },
      { name: '查询表格', icon: 'table', path: '/admin/list', component: './TableList' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
