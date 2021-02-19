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
      {
        path: 'submit',
        component: () => import('pages/Submit.vue'),
      },
      {
        path: 'post/:slug',
        component: () => import('pages/Post.vue'),
        props: true,
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
