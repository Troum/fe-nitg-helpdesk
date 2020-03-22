import Vue from 'vue';
import Snotify from 'vue-snotify';
import JWT from "../jwt-token.service";
import router from "../../router/router";
import '../../ml';
Vue.use(Snotify);
Vue.use(JWT);


const Handler = {
    install(Vue) {
        Vue.prototype.$handler = {
            success: (message, options = null) => {
                if(options) {
                    Vue.prototype.$snotify.setDefaults(options);
                }
                Vue.prototype.$snotify.success(message);
            },
            error: (error) => {
                switch (error.response.status) {
                    case 401:
                        if(Vue.prototype.$jwt.isAdmin()) {
                            Vue.prototype.$snotify.setDefaults({
                                toast: {
                                    timeout: 15000,
                                    closeOnClick: true,
                                    buttons: [
                                        {
                                            text: error.response.data.text,
                                            closeOnClick: true,
                                            action: () => {
                                                Vue.prototype.$jwt.remove();
                                                router.push({name: 'admin'});
                                            },
                                            bold: false
                                        }
                                    ]
                                }
                            });
                            Vue.prototype.$snotify.warning(error.response.data.error)
                        } else {
                            Vue.prototype.$snotify.setDefaults({
                                toast: {
                                    timeout: 15000,
                                    closeOnClick: true,
                                    buttons: [
                                        {
                                            text: error.response.data.text,
                                            closeOnClick: true,
                                            action: () => {
                                                Vue.prototype.$jwt.remove();
                                                router.push({name: 'registration'});
                                            },
                                            bold: false
                                        }
                                    ]
                                }
                            });
                            Vue.prototype.$snotify.warning(error.response.data.error)
                        }
                        Vue.prototype.$jwt.remove();
                        break;
                    case 404:
                        Vue.prototype.$snotify.error(error.response.data.error);
                        break;
                    case 422:
                        for (let err in error.response.data.errors) {
                            if (error.response.data.errors.hasOwnProperty(err)) {
                                Vue.prototype.$snotify.error(error.response.data.errors[err][0]);
                            }
                        }
                        break;
                    case 500:
                        Vue.prototype.$snotify.error(error.response.data.error);
                        break;
                }
            }
        }
    }
};

export default (Handler);
