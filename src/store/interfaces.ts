import type { RouteRecordRaw } from 'vue-router';

/* State */
export interface RouteState {
  constantRoutes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

export interface SidebarState {
  isExpanded: boolean
}

/* Mutation */
export enum RouteMutationType {
  SET = 'SET'
}

export enum SidebarMutationType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE'
}

/* Action */
export enum RouteActionType {
  SET = 'SET'
}

export enum SidebarActionType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}
