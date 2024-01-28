import type { RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/Index.vue';

const homeRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          title: '首頁',
          icon: 'house'
        }
      }
    ]
  }
];

export default homeRoute;
