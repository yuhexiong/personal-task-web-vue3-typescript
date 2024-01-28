import type { Module } from 'vuex';
import { SidebarActionType, SidebarMutationType, type SidebarState } from '../interfaces';

const module: Module<SidebarState, any> = {
  state: {
    isExpanded: false
  },
  mutations: {
    [SidebarMutationType.OPEN](state) {
      state.isExpanded = true;
    },
    [SidebarMutationType.CLOSE](state) {
      state.isExpanded = false;
    }
  },
  actions: {
    [SidebarActionType.OPEN]({ commit }) {
      commit(SidebarMutationType.OPEN);
    },
    [SidebarActionType.CLOSE]({ commit }) {
      commit(SidebarMutationType.CLOSE);
    }
  }
};

export default module;
