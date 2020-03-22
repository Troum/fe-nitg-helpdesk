const FD = {
    install(Vue) {
        Vue.prototype.$formData = {
            fill: (data) => {
                const fd = new FormData();
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        fd.append(key, data[key])
                    }
                }

                return fd;
            },
            reset: (data) => {
                for(let key in data) {
                    if(data.hasOwnProperty(key)) {
                        data[key] = null
                    }
                }
                return data;
            }
        }
    }
};

export default FD;
