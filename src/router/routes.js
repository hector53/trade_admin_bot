
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/home.vue') }
    ]
  },
  {
    path: '/ordenes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Ordenes', component: () => import('pages/Ordenes.vue') }
    ]
  },
  {
    path: '/ordenes_cerradas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'ordenesCerradas', component: () => import('pages/ordenesCerradas.vue') }
    ]
  },
  {
    path: '/graficos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Graficos', component: () => import('pages/graficos.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
