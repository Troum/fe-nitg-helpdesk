<template>
  <b-row class="b4f_tickets-table-view">
    <b-col cols="12" class="b4f_tickets-table-header">
      <img src="../assets/logowhite.png" alt="B4F" class="b4f_logo">
    </b-col>
    <b-col cols="12" class="b4f_tickets-table-container">
      <b-row class="m-0 p-0 w-100">
        <tickets-table-component/>
      </b-row>
    </b-col>
    <filter-component/>
    <working-component/>
  </b-row>
</template>

<script>
  import TicketsTableComponent from "../components/TicketsTableComponent";
  import FilterComponent from "../components/FilterComponent";
  import WorkingComponent from "../components/WorkingComponent";


  export default {
    components: {
      FilterComponent,
      TicketsTableComponent,
      WorkingComponent
    },
    data() {
        return {
            channel: this.$pusher.subscribe('event-added')
        }
    },
    mounted() {
        this.channel.bind('added-event', (response) => {
            this.$handler.success(response.message, {});
        })
    }
  }
</script>
