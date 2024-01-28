import type { RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layout/Index.vue';

const taskRoute: Array<RouteRecordRaw> = [
  {
    path: '/task',
    component: AppLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/task/Index.vue'),
        name: 'task',
        meta: {
          title: '事務',
          icon: 'book'
        }
      }
    ]
  }
];

export default taskRoute;
