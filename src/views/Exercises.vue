<template>
    <v-container class="flex-column d-flex align-stretch flex-grow-1">
        <v-toolbar dense class="mb-5 flex-grow-0 px-1">
            <v-combobox
                v-model="selectMuscleGroupFilterItem"
                :items="muscleGroupFilterItems"
                label="Фильтровать упражнения"
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
        <ApolloQuery
            :query="require('../graphql/queries/Exercises.gql')"
            slot="result"
            class="flex-grow-1"
        >
            <template v-slot="{result}" class="fill-height">
                <apollo-query-presenter :result="result">
                    <template
                        v-slot="{data}"
                    >
                        <v-row dense v-if="filterExercises(data.exercises).length > 0">
                            <v-col
                                v-for="(item, i) in filterExercises(data.exercises)"
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
                                            <v-icon size='60' color='orange'>{{
                                                    getIconByMuscleGroup(item.muscleGroup)
                                                }}
                                            </v-icon>
                                        </v-avatar>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                        <div v-else class="d-flex justify-center align-center fill-height text-subtitle-1">Нет доступных упражнений</div>
                    </template>
                </apollo-query-presenter>
            </template>
        </ApolloQuery>
    </v-container>
</template>

<script>
import {getMuscleGroupCaptionByAlias, MUSCLE_GROUP} from "@/utils/data";
import ApolloQueryPresenter from '../components/ApolloQueryPresenter.vue';
import {appParams, appRoutes, createRoute} from "@/router/routes";

export default {
    name: 'Exercises',
    components: {
        ApolloQueryPresenter
    },
    data() {
        return {
            exercises: [],
            muscleGroupFilterItems: this.makeMuscleGroupFilters(),
            selectMuscleGroupFilterItem: this.makeMuscleGroupFilter(this.$route.params[appParams.muscleGroupFilter]),
            appliedMuscleGroupFilter: this.makeMuscleGroupFilter(this.$route.params[appParams.muscleGroupFilter])
        }
    },

    methods: {
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
            this.$router.push(createRoute(appRoutes.exercises, [this.selectMuscleGroupFilterItem?.value ?? '']))
                .then(res => {
                    this.appliedMuscleGroupFilter = this.makeMuscleGroupFilter(res.params[appParams.muscleGroupFilter]);
                })
                .catch(()=>{})
        },
        resetSelectFilter() {
            this.selectMuscleGroupFilterItem = null;
            this.applySelectFilter();
        },
        filterExercises(exercises) {
            return exercises.filter(exercise => !this.appliedMuscleGroupFilter || exercise.muscleGroup === this.appliedMuscleGroupFilter.value);
        },
        makeMuscleGroupFilter(mg) {
            if (!mg) return null;

            return {
                text: this.getCaptionMuscleGroup(mg),
                value: mg
            }
        },
        makeMuscleGroupFilters() {
           return Object.values(MUSCLE_GROUP).map(this.makeMuscleGroupFilter.bind(this));
        }
    },
}
</script>

<style scoped>
.filter-control {
    max-width: 250px
}
</style>
