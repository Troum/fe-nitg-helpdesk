<template>
  <b-row class="b4f_login-container">
    <b-col cols="12" xl="6" class="b4f_login-container__left">
      <div class="b4f_blur-filter"></div>
      <img class="b4f_logo" src="../assets/logowhite.png" alt="NorthITGroup HS">
    </b-col>
    <b-col cols="12" xl="6" class="b4f_login-container__right">
      <validation-observer ref="login" v-click-outside="reset" class="w-100 w-xl-75" v-slot="{ passes }">
        <b-form @submit.prevent="passes(submit)">
          <b-form-group>
            <div class="b4f_login-title">
              <h1>{{$ml.get('title')}}</h1>
            </div>
            <div class="b4f_login-subtitle">
              <h6>{{ $ml.get('subTitle') }}</h6>
            </div>
          </b-form-group>
          <validation-provider :name="$ml.get('login')" rules="required" v-slot="{ errors }">
            <b-form-group
                    :label="$ml.get('login')"
                    id="email_container">
              <b-form-input
                      autocomplete="off"
                      :class="[{'b4f_input' : true, 'invalid' : errors[0]}]"
                      v-model="form.login"
                      type="text"
                      id="email"></b-form-input>
            </b-form-group>
            <div class="b4f_feedback invalid">{{ errors[0] }}</div>
          </validation-provider>
          <validation-provider :name="$ml.get('password')" rules="required|min:6" v-slot="{ errors }">
            <b-form-group
                    :label="$ml.get('password')"
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
              <b-col cols="12" xl="6" class="text-center">
                <b-button variant="outline-primary" class="b4f_button link" type="button">{{ $ml.get('requestLogin') }}</b-button>
              </b-col>
              <b-col cols="12" xl="6" class="text-center">
                <b-button variant="outline-primary" class="b4f_button submit" type="submit">{{ $ml.get('proceedLogin') }}</b-button>
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
          login:  null
        }
      }
    },
    methods: {
      reset() {
        this.$refs.login.reset();
      },
      submit() {
        this.$httpService.post('api/login', this.$formData.fill(this.form),{
          headers: {
            'Accept-Language': this.$ml.current
          }
        })
                .then((response) => {
                  this.$store.commit('authenticate', response.headers['authorization']);
                  this.$handler.success(`${response.data.success}, ${response.data.user.name}`, null);
                  this.$router.push({name: 'ticket'});
                })
                .catch(error => {
                  this.$handler.error(error);
                })
      }
    }
  }

</script>

