import Vue from 'vue';
import Vuex from 'vuex';
import socket from './modules/socket';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
      socket
  },
  getters
});

export default store
