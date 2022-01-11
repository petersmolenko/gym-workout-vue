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
                                                <v-text-field
                                                    label="Название*"
                                                    v-model="value.title"
                                                    required
                                                ></v-text-field>
                                            </v-row>
                                            <v-row>
                                                <v-textarea
                                                    label="Краткое описание"
                                                    v-model="value.description"
                                                    text
                                                ></v-textarea>
                                            </v-row>
                                            <v-row>
                                                <div class="text-h6 mb-5">
                                                    Этапы
                                                </div>
                                            </v-row>
                                            <v-row>
                                                <v-timeline dense v-if="!!workoutParts.length">
                                                    <v-slide-x-reverse-transition
                                                        group
                                                        hide-on-leave
                                                    >
                                                        <v-timeline-item
                                                            v-for="item in workoutParts"
                                                            :key="item.id"
                                                            :color="item.color"
                                                            small
                                                            fill-dot
                                                        >
                                                            <v-alert
                                                                :value="true"
                                                                color="orange"
                                                                class="black--text"
                                                            >
                                                                <div class="text-h5">
                                                                    {{item.title}}
                                                                </div>
                                                                <div class="text">
                                                                    {{item.description}}
                                                                </div>
                                                            </v-alert>
                                                        </v-timeline-item>
                                                    </v-slide-x-reverse-transition>
                                                </v-timeline>
                                                <div
                                                    v-else
                                                    class="py-8 d-flex justify-center align-center"
                                                >
                                                    Этапы тренировки отсутствуют
                                                </div>
                                            </v-row>
                                            <v-row class="py-5">
                                                <v-btn
                                                    v-on:click="onShowPartClick"
                                                    color="orange"
                                                    class="control black--text"
                                                    dark
                                                >
                                                    <v-icon v-if="!showWorkPartForm">mdi-plus</v-icon>
                                                    <v-icon v-else>mdi-close-thick</v-icon>
                                                </v-btn>
                                            </v-row>
                                            <v-row v-if="showWorkPartForm">
                                                <ApolloMutation
                                                    class="flex-grow-1"
                                                    :mutation="require('../graphql/mutations/AddWorkPart.gql')"
                                                    :variables="editWorkPart"
                                                    @done="onDone"
                                                >
                                                    <template v-slot="{ mutate }">
                                                        <add-workout-part
                                                            fluid
                                                            :on-change="onChangeWorkPartForm(mutate)"
                                                        />
                                                    </template>
                                                </ApolloMutation>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog = false"
                                        >
                                            Отменить
                                        </v-btn>
                                        <ApolloMutation
                                            class="flex-grow-1"
                                            :mutation="require('../graphql/mutations/AddWorkout.gql')"
                                            :variables="{
                                                ...value,
                                                workoutParts: workoutParts.map(wp => wp.id)
                                            }"
                                            @done="onSuccessWorkoutCreate"
                                        >
                                            <template v-slot="{ mutate }">
                                                <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="onSuccess(mutate)"
                                                >
                                                    Сохранить
                                                </v-btn>
                                            </template>
                                        </ApolloMutation>
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
import AddWorkoutPart from "@/components/AddWorkoutPart";

export default {
    name: 'Workouts',
    meta: {
        title: 'horrr'
    },
    components: {
        AddWorkoutPart,
        ApolloQueryPresenter,
    },
    created() {
       console.log('ammmm',  this.currentDate());
    },
    data() {
        return {
            header: 'Тренировки',
            newMessage: '',
            dialog: false,
            // form
            showWorkPartForm: false,
            editWorkPart: {},
            workoutParts: [],
            value: {
                title: '',
                description: ''
            }
        }
    },

    computed: {
    },

    methods: {
        onChangeWorkPartForm(mutate) {
            return async (val) => {
                this.editWorkPart = val;

                await this.$nextTick();

                mutate();
            }
        },
        onSuccess(mutate) {
            mutate()
        },
        onSuccessWorkoutCreate() {
            this.dialog = false;
        },
        onCancel(mutate) {
            console.log('sommm', mutate);
        },
        onDone(res) {
            const wp = res.data?.createWorkoutPart?.workoutPart;
            if (!wp) return;
            this.workoutParts = [...this.workoutParts, wp]
        },
        onShowPartClick() {
            this.showWorkPartForm = !this.showWorkPartForm;
            console.log('show', this.showWorkPartForm)
        },
        formatNum(num){
            if (num < 10) return `0${num}`;
            return String(num);
        },
        currentDate() {
            const d = new Date();
            return `${d.getFullYear()}-${this.formatNum(d.getMonth()+1)}-${this.formatNum(d.getDate())}`
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
