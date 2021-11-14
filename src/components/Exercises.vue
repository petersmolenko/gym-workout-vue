<template>
    <v-container>
        <v-toolbar dense class="mb-5">
            <v-spacer/>
            <v-combobox
                v-model="selectMuscleGroupFilterItem"
                :items="muscleGroupFilterItems"
                label="Фильтровать упражнения"
                chips
                single-line
                hide-details
                outlined
                dense
                size="10"
                clearable
                color="black"
                class="filter-control"
            ></v-combobox>
            <v-btn
                color="orange"
                class="ml-5 black--text"
                v-on:click="applySelectFilter"
            >
                <v-icon left>
                    mdi-filter
                </v-icon>
                Применить
            </v-btn>
            <v-btn
                color="black"
                class="ml-2 orange--text"
                v-on:click="resetSelectFilter"
            >
                <v-icon left>
                    mdi-close-circle-outline
                </v-icon>
                Сбросить
            </v-btn>
            <v-spacer/>
        </v-toolbar>
        <v-row dense>
            <v-col
                v-for="(item, i) in filteredExercises"
                :key="i"
                cols="6"
            >
                <v-card
                    dark
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                                class="text-h5"
                                v-text="item.title"
                            ></v-card-title>

                            <v-card-subtitle
                                color="orange"
                                class="text-uppercase orange--text"
                                v-text="`${getCaptionMuscleGroup(item.muscleGroup)}`"
                            />

                            <v-card-actions>
                                <router-link tag="div" :to="`/exercise/${item.id}`">
                                    <v-btn
                                        class="ml-2 mt-5"
                                        outlined
                                        rounded
                                        small
                                    >
                                        Просмотр
                                    </v-btn>
                                </router-link>
                            </v-card-actions>
                        </div>

                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                            <v-icon size='60' color='orange'>{{ getIconByMuscleGroup(item.muscleGroup) }}</v-icon>
                        </v-avatar>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import gql from 'graphql-tag';
import {getMuscleGroupCaptionByAlias} from "../utils/data";

export default {
    name: 'Exercises',
    data() {
        return {
            exercises: [],
            muscleGroupFilterItems: [],
            selectMuscleGroupFilterItem: null,
            appliedMuscleGroupFilter: null
        }
    },

    computed: {
        filteredExercises() {
            const filter = this.appliedMuscleGroupFilter

            if (!filter) return this.exercises;

            return this.exercises.filter(ex => ex.muscleGroup === filter.value)
        }
    },

    async created() {
        const exercises = await this.$apollo.query({
            query: gql`
        query {
          exercises {
            id,
            title,
            description,
            muscleGroup,
            trainingApparatus {
              id
            }
          }
        }
      `,
            variables: {}
        });

        this.exercises = exercises.data.exercises;

        this.muscleGroupFilterItems = this.getExerciseMuscleGroupFilterItems();

        console.log('kooo', exercises)
    },

    methods: {
        getExerciseMuscleGroupFilterItems() {
            const muscleGroups = this.exercises.map(ex => ex.muscleGroup);

            return muscleGroups.map(mG => ({text: this.getCaptionMuscleGroup(mG), value: mG}))
        },
        getIconByMuscleGroup: (mGroup) => {
            switch (mGroup.toLowerCase()) {
                case "legs":
                    return 'mdi-snowman';
                case "hands":
                    return 'mdi-arm-flex';
                case "shoulders":
                    return 'mdi-weight-lifter';
                case "back":
                    return 'mdi-human-handsup';
                case "chest":
                    return 'mdi-treasure-chest';
                default:
                    return 'mdi-help-circle';
            }
        },
        getCaptionMuscleGroup: (mGroup) => {
            return getMuscleGroupCaptionByAlias(mGroup)
        },
        applySelectFilter() {
            this.appliedMuscleGroupFilter = this.selectMuscleGroupFilterItem;
        },
        resetSelectFilter() {
            this.selectMuscleGroupFilterItem = null;
            this.appliedMuscleGroupFilter = null;
        }
    },
}
</script>

<style scoped>
.filter-control {
    max-width: 250px
}
</style>
