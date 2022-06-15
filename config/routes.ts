export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: '注册',
            path: '/user/register',
            component: './user/Register',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/user-manage',
        name: '用户管理',
        icon: 'smile',
        component: './Admin/UserManage',
      },
      {
        path: '/admin/minzu',
        name: '民族库管理',
        icon: 'table',
        component: './Admin/MinzuManage',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '搜索列表（项目）',
    icon: 'smile',
    path: '/minzusearch',
    component: './Minzu/Minzusearch',
  },
  {
    path: '/minzu',
    name: '民族库',
    icon: 'table',
    component: './Minzu/MinzuList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },

  {
    component: './404',
  },


];
