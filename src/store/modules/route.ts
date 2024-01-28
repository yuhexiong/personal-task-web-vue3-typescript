import { RouteActionType, RouteMutationType, type RouteState } from '@/store/interfaces';
import type { Module } from 'vuex';

const module: Module<RouteState, any> = {
  state: {
    constantRoutes: [],
    dynamicRoutes: []
  },
  mutations: {
    [RouteMutationType.SET](state, route) {
      state.constantRoutes.push(route);
    }
  },
  actions: {
    [RouteActionType.SET]({ commit }, route) {
      commit(RouteMutationType.SET, route);
    }
  },
  getters: {
    accessibleRoutes(state) {
      return state.constantRoutes;
    }
  }
};

export default module;
