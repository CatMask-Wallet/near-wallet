import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    // dark: false,
  },
  dva: {},
  locale: {
    default: 'en-US',
    antd: true,
    title: true,
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      title: 'overview.title',
      routes: [
        { path: '/', component: '@/pages/index', title: 'overview.title' },
        { path: '/login', component: '@/pages/login', title: 'overview.title' },
        { path: '/recover', component: '@/pages/recover', title: 'overview.title' },
        { path: '/send', component: '@/pages/send', title: 'overview.title' },
        {
          path: '/success',
          component: '@/pages/success',
          title: 'overview.title',
        },
        {
          path: '/receive',
          component: '@/pages/receive',
          title: 'overview.title',
        },
        { path: '*', component: '@/pages/404', title: 'overview.title' },
      ],
    },
    { path: '*', component: '@/pages/404', title: 'overview.title' },
  ],
  fastRefresh: {},
  links: [
    {
      rel: 'icon',
      href: 'favicon.ico',
    },
  ],
});
