<template>
    <v-container class="fill-height flex-column d-flex align-stretch">
        <ApolloQuery
            :query="require('../graphql/queries/Workouts.gql')"
            slot="result"
            class="flex-grow-1"
        >
            <template v-slot="{result}" class="fill-height">
                <apollo-query-presenter :result="result">
                    <template
                        v-slot="{data}"
                    >
                        <v-row dense class="mb-5">
                            <v-dialog
                                v-model="dialog"
                                persistent
                                max-width="1000px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        class="orange black--text"
                                        elevation="2"
                                    >
                                        Добавить тренировку
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">Создать тренировку</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                    cols="12"
                                                >
                                                    <v-text-field
                                                        label="Название*"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                >
                                                    <v-textarea
                                                        label="Краткое описание"
                                                        text
                                                    ></v-textarea>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    class="d-flex justify-space-between text-h6"
                                                >
                                                    <div>
                                                        Этапы
                                                    </div>
                                                    <div>
                                                        <v-btn
                                                            v-on:click="onShowPartClick"
                                                            color="orange"
                                                            class="control black--text"
                                                            fab
                                                            dark
                                                            small
                                                        >
                                                            <v-icon v-if="!showWorkPartForm">mdi-plus</v-icon>
                                                            <v-icon v-else>mdi-close-thick</v-icon>
                                                        </v-btn>
                                                    </div>
                                                </v-col>
                                                <v-col v-if="showWorkPartForm">
                                                    <template>
                                                        <ApolloMutation
                                                            :mutation="require('../graphql/mutations/AddWorkPart.gql')"
                                                            :variables="{
                                                                title: wpTitle,
                                                                description: wpDescription,
                                                                exercise: wpExercise.abbr,
                                                                weight: wpWeight,
                                                                repetitionsNumber: wpRepetitionsNumber,
                                                                sortOrder: wpSortOrder,
                                                            }"
                                                            @done="onDone"
                                                        >
                                                            <template v-slot="{ mutate, loading, error }">
                                                                <v-row>
                                                                    <v-col
                                                                        cols="12"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="wpTitle"
                                                                            label="Название*"
                                                                            required
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col
                                                                        cols="12"
                                                                    >
                                                                        <v-textarea
                                                                            v-model="wpDescription"
                                                                            label="Описание*"
                                                                            text
                                                                            required
                                                                        ></v-textarea>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col cols="12">
                                                                        <v-select
                                                                            v-model="wpExercise"
                                                                            :items="exercisesList"
                                                                            item-text="state"
                                                                            item-value="abbr"
                                                                            label="Упражнение"
                                                                            :disabled="!exercisesList.length"
                                                                            persistent-hint
                                                                            return-object
                                                                            single-line
                                                                        ></v-select>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-row>
                                                                    <v-col
                                                                        cols="6"
                                                                    >
                                                                        <v-text-field
                                                                            type="number"
                                                                            v-model="wpWeight"
                                                                            label="Вес"
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                    <v-col
                                                                        cols="6"
                                                                    >
                                                                        <v-text-field
                                                                            type="number"
                                                                            v-model="wpRepetitionsNumber"
                                                                            label="Количество повторений"
                                                                            required
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-btn
                                                                    color="orange"
                                                                    :disabled="!isValidWPForm"
                                                                    @click="mutate()"
                                                                >
                                                                    Добавить
                                                                </v-btn>
                                                                <p v-if="error">An error occurred: {{ error }}</p>
                                                            </template>
                                                        </ApolloMutation>
                                                    </template>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                        <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog = false"
                                        >
                                            Close
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="on"
                                        >
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                        <v-row dense>
                            <v-col
                                v-for="(item, i) in data.workouts"
                                :key="i"
                                cols=12
                            >
                                <v-card
                                >
                                    <div class="d-flex justify-space-between">
                                        <div class="flex-grow-1">
                                            <v-card-title
                                                class="text-h5"
                                                v-text="item.title"
                                            ></v-card-title>
                                            <v-card-title
                                                class="text-subtitle-1"
                                                v-text="item.date"
                                            ></v-card-title>

                                            <v-card-text>{{ item.description }}</v-card-text>
                                        </div>
                                        <div class="d-flex align-center mx-5">
                                            <v-btn
                                                color="orange"
                                                class="control black--text"
                                                fab
                                                dark
                                                small
                                            >
                                                <v-icon>mdi-trash-can</v-icon>
                                            </v-btn>
                                            <v-btn
                                                color="orange"
                                                class="control black--text"
                                                fab
                                                dark
                                                small
                                            >
                                                <v-icon>mdi-eye</v-icon>
                                            </v-btn>
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

import ApolloQueryPresenter from "@/components/ApolloQueryPresenter";
import gql from "graphql-tag";

export default {
    name: 'Workouts',
    meta: {
        title: 'horrr'
    },
    components: {
        ApolloQueryPresenter
    },
    async created () {
        console.log('created');
        const exercises = await this.$apollo.query({
            query: gql`
               query {
                    exercises {
                        id
                        title
                    }
               }
            `
        });

        this.exercisesList = exercises.data.exercises.map(this.mapExerciseToSelectItem);
    },
    data() {
        return {
            header: 'Тренировки',
            newMessage: '',
            dialog: false,
            // form
            showWorkPartForm: false,
            exercisesList: [],
            wpTitle: '',
            wpDescription: '',
            wpExercise: {
                abbr: null
            },
            wpWeight: 0,
            wpRepetitionsNumber: 0,
            wpSortOrder: 0,
            wpCompleted: false
        }
    },

    computed: {
        isValidWPForm() {
            return (
                !!this.wpTitle &&
                !!this.wpDescription &&
                !!this.wpExercise &&
                !!this.wpRepetitionsNumber
            )
        }
    },

    methods: {
        on(some) {
            console.log('sommm', some);
        },
        onDone(res) {
            console.log('done', res);
        },
        onShowPartClick() {
            this.showWorkPartForm = !this.showWorkPartForm;
            console.log('show', this.showWorkPartForm)
        },
        mapExerciseToSelectItem(exercise) {
            return {
                state: exercise.title,
                abbr: exercise.id
            };
        }
    },
}
</script>

<style scoped>
    .control {
        margin-right: 8px;
    }

    .control:last-child {
        margin-right: 0;
    }
</style>
