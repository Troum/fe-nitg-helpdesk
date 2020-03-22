<template>
    <b-card
            :title="$ml.get('ticket.title')"
            :sub-title="$ml.get('ticket.subTitle')"
            style="min-width: 60%"
            class="mb-2"
    >
        <b-card-body class="p-0">
            <validation-observer v-click-outside="reset" ref="ticket" class="w-100" v-slot="{ passes }">
                <b-form @submit.prevent="passes(submit)">
                    <validation-provider :name="$ml.get('ticket.type')"
                                         rules="required"
                                         v-slot="{ errors }">
                        <b-form-group :label="$ml.get('ticket.type')">
                            <b-form-radio-group
                                    id="categories"
                                    v-model="form.category"
                                    :options="$ml.get('ticket.types')"
                                    name="radio-category"
                            ></b-form-radio-group>
                            <div class="b4f_feedback invalid">{{ errors[0] }}</div>
                        </b-form-group>
                    </validation-provider>
                    <validation-provider :name="$ml.get('ticket.priority')"
                                         rules="required"
                                         v-slot="{ errors }">
                        <b-form-group :label="$ml.get('ticket.priority')">
                            <b-form-radio-group
                                    id="priorities"
                                    v-model="form.priority"
                                    :options="$ml.get('ticket.priorities')"
                                    name="radio-priority"
                            ></b-form-radio-group>
                        </b-form-group>
                        <div class="b4f_feedback invalid">{{ errors[0] }}</div>
                    </validation-provider>
                    <b-form-group :label="$ml.get('ticket.responsible')">
                        <b-dropdown id="responsiblePersons" :text="responsible.text" class="b4f_dropdown ticket">
                            <b-dropdown-item v-for="(person, i) in responsible.persons"
                                             :key="i"
                                             @click="chooseResponsible(i)">{{ person.name }}</b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                    <validation-provider :name="$ml.get('ticket.subject')"
                                         rules="required"
                                         v-slot="{ errors }">
                        <b-form-group :label="$ml.get('ticket.subject')">
                            <b-form-input autocomplete="off"
                                          :class="[{'b4f_input' : true, 'invalid' : errors[0]}]"
                                          v-model="form.subject"
                                          type="text"
                                          id="subject">

                            </b-form-input>
                        </b-form-group>
                        <div class="b4f_feedback invalid">{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider :name="$ml.get('ticket.description')"
                                         rules="required"
                                         v-slot="{ errors }">
                        <b-form-group :label="$ml.get('ticket.description')">
                            <b-form-textarea
                                    rows="6"
                                    :class="[{'b4f_textarea' : true, 'invalid' : errors[0]}]"
                                    v-model="form.description"
                                    type="text"
                                    id="subject">

                            </b-form-textarea>
                        </b-form-group>
                        <div class="b4f_feedback invalid">{{ errors[0] }}</div>
                    </validation-provider>
                    <b-form-group>
                        <b-row>
                            <b-col cols="12" xl="6" class="text-center">
                                <b-button variant="outline-primary"
                                          @click="$formData.reset(form);responsible.text = ''"
                                          class="b4f_button link" type="button">{{ $ml.get('ticket.reset') }}</b-button>
                            </b-col>
                            <b-col cols="12" xl="6" class="text-center">
                                <b-button variant="outline-primary" class="b4f_button submit" type="submit">{{ $ml.get('ticket.submit') }}</b-button>
                            </b-col>
                        </b-row>
                    </b-form-group>
                </b-form>
            </validation-observer>
        </b-card-body>
    </b-card>
</template>

<script>
    import { ValidationProvider, ValidationObserver } from 'vee-validate';
    export default {
        components: {
            ValidationObserver,
            ValidationProvider
        },
        data() {
            return {
                form: {
                    category: null,
                    priority: null,
                    responsible: null,
                    subject: null,
                    description: null,
                    id: null
                },
                responsible: {
                    persons: [],
                    text: ''
                }
            }
        },
        beforeMount(){
            // this.$httpService.get('api/v1/auth/person')
            //     .then(response => {
            //         this.responsible.persons = [...response.data.persons];
            //     })
            //     .catch(error => {
            //         this.$handler.error(error);
            //     });
        },
        methods: {
            chooseResponsible(index) {
                this.form.responsible = this.responsible.persons[index].name;
                this.form.id = this.responsible.persons[index].id;
                this.responsible.text = this.responsible.persons[index].name
            },
            submit() {
                this.$store.commit('loading');
                this.$httpService.post('api/v1/auth/ticket', this.$formData.fill(this.form), {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`,
                        'Accept-Language': this.$ml.current
                    }
                })
                    .then(response => {
                        this.$handler.success(response.data.success, {
                            toast: {
                                timeout: 5000,
                                closeOnClick: true,
                                buttons: [
                                    {
                                        text: this.$ml.get('ticket.add'),
                                        bold: false
                                    },
                                    {
                                        text: this.$ml.get('ticket.logout'),
                                        closeOnClick: true,
                                        action: () => {
                                            this.$jwt.remove();
                                            this.$router.push('/');
                                        },
                                        bold: false
                                    }
                                ]
                            }
                        });
                        this.reset();
                        this.$formData.reset(this.form)
                    })
                    .catch(error => {
                        this.$handler.error(error);
                    })
                    .finally(() => {
                        this.$store.commit('loading');
                    })
            },
            reset() {
                this.$refs.ticket.reset();
            }
        }
    }
</script>

