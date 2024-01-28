import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import route from './modules/route';
import sidebar from './modules/sidebar';

const store = createStore({
  modules: {
    route,
    sidebar
  },
});

export default store;
