import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './auth';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const Store = new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [createPersistedState()],

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING,
});

if (process.env.DEV && module.hot) {
  module.hot.accept(['./auth'], () => {
    // eslint-disable-next-line global-require
    const newAuth = require('./auth').default;
    Store.hotUpdate({ modules: { auth: newAuth } });
  });
}

export default Store;
