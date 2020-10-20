import Vue from 'vue';
import Vuex from 'vuex';

import listings from './modules/Listing';
import users from './modules/User';

Vue.use(Vuex);

// eslint-disable-next-line import/prefer-default-export
export const store = new Vuex.Store({
  modules: {
    users,
    listings,
  },
});