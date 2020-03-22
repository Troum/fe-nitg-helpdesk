<template>
    <b-modal size="lg"
             :title="`${$ml.get('working.title')}${form.id}`"
             hide-footer id="working-modal">
        <template v-slot:modal-header-close>
            <b-button class="b4f_close-filters-button">
                <font-awesome-icon size="1x" :icon="['fas', 'times']"/>
            </b-button>
        </template>
        <b-card class="p-0 bg-transparent border-0">
            <b-card-body>
                <b-form @submit.prevent="submit">
                    <b-form-group class="my-2" :label="$ml.get('working.subject')">
                        <b-form-input class="b4f_input" v-model="form.subject"/>
                    </b-form-group>
                    <b-form-group :label="$ml.get('working.status.title')">
                        <b-dropdown id="responsiblePersons" :text="statusText" class="b4f_dropdown ticket">
                            <b-dropdown-item v-for="(status, i) in statuses"
                                             :key="i"
                                             @click="chooseStatus(status)">{{ status }}</b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('working.message')">
                        <b-textarea rows="4" class="b4f_input" v-model="form.message"></b-textarea>
                    </b-form-group>
                    <b-form-group class="my-2 text-center">
                        <b-button variant="danger" type="submit" class="b4f_button submit">{{$ml.get('working.submit')}}</b-button>
                    </b-form-group>
                    <b-form-group class="my-2">
                        <small><small>
                            <sup>*</sup>&nbsp;{{$ml.get('working.notice')}}</small>
                        </small>
                    </b-form-group>
                </b-form>
            </b-card-body>
        </b-card>
    </b-modal>
</template>

<script>
    import ml from "../ml";

    export default {
        data() {
          return {
              form: {
                  id: null,
                  subject: '',
                  message: '',
                  status: '',
                  client_email: ''
              },
              statuses: this.$ml.get('working.statuses'),
              statusText: this.$ml.get('working.status.dropdown')
          }
        },
        mounted() {
            this.$root.$on('show-working', (id, email) => {
                this.form.id = id;
                this.form.subject = `${this.$ml.get('working.defaultSubject')} ${id}`;
                this.form.client_email = email;
                this.$bvModal.show('working-modal')
            })
        },
        methods: {
            submit() {
                this.$store.commit('loading');
                this.$httpService.post(`api/v2/auth/ticket/${this.form.id}?_method=PUT`, this.$formData.fill(this.form),{
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`,
                        'Accept-Language': this.$ml.current
                    }
                })
                    .then(response => {
                        this.$root.$emit('reload', response.data.tickets);
                        this.$handler.success(response.data.success);
                        this.$formData.reset(this.form);
                        this.$bvModal.hide('working-modal');
                    })
                    .catch(error => {
                        this.$handler.error(error);
                    })
                    .finally(() => {
                        this.$store.commit('loading');
                    })
            },
            chooseStatus(status) {
                this.statusText = status;
                this.form.status = status;
            }
        }
    }
</script>

<style scoped>

</style>
