import {
  createRouter, createWebHistory, type RouteRecordRaw
} from 'vue-router';
import store from '@/store';
import { RouteActionType } from '@/store/interfaces';

const modules: RouteRecordRaw[] = [];
const files: Record<string, RouteRecordRaw> = import.meta.glob(
  [
    './modules/*.ts',
    '!./modules/index.ts'
  ],
  { eager: true, import: 'default' }
);

Object.keys(files).forEach((key) => {
  const route = Object.values(files[key]);
  modules.push(...route);
});

export const constantRoutes: Array<RouteRecordRaw> = [
  ...modules
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
});

constantRoutes.forEach((route) => {
  store.dispatch(RouteActionType.ACTION_SET_ROUTE, route);
});

export default router;
