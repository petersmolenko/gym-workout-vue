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
                                    <div class="d-flex justify-space-between">
                                        <v-img
                                            aspect-ratio="1.5"
                                            max-width="300"
                                            min-width="300"
                                            contain
                                            width="300"
                                            :src="getTrainerImage(item.cover)"
                                        ></v-img>
                                        <div class="flex-grow-1">
                                            <v-card-title
                                                class="text-h5"
                                                v-text="item.title"
                                            ></v-card-title>

                                            <v-card-text>{{item.description}}</v-card-text>
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
import {clearUrl, defaultTrainerImage, getMediaPath, getStaticPath} from "@/server/server";

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

    methods: {
        getTrainerImage: (url) => {
            if (url) return getMediaPath(clearUrl(url));

            return getStaticPath(defaultTrainerImage)
        }
    },
}
</script>

<style scoped>

</style>
