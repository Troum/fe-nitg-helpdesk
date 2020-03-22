<template>
    <b-container fluid class="m-0 p-0" id="app">
        <b-button-group :style="['position: absolute; z-index: 2', $route.name === 'table' || $route.name === 'inbox' ? 'top: 3%; left: 4%;' : 'bottom: 4%; right: 4%;']">
            <b-button type="button"
                      :class="['b4f_button link border-right', $route.name === 'ticket' || $route.name === 'admin' || $route.name === 'table' || $route.name === 'inbox' ? 'text-white' : '']"
                      @click="$ml.change('en');changeLocale()"
                      variant="outline-primary">EN</b-button>
            <b-button type="button"
                      :class="['b4f_button link border-left', $route.name === 'ticket' || $route.name === 'admin' || $route.name === 'table' || $route.name === 'inbox' ? 'text-white' : '']"
                      @click="$ml.change('de');changeLocale()"
                      variant="outline-primary">DE</b-button>
        </b-button-group>
        <div class="b4f_buttons-container">
            <div>
<!--                <b-button variant="outline-primary"-->
<!--                          @click="$route.name === 'inbox' ? $router.push({name: 'ticket'}) : $router.push({name: 'inbox'})"-->
<!--                          type="button" v-if="$store.getters.authenticate || $jwt.token() && !$jwt.isAdmin()" :class="[$route.name === 'inbox' ? 'b4f_inbox-button' : 'b4f_inbox-button inbox']">-->
<!--                    <font-awesome-icon :icon="['fas', 'envelope']" v-if="$route.name !== 'inbox'"/>-->
<!--                    <font-awesome-icon :icon="['fas', 'chevron-left']" v-if="$route.name == 'inbox'"/>-->
<!--                    <span>&nbsp;&nbsp;{{ $route.name === 'inbox' ? $ml.get('navButtons.back') : $ml.get('navButtons.inbox') }}</span>-->
<!--                </b-button>-->
                <b-button variant="outline-primary"
                          @click="$router.push({name: 'table'})"
                          type="button" v-if="$store.getters.authenticate || $jwt.token() && $jwt.isAdmin() && $route.name === 'ticket' " class="b4f_back-button">
                    <font-awesome-icon :icon="['fas', 'chevron-left']"/>
                    <span>&nbsp;&nbsp;{{ $ml.get('navButtons.table')}}</span>
                </b-button>
                <b-button variant="outline-primary"
                          @click="logout"
                          type="button" v-if="$store.getters.authenticate || $jwt.token()" class="b4f_logout-button">
                    <font-awesome-icon :icon="['fas', 'power-off']"/>
                    <span>&nbsp;&nbsp;{{ $ml.get('navButtons.logout') }}</span>
                </b-button>
            </div>
        </div>
        <transition name="slide-fade" mode="out-in">
            <router-view/>
        </transition>
        <vue-snotify></vue-snotify>
        <answer-component/>
        <loading
                overlay-class="b4f_loading-overlay"
                loader-class="b4f_loading-wrapper"
                :label="$ml.get('loading')"
                :show="$store.getters.loading">
            <template v-slot:loading-spinner>
                <div class="b4f_spinner">
                    <div class="b4f_cube1"></div>
                    <div class="b4f_cube2"></div>
                </div>
            </template>
        </loading>
    </b-container>
</template>

<script>
    import AnswerComponent from "./components/AnswerComponent";
    import loading from 'vue-full-loading';
    import { localize } from 'vee-validate';
    export default {
        components: {
          AnswerComponent,
          loading
        },
        methods: {
            logout() {
                if (this.$jwt.isAdmin()) {
                    this.$router.push({name: 'admin'});
                } else {
                    this.$router.push({name: 'registration'});
                }
                this.$store.commit('logout');
            },
            changeLocale(){
                import(`vee-validate/dist/locale/${this.$ml.current}`).then(locale => {
                    localize(this.$ml.current, locale);
                })
            }
        }
    }
</script>
