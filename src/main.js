import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import ClickOutside from './directives/click-outside'
import JWT from './services/jwt-token.service'
import HttpService from './services/http.service'
import FD from './services/form-data.service'
import Snotify from 'vue-snotify'
import Handler from './services/handler.service'
import columnSortable from 'vue-column-sortable'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './vee-validate'
import './scss/app.scss'
import './ml';

Vue.use(BootstrapVue);
Vue.use(JWT);
Vue.use(HttpService);
Vue.use(FD);
Vue.use(Snotify);
Vue.use(Handler);
Vue.use(columnSortable);
Vue.use(require('vue-pusher'), {
  api_key: `${process.env.VUE_APP_PUSHER_APP_KEY}`,
  options: {
    cluster: `${process.env.VUE_APP_PUSHER_APP_CLUSTER}`,
    encrypted: true
  }
});
Vue.config.productionTip = false;

Vue.filter('formatDate', (date, lang) => {
  return new Date(date).toLocaleDateString(lang);
});

Vue.filter('priority', (category, lang) => {
  if (lang === 'en') {
    switch (category) {
      case '1':
        return 'Low';
      case '2':
        return 'Middle';
      case '3':
        return 'High';
      case '4':
        return 'Emergency';
    }
  }
  if(lang === 'ru') {
    switch (category) {
      case '1':
        return 'Низкий';
      case '2':
        return 'Средний';
      case '3':
        return 'Высокий';
      case '4':
        return 'Неотложный';
    }
  }

});

Vue.filter('formatDate', (date) => {
  return new Date(date).toLocaleDateString('de');
});

library.add(faTimes, faCalendarAlt, faPlus, faChevronDown, faChevronLeft, faPowerOff, faEnvelope);
Vue.component('font-awesome-icon', FontAwesomeIcon);
new Vue({
  directive: {
    ClickOutside,
    columnSortable
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
