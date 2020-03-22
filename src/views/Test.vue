<template>
    <b-row class="min-vh-100 d-flex align-items-center">
        <b-col cols="10" class="text-center mx-auto">
            <table>
                <tr v-for="(item, i) in displayed" :key="i">
                    <td>{{ i }}</td>
                </tr>
            </table>
        </b-col>
        <b-col cols="4" class="text-center mx-auto">
            <b-button @click="filterArray(2)" variant="success" size="md" type="button">Create</b-button>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        data() {

            return {
                items: [0,1,2,3,4,5,6,7]
            }
        },
        methods: {
            changeItem(items){
                const changed = [];
                items.forEach(item => {
                    changed.push(item + 3);
                });
                return changed;
            },
            filterArray(number){
                let array = this.items.filter(item => {
                    return item > number;
                });
                this.displayed = array;
            }
        },
        computed: {
            displayed: {
                get() {
                    return this.changeItem(this.items);
                },
                set(newValue) {
                    this.items = newValue;
                }
            }
        }
    }
</script>

<style scoped>

</style>
