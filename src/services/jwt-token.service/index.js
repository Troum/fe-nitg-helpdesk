const JWT = {
    install(Vue) {
        Vue.prototype.$jwt = {
            store: (token) => {
                localStorage.setItem('_token', token)
            },
            remove: () => {
                localStorage.removeItem('_token')
                if ('_isAdmin' in localStorage) {
                    localStorage.removeItem('_isAdmin')
                }
            },
            token: () => {
                return '_token' in localStorage;
            },
            bearer: () => {
                return localStorage.getItem('_token')
            },
            setIsAdmin() {
                localStorage.setItem('_isAdmin', 'true');
            },
            isAdmin(){
                return '_isAdmin' in localStorage;
            }
        }
    }

};

export default (JWT);
