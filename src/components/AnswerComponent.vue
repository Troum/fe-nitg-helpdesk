<template>
    <b-modal size="lg"
             :title="$ml.get('answer.title')"
             hide-footer id="answer-modal">
        <template v-slot:modal-header-close>
            <b-button class="b4f_close-filters-button">
                <font-awesome-icon size="1x" :icon="['fas', 'times']"/>
            </b-button>
        </template>
        <b-card class="p-0 bg-transparent border-0">
            <b-card-body>
                <b-form @submit.prevent="submit">
                    <b-form-group class="my-2" :label="$ml.get('answer.subject')">
                        <b-form-input class="b4f_input" v-model="form.subject"/>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('answer.message')">
                        <b-textarea rows="4" class="b4f_input" v-model="form.message"></b-textarea>
                    </b-form-group>
                    <b-form-group class="my-2 text-center">
                        <b-button variant="danger" type="submit" class="b4f_button submit">{{ $ml.get('answer.submit') }}</b-button>
                    </b-form-group>
                </b-form>
            </b-card-body>
        </b-card>
    </b-modal>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    id: null,
                    subject: '',
                    message: ''
                }
            }
        },
        mounted() {
            this.$root.$on('open-answer', (id) => {
                this.form.id = id;
                this.$bvModal.show('answer-modal')
            })
        },
        methods: {
            submit() {
                this.$store.commit('loading');
                this.$httpService.post('api/v1/answer', this.$formData.fill(this.form),{
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`,
                        'Accept-Language': this.$ml.current
                    }
                })
                    .then(response => {
                        this.$root.$emit('reload-emails', response.data.emails);
                        this.$handler.success(response.data.success);
                        this.$bvModal.hide('answer-modal');
                    })
                    .catch(error => {
                        this.$handler.error(error);
                    })
                    .finally(() => {
                        this.$store.commit('loading');
                    })
            }
        }
    }
</script>

