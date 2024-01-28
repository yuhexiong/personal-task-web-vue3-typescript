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
  SET_ROUTE = 'SET_ROUTE'
}

export enum SidebarMutationType {
  OPEN_SIDE_BAR = 'OPEN_SIDE_BAR',
  CLOSE_SIDE_BAR = 'CLOSE_SIDE_BAR'
}

/* Action */
export enum RouteActionType {
  ACTION_SET_ROUTE = 'ACTION_SET_ROUTE'
}

export enum SidebarActionType {
  ACTION_OPEN_SIDE_BAR = 'ACTION_OPEN_SIDE_BAR',
  ACTION_CLOSE_SIDE_BAR = 'ACTION_CLOSE_SIDE_BAR',
}
