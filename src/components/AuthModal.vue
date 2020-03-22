<template>
    <b-modal size="lg"
             :title="$ml.get('answer.auth_error')"
             hide-footer id="auth-modal">
        <template v-slot:modal-header-close>
            <b-button class="b4f_close-filters-button">
                <font-awesome-icon size="1x" :icon="['fas', 'times']"/>
            </b-button>
        </template>
        <b-card class="p-0 bg-transparent border-0">
            <b-card-body>
                <b-row>
                    <b-col cols="12">
                        <p>{{ $ml.get('auth_message') }}</p>
                    </b-col>
                    <b-col cols="12" class="text-center">
                        <b-button type="button" @click="$router.push({name: route}); $jwt.remove()" class="b4f_button link">
                            {{ $ml.get('navButtons.login') }}
                        </b-button>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </b-modal>
</template>

<script>
    export default {
        data() {
          return {
              route: null
          }
        },
        mounted() {
            this.$root.$on('re-auth', (route) => {
                this.route = route;
            })
        }
    }
</script>

<style scoped>

</style>
