import Vue from 'vue';
import JWT from '../../services/jwt-token.service';

Vue.use(JWT);

export default function auth({next, store}){
  if(!store.getters.authenticate && !Vue.prototype.$jwt.token()) {
      return next({
          name: 'registration'
      })
  }
  return next()
}
