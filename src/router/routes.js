const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        children: [
          {
            name: 'login',
            path: 'login',
            component: () => import('components/Login.vue'),
          },
          {
            name: 'register',
            path: 'register',
            component: () => import('components/Register.vue'),
          },
        ],
      },
      {
        path: 'me',
        component: () => import('pages/Me.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
