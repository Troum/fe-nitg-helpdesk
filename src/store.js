import Vue from 'vue'
import Vuex from 'vuex'
import JWT from "./services/jwt-token.service";

Vue.use(Vuex);
Vue.use(JWT);

export default new Vuex.Store({
  state: {
    loading: false,
    user: {
      data: null,
      authenticate: !!Vue.prototype.$jwt.token()
    },
    items: []
  },
  mutations: {
    loading(state) {
      state.loading = !state.loading;
    },
    authenticate(state, token) {
      state.user.authenticate = true;
      Vue.prototype.$jwt.store(token);
    },
    logout(state) {
      state.user.authenticate = false;
      Vue.prototype.$jwt.remove();
    },
    user(state, data) {
      state.user.data = data
    },
    items(state, data) {
      state.items = [...data];
    }
  },
  getters: {
    items(state) {
      return state.items;
    },
    loading(state) {
      return state.loading;
    }
  },
  actions: {
    authenticate(state) {
      return state.user.authenticate;
    }
  }
})
