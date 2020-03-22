import Vue from 'vue';
import JWT from '../../services/jwt-token.service';

Vue.use(JWT);

export default function auth({next}){
    if(!Vue.prototype.$jwt.isAdmin()) {
        return next({
            name: 'ticket'
        })
    }
    return next()
}
