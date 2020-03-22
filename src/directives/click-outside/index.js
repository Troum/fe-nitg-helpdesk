import Vue from 'vue';

const ClickOutside = Vue.directive('click-outside', {
    priority: 700,
    bind: (el, binding) =>  {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
                binding.value(e)
            }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener('click', handler)
    },
    unbind: (el) => {
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null
    }

});

export default ClickOutside;
