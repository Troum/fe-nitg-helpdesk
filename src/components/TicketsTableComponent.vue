<template>
    <b-col cols="12" xl="10" class="mx-auto p-0">
        <b-row class="m-0 p-0">
            <b-col cols="12" xl="5" offset-xl="7" class="p-0">
                <b-row class="m-0 p-0">
                    <b-col cols="4" xl="6">
                        <b-button variant="danger"
                                  class="b4f_button link float-right"
                                  @click="$bvModal.show('filterModal'); $root.$emit('filter-modal', items)">{{ $ml.get('table.buttons.filter') }}</b-button>
                    </b-col>
                    <b-col cols="8" xl="6">
                        <b-button variant="danger"
                                  class="b4f_button submit float-right"
                                  @click="$router.push({name: 'ticket'})">{{ $ml.get('table.buttons.newTicket') }}&nbsp;<font-awesome-icon :icon="['fas', 'plus']" /></b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-table-simple
                class="p-xl-1"
                responsive
                borderless>
            <b-thead>
                <tr>
                    <th v-column-sortable:date>{{ $ml.get('table.headers.date') }}&nbsp;&nbsp;</th>
                    <th v-column-sortable:client>{{ $ml.get('table.headers.client') }}&nbsp;&nbsp;</th>
                    <th v-column-sortable:responsible>{{ $ml.get('table.headers.responsible') }}&nbsp;&nbsp;</th>
                    <th v-column-sortable:id>{{ $ml.get('table.headers.id') }}&nbsp;&nbsp;</th>
                    <th v-column-sortable:category>{{ $ml.get('table.headers.type') }}&nbsp;&nbsp;</th>
                    <th v-column-sortable:time>{{ $ml.get('table.headers.time') }}&nbsp;&nbsp;</th>
                    <th v-column-sortable:status>{{ $ml.get('table.headers.status') }}&nbsp;&nbsp;</th>
                    <th v-column-sortable:bill>{{ $ml.get('table.headers.bill') }}&nbsp;&nbsp;</th>
                    <th></th>
                </tr>
            </b-thead>
            <b-tbody>
                <template v-for="(item, i) in displayed">
                    <tr class="b4f_detailed-card-container">
                        <td data-ticket colspan="9">
                            <b-row :ref="`collapse_${i}`" class="b4f_detailed-card bg-white">
                                <b-col cols="12" xl="7">
                                    <p class="h5 b4f_email-task">{{ item.subject }}</p>
                                    <p>{{ item.description }}</p>
                                </b-col>
                                <b-col cols="12" xl="5">
                                    <b-row class="m-0 p-0">
                                        <b-col v-for="(item, k) in item.emails"
                                               class="b4f_ticket-email-container"
                                               :key="k"
                                               cols="12">
                                            <b-row class="m-0 p-0 w-100">
                                                <b-col cols="6" class="text-left">
                                                    <p class="b4f_email-person h6">{{ item.from }}</p>
                                                </b-col>
                                                <b-col cols="6" class="text-right">
                                                    <p class="b4f_email-person h6">{{ item.date | formatDate }}</p>
                                                </b-col>
                                                <b-col cols="12">
                                                    <p class="b4f_email-message h6">{{ item.message }}</p>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="4" class="mx-auto mt-5">
                                            <b-button
                                                    @click="$root.$emit('show-working', item.id, item.client_email)"
                                                    variant="danger"
                                                    class="b4f_button submit">{{ item.emails.length === 0 ? $ml.get('table.start') : $ml.get('table.continue') }}</b-button>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </td>
                    </tr>
                    <tr class="b4f_ticket-row" :key="item.id">
                        <td>{{item.created_at | formatDate($ml.current) }}</td>
                        <td>{{item.client}}</td>
                        <td>{{item.responsible}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.category}}</td>
                        <td>{{item.time}}</td>
                        <td>{{item.status}}</td>
                        <td>{{item.bill}}</td>
                        <td>
                            <b-button
                                    :ref="`collapse-button_${i}`"
                                    v-b-toggle="`collapse_${i}`"
                                    variant="outline-primary"
                                    @click="rotate(i)"
                                    class="b4f_tickets-table__show-details-button">
                                <font-awesome-icon :ref="`fai_${i}`" size="sm" :icon="['fas', 'chevron-down']"/>
                            </b-button>
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
        <b-row class="m-0 p-0">
            <b-col cols="3" xl="1" class="mr-auto">
                <small><strong>{{$ml.get('table.total')}}:</strong>&nbsp;{{ items.length }}</small>
            </b-col>
            <b-col cols="3" xl="1"
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
</template>

<script>
    export default {
        data() {
            return {
                height: '20px',
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
            this.$httpService.get('api/v2/auth/ticket', {
                headers: {
                    Authorization: `Bearer ${this.$jwt.bearer()}`,
                }
            })
                .then(response => {
                    this.items = [...response.data.tickets];
                })
                .catch(error => {
                    this.$handler.error(error);
                })
                .finally(() => {
                    this.$store.commit('loading')
                })
        },
        mounted() {
            this.$root.$on('filter', (filtered) => {
                this.rebuild(filtered);
            });
            this.$root.$on('reload', (response) => {
                this.rebuild(response);
            });
        },
        methods: {
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
            rebuild(filtered){
                this.pagination = {
                    perPage: 5,
                    current: 1,
                    paginated: [],
                    pages: 0
                };
                this.displayed = filtered;
            },
            changePerPage(number){
                this.pagination = {
                    perPage: number,
                    current: 1,
                    paginated: [],
                    pages: 0
                };
                this.paginatePages(this.items)
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

