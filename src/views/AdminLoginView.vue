<template>
    <b-row class="b4f_login-container">
        <b-col cols="12" xl="6" class="b4f_admin-login-container__left" order-xl="1">
            <div class="b4f_blur-filter"></div>
            <img class="b4f_logo" src="../assets/logowhite.png" alt="B4F City">
        </b-col>
        <b-col cols="12" xl="6" class="b4f_login-container__right" order-xl="0">
            <validation-observer ref="login" v-click-outside="reset" class="w-75" v-slot="{ passes }">
                <b-form @submit.prevent="passes(submit)">
                    <b-form-group>
                        <div class="b4f_login-title">
                            <h1>{{ $ml.get('admin.title') }}</h1>
                        </div>
                    </b-form-group>
                    <validation-provider :name="$ml.get('admin.login')" rules="required" v-slot="{ errors }">
                        <b-form-group
                                :label="$ml.get('admin.login')"
                                id="email_container">
                            <b-form-input
                                    autocomplete="off"
                                    :class="[{'b4f_input' : true, 'invalid' : errors[0]}]"
                                    v-model="form.email"
                                    type="email"
                                    id="email"></b-form-input>
                        </b-form-group>
                        <div class="b4f_feedback invalid">{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider :name="$ml.get('admin.password')" rules="required|min:6" v-slot="{ errors }">
                        <b-form-group
                                :label="$ml.get('admin.password')"
                                id="password_container">
                            <b-form-input
                                    autocomplete="off"
                                    :class="[{'b4f_input' : true, 'invalid' : errors[0]}]"
                                    v-model="form.password"
                                    type="password"
                                    id="password"></b-form-input>
                        </b-form-group>
                        <div class="b4f_feedback invalid">{{ errors[0] }}</div>
                    </validation-provider>
                    <b-form-group>
                        <b-row>
                            <b-col cols="12" class="text-center">
                                <b-button variant="outline-primary" class="b4f_button submit" type="submit">{{$ml.get('admin.proceedLogin')}}</b-button>
                            </b-col>
                        </b-row>
                    </b-form-group>
                </b-form>
            </validation-observer>
        </b-col>
    </b-row>
</template>

<script>
    import { ValidationProvider, ValidationObserver } from 'vee-validate';
    export default {
        components: {
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
                form: {
                    password: null,
                    email:  null
                }
            }
        },
        methods: {
            reset() {
                this.$refs.login.reset();
            },
            submit() {
                this.$httpService
                    .post('api/v2/auth/login', this.$formData.fill(this.form),{
                        headers: {
                            'Accept-Language': this.$ml.current
                        }
                    })
                    .then((response) => {
                        this.$store.commit('authenticate', response.headers['authorization']);
                        this.$handler.success(response.data.success);
                        this.$jwt.setIsAdmin();
                        this.$router.push({name: 'table'});
                    })
                    .catch((error) => {
                        this.$handler.error(error);
                    })
            }
        }
    }

</script>

