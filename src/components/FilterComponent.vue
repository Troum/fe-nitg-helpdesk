<template>
    <b-modal id="filterModal"
             :title="$ml.get('filter.header')"
             size="lg"
             style="z-index: 9999"
             hide-backdrop>
        <template v-slot:modal-header-close>
            <b-button class="b4f_close-filters-button">
                <font-awesome-icon size="1x" :icon="['fas', 'times']"/>
            </b-button>
        </template>
        <b-card class="p-0 bg-transparent border-0">
            <b-card-body>
                <b-form ref="filterForm">
                    <b-form-group>
                        <b-row>
                            <b-col cols="12" xl="6">
                                <b-row>
                                    <b-col cols="12">
                                        {{ $ml.get('filter.dateFrom') }}
                                    </b-col>
                                    <b-col cols="12">
                                        <datepicker :format="'DD.MM.YYYY'"
                                                    @input="filterDateFrom(items)"
                                                    v-model="dateFrom" class="float-left" :lang="lang[`${$ml.current}`]"/>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col cols="12" xl="6">
                                <b-row>
                                    <b-col cols="12">
                                        {{ $ml.get('filter.dateTo') }}
                                    </b-col>
                                    <b-col cols="12">
                                        <datepicker :format="'DD.MM.YYYY'"
                                                    @input="filterDateTo(items)"
                                                    v-model="dateTo" class="float-left" :lang="lang[`${$ml.current}`]"/>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('filter.type.title')">
                        <b-dropdown :text="dropdown.labels.category" class="b4f_dropdown filter">
                            <b-dropdown-item v-for="(type, i) in dropdown.types"
                                             :key="i"
                                             @click="choose(type, 'category'); filterCategory(items, type)">{{ type }}</b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('filter.responsible.title')">
                        <b-dropdown :text="dropdown.labels.responsible" class="b4f_dropdown filter">
                            <b-dropdown-item v-for="(person, i) in dropdown.persons"
                                             :key="i"
                                             @click="choose(person.name, 'responsible'); filterResponsible(items, person.name)">{{ person.name }}</b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('filter.time')">
                        <b-form-input class="b4f_input" v-model="time" @input="filterTime(items, time)"></b-form-input>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('filter.client.title')">
                        <b-dropdown :text="dropdown.labels.client" class="b4f_dropdown filter">
                            <b-dropdown-item v-for="(client, i) in dropdown.clients"
                                             :key="i"
                                             @click="choose(client.name, 'client'); filterClient(items, client.name)">{{ client.name }}</b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('filter.status')">
                        <b-form-input class="b4f_input" v-model="status"></b-form-input>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('filter.id')">
                        <b-form-input class="b4f_input" v-model="id"></b-form-input>
                    </b-form-group>
                    <b-form-group class="my-2" :label="$ml.get('filter.bill')">
                        <b-form-input class="b4f_input" v-model="bill"></b-form-input>
                    </b-form-group>
                </b-form>
            </b-card-body>
        </b-card>
        <template v-slot:modal-footer>
            <b-row class="w-100">
                <b-col cols="12" xl="6" class="text-center">
                    <b-button variant="outline-primary"
                              @click="removeAllFilters"
                              class="b4f_button link" type="button">{{ $ml.get('filter.buttons.reset') }}</b-button>
                </b-col>
                <b-col cols="12" xl="6" class="text-center">
                    <b-button @click="submit" variant="outline-primary" class="b4f_button submit" type="button">{{ $ml.get('filter.buttons.submit') }}</b-button>
                </b-col>
            </b-row>
        </template>
    </b-modal>
</template>

<script>
    import Datepicker from 'vue2-datepicker';
    import languages from 'vue2-datepicker/src/locale/languages';
    export default {
        components: {
            Datepicker
        },
        data() {
            return {
                items: [],
                lang: languages,
                dropdown: {
                    labels: {
                        category: this.$ml.get('filter.type.choose'),
                        responsible: this.$ml.get('filter.responsible.dropdown'),
                        client: this.$ml.get('filter.client.dropdown')
                    },
                    types: this.$ml.get('filter.type.dropdown'),
                    persons: [],
                    clients: []
                },
                category: '',
                client: '',
                dateFrom: '',
                dateTo: '',
                id: '',
                responsible: '',
                status: '',
                time: '',
                bill: ''
            }
        },
        beforeMount() {
            this.persons();
            this.clients();
        },
        mounted() {
            this.$root.$on('filter-modal', (items) => {
                this.items = [...items];
                this.$store.commit('items', items);
            })
        },
        methods: {
            submit() {
                this.$root.$emit('filter', this.items);
            },
            choose(text, key) {
                this.dropdown.labels.hasOwnProperty(key) ?
                    this.dropdown.labels[key] = text : null;
            },
            filterClient(items, value) {
                return this.items =
                    items.filter(item => {
                        return item.client === value;
                    });

            },
            filterResponsible(items, value) {
                return this.items =
                    items.filter(item => {
                        return item.responsible === value;
                    });
            },
            filterDateFrom(items) {
                return this.items = items.filter(item => {
                    return Date.parse(item.created_at) >= Date.parse(this.dateFrom);
                })
            },
            filterDateTo(items) {
                return this.items = items.filter(item => {
                    return Date.parse(item.created_at) <= Date.parse(this.dateTo);
                })
            },
            filterCategory(items, value) {
                return this.items =
                    items.filter(item => {
                        return item.category === value;
                    });
            },
            filterTime(items, value) {
                return this.items =
                    items.filter(item => {
                        return item.time.includes(value);
                    });
            },
            removeAllFilters() {
                this.items = this.$store.getters.items;
                this.resetFields();
                this.$root.$emit('filter', this.items);
            },
            resetFields() {
                this.category = '';
                this.client = '';
                this.dateFrom = '';
                this.dateTo = '';
                this.id = '';
                this.responsible = '';
                this.status = '';
                this.time = '';
                this.bill = '';
                this.dropdown = {
                    labels: {
                        category: this.$ml.get('filter.type.choose'),
                        responsible: this.$ml.get('filter.responsible.dropdown'),
                        client: this.$ml.get('filter.client.dropdown')
                    },
                    types: ['Support', 'Anfrage', 'Bestellung'],
                    persons: [],
                    clients: []
                };
                this.persons();
                this.clients();
            },
            clients() {
                this.$httpService.get('api/v2/auth/client', {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`
                    }
                })
                    .then(response => {
                        this.dropdown.clients = [...response.data.clients];
                    })
                    .catch(error => {
                        this.$handler.error(error);
                    });
            },
            persons() {
                this.$httpService.get('api/v2/auth/person', {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`
                    }
                })
                    .then(response => {
                        this.dropdown.persons = [...response.data.persons];
                    })
                    .catch(error => {
                        this.$handler.error(error);
                    })
            }
        }
    }
</script>

