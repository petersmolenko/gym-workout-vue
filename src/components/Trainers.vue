<template>
    <v-container class="fill-height flex-column d-flex align-stretch">
        <ApolloQuery
            :query="require('../graphql/Trainers.gql')"
            slot="result"
            class="flex-grow-1"
        >
            <template v-slot="{result}" class="fill-height">
                <apollo-query-presenter :result="result">
                    <template
                        v-slot="{data}"
                    >
                        <v-row dense>
                            <v-col
                                v-for="(item, i) in data.trainers"
                                :key="i"
                                cols=12
                            >
                                <v-card
                                >
                                    <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                            <v-card-title
                                                class="text-h5"
                                                v-text="item.title"
                                            ></v-card-title>

                                            <v-card-text>{{item.description}}}</v-card-text>
                                        </div>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </apollo-query-presenter>
            </template>
        </ApolloQuery>
    </v-container>
</template>

<script>

import ApolloQueryPresenter from "@/components/controls/ApolloQueryPresenter";

export default {
    name: 'Trainers',
    title: 'Тренажеры',
    components: {
        ApolloQueryPresenter
    },
    data() {
        return {
            header: 'Тренажеры',
            newMessage: '',
        }
    },

    computed: {},

    methods: {},
}
</script>

<style scoped>

</style>
