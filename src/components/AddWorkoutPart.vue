<template>
    <v-container fluid>
        <v-row>
            <v-text-field
                v-model="value.title"
                label="Название*"
                required
            ></v-text-field>
        </v-row>
        <v-row>
            <v-textarea
                v-model="value.description"
                label="Описание*"
                text
                required
            ></v-textarea>
        </v-row>
        <v-row>
            <v-select
                v-model="value.exercise"
                :items="exercisesList"
                item-text="state"
                item-value="abbr"
                label="Упражнение"
                :disabled="!exercisesList.length"
                persistent-hint
                return-object
                single-line
            ></v-select>
        </v-row>
        <v-row>
            <v-col
                class="pa-0"
                cols="5"
            >
                <v-text-field
                    type="number"
                    v-model="value.weight"
                    label="Вес"
                ></v-text-field>
            </v-col>
            <v-col cols="2"/>
            <v-col
                class="pa-0"
                cols="5"
            >
                <v-text-field
                    type="number"
                    v-model="value.repetitionsNumber"
                    label="Количество повторений"
                    required
                ></v-text-field>
            </v-col>
        </v-row>
       <v-row>
           <v-btn
               color="orange"
               class="mr-3"
               :disabled="!isValidWPForm"
               @click="onSave()"
           >
               Добавить
           </v-btn>
           <v-btn
               color="black"
               class="white--text"
               @click="onReset()"
           >
               Очистить
           </v-btn>
       </v-row>
    </v-container>
</template>

<script>
    import gql from "graphql-tag";

    export default {
        components: {},
        name: 'AddWorkoutPart',
        props: ['onChange',],
        async created () {
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
                exercisesList: [],
                value: {...this.initValue}
            }
        },
        computed: {
            initValue() {
                return(
                    {
                        title: '',
                        description: '',
                        exercise: {
                            abbr: null
                        },
                        weight: 0,
                        repetitionsNumber: 0,
                        sortOrder: 0,
                        completed: false
                    }
                )
            },
            isValidWPForm() {
                return (
                    !!this.value.title &&
                    !!this.value.description &&
                    !!this.value.exercise &&
                    !!this.value.repetitionsNumber
                )
            }
        },
        methods: {
            onSave() {
                const res = {
                    ...this.value,
                    exercise: this.value.exercise.abbr
                };

                this.onChange(res)
            },
            onReset() {
                this.value = {...this.initValue};
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
