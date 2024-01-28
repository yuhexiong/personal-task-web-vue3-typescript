import type { Module } from 'vuex';
import { SidebarActionType, SidebarMutationType, type SidebarState } from '../interfaces';

const module: Module<SidebarState, any> = {
  state: {
    isExpanded: false
  },
  mutations: {
    [SidebarMutationType.OPEN_SIDE_BAR](state) {
      state.isExpanded = true;
    },
    [SidebarMutationType.CLOSE_SIDE_BAR](state) {
      state.isExpanded = false;
    }
  },
  actions: {
    [SidebarActionType.ACTION_OPEN_SIDE_BAR]({ commit }) {
      commit(SidebarMutationType.OPEN_SIDE_BAR);
    },
    [SidebarActionType.ACTION_CLOSE_SIDE_BAR]({ commit }) {
      commit(SidebarMutationType.CLOSE_SIDE_BAR);
    }
  }
};

export default module;
