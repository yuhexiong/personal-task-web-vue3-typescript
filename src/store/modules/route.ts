import { RouteActionType, RouteMutationType, type RouteState } from '@/store/interfaces';
import type { Module } from 'vuex';

const module: Module<RouteState, any> = {
  state: {
    constantRoutes: [],
    dynamicRoutes: []
  },
  mutations: {
    [RouteMutationType.SET_ROUTE](state, route) {
      state.constantRoutes.push(route);
    }
  },
  actions: {
    [RouteActionType.ACTION_SET_ROUTE]({ commit }, route) {
      commit(RouteMutationType.SET_ROUTE, route);
    }
  },
  getters: {
    accessibleRoutes(state) {
      return state.constantRoutes;
    }
  }
};

export default module;
