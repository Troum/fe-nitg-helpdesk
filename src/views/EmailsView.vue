<template>
    <b-row class="b4f_inbox-container">
        <b-col cols="12" class="b4f_tickets-table-header">
            <img src="../assets/logowhite.png" alt="B4F" class="b4f_logo">
        </b-col>
        <b-col cols="11" class="mx-auto my-3">
            <b-card class="border-0 shadow my-2">
                <b-col cols="12" class="mx-auto">
                    <b-table-simple
                            borderless>
                        <b-thead>
                            <tr>
                                <th v-column-sortable:ticket_id>{{ $ml.get('emails.table.id') }}&nbsp;&nbsp;</th>
                                <th v-column-sortable:email>{{ $ml.get('emails.table.email') }}&nbsp;&nbsp;</th>
                                <th>{{ $ml.get('emails.table.messages') }}&nbsp;&nbsp;</th>
                            </tr>
                        </b-thead>
                        <b-tbody>
                            <template v-for="(item, i) in displayed">
                                <tr class="b4f_detailed-card-container">
                                    <td data-ticket colspan="9">
                                        <b-row :ref="`collapse_${i}`" class="b4f_detailed-card bg-white">
                                            <b-col cols="12">
                                                <b-row class="m-0 p-0">
                                                    <b-col v-for="(item, k) in item.messages"
                                                           class="b4f_ticket-email-container"
                                                           :key="k"
                                                           cols="12">
                                                        <b-row class="m-0 p-0 w-100">
                                                            <b-col cols="6" class="text-left">
                                                                <p class="b4f_email-person h6">{{ item.subject }}</p>
                                                            </b-col>
                                                            <b-col cols="6" class="text-right">
                                                                <p class="b4f_email-person h6">{{ item.date | formatDate }}</p>
                                                            </b-col>
                                                            <b-col cols="6" class="text-left">
                                                                <p class="b4f_email-person h6">{{ item.from }}</p>
                                                            </b-col>
                                                            <b-col cols="12">
                                                                <p class="b4f_email-message h6">{{ item.message }}</p>
                                                            </b-col>
                                                        </b-row>
                                                    </b-col>
                                                </b-row>
                                            </b-col>
                                        </b-row>
                                    </td>
                                </tr>
                                <tr class="b4f_ticket-row" :key="item.ticket_id">
                                    <td>{{item.ticket_id}}</td>
                                    <td>{{item.email}}</td>
                                    <td>
                                        <b-row class="d-flex align-items-center m-0 p-0">
                                            <b-col cols="4" class="mx-auto text-center">
                                                <b-button
                                                        :ref="`collapse-button_${i}`"
                                                        v-b-toggle="`collapse_${i}`"
                                                        variant="outline-primary"
                                                        @click="rotate(i)"
                                                        class="b4f_tickets-table__show-details-button">
                                                        <font-awesome-icon :ref="`fai_${i}`" :icon="['fas', 'chevron-down']" size="sm"/>
                                                </b-button>
                                            </b-col>
                                            <b-col cols="5" class="mx-auto text-center">
                                                <b-button
                                                        variant="outline-primary"
                                                        @click="answer(item.ticket_id)"
                                                        class="b4f_emails-answer_button">
                                                    {{ $ml.get('emails.table.button') }}
                                                </b-button>
                                            </b-col>
                                        </b-row>
                                    </td>
                                </tr>
                            </template>
                        </b-tbody>
                    </b-table-simple>
                    <b-pagination
                            align="center"
                            v-model="pagination.current"
                            :total-rows="items.length"
                            :per-page="pagination.perPage"
                            limit="1"
                    >
                        <template v-slot:page>{{ pagination.current }} / {{ Math.ceil(items.length / pagination.perPage) }}</template>
                    </b-pagination>
                    <b-row>
                        <b-col cols="1" class="mr-auto">
                            <small><strong>{{ $ml.get('emails.table.total') }}:</strong>&nbsp;{{ items.length }}</small>
                        </b-col>
                        <b-col cols="1"
                               class="ml-auto d-flex justify-content-end">
                            <b-dropdown size="sm" :text="`${pagination.perPage}`" class="b4f_dropdown small">
                                <b-dropdown-item @click="changePerPage(3)"><small>3</small></b-dropdown-item>
                                <b-dropdown-item @click="changePerPage(5)"><small>5</small></b-dropdown-item>
                                <b-dropdown-item @click="changePerPage(10)"><small>10</small></b-dropdown-item>
                                <b-dropdown-item @click="changePerPage(25)"><small>25</small></b-dropdown-item>
                                <b-dropdown-item @click="changePerPage(50)"><small>50</small></b-dropdown-item>
                            </b-dropdown>
                        </b-col>
                    </b-row>
                </b-col>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        data() {
            return {
                height: '10px',
                pagination: {
                    perPage: 5,
                    current: 1,
                    paginated: [],
                    pages: 0
                },
                items: []
            }
        },
        beforeMount() {
            this.$store.commit('loading');
            this.$httpService.get('api/v1/auth/emails', {
                headers: {
                    Authorization: `Bearer ${this.$jwt.bearer()}`
                }
            })
                .then(response => {
                    this.items = [...response.data.emails];
                })
                .catch(error => {
                    this.$handler.error(error);
                })
                .finally(() => {
                    this.$store.commit('loading');
                })
        },
        mounted(){
            this.$root.$on('reload-emails', (response) => {
                this.rebuild(response);
            });
        },
        methods: {
            answer(index) {
                this.$root.$emit('open-answer', index);
            },
            paginatePages(pages) {
                for (let i = 0; i < pages.length; i = i + this.pagination.perPage) {
                    this.pagination.paginated[this.pagination.pages] = pages.slice(
                        i,
                        i + this.pagination.perPage
                    );
                    this.pagination.pages++;
                }
                return this.pagination.paginated[this.pagination.current - 1];
            },
            rotate(index) {
                if (this.$refs[`collapse_${index}`][0].style.maxHeight){
                    this.$refs[`collapse_${index}`][0].style.maxHeight = null;
                    this.$refs[`collapse_${index}`][0].style.borderLeftColor = "#d3d3d3";
                } else {
                    this.$refs[`collapse_${index}`][0].style.maxHeight = this.$refs[`collapse_${index}`][0].scrollHeight + "px";
                    this.$refs[`collapse_${index}`][0].style.borderLeftColor = "#233247";
                }
                if(this.$refs[`collapse-button_${index}`][0].classList.contains('active')) {
                    this.$refs[`collapse-button_${index}`][0].classList.remove('active');
                    this.$refs[`fai_${index}`][0].classList.remove('rotate')
                } else {
                    this.$refs[`collapse-button_${index}`][0].classList.add('active');
                    this.$refs[`fai_${index}`][0].classList.add('rotate');
                }
            },
            orderBy(sort) {
                this.paginatePages(this.items).sort(sort);
            },
            changePerPage(number){
                this.pagination = {
                    perPage: number,
                    current: 1,
                    paginated: [],
                    pages: 0
                };
                this.paginatePages(this.items)
            },
            rebuild(filtered){
                this.pagination = {
                    perPage: 5,
                    current: 1,
                    paginated: [],
                    pages: 0
                };
                this.displayed = filtered;
            }
        },
        computed: {
            displayed: {
                get() {
                    return this.paginatePages(this.items)
                },
                set(items) {
                    this.items = items;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .b4f_tickets-table-header {
        height: 15rem;
        & .b4f_logo {
            max-width: 60%;
        }
    }
    .b4f_email-person {
        margin-top: 5%;
    }
    .b4f_tickets-table__show-details-button {
        height: 38px;
        margin: auto;
        & i {
            margin: auto;
            &:before {
                width: 22px;
                margin-top: 2px;
                height: 38px;
            }

        }
    }
</style>
