<template>
    <v-container class="d-flex fill-height align-start">
        <ApolloQuery
            :query="require('../graphql/Exercise.gql')"
            :variables="{ id: $route.params.id }"
            class="d-flex fill-height flex-grow-1"
        >
            <template
                v-slot="{result: { loading, error, data }}"
            >
                <!-- Loading -->
                <Loader v-if="loading"></Loader>

                <!-- Error -->
                <div
                    v-else-if="error"
                    class="error apollo"
                >
                    {{ error }}
                </div>

                <!-- Result -->
                <div v-else-if="data && data.exercise" class="result apollo">
                    <v-breadcrumbs
                        divider="/"
                        :items="createBreadCrumbs(data.exercise)"
                        class="pa-0 mb-3"
                        large
                        light
                    >
                        <template v-slot:item="{ item }">
                            <v-breadcrumbs-item
                                :to="item.to"
                                class="text-subtitle-2 crumb-item"
                                :disabled="item.disabled"
                                exact
                            >
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </template>
                    </v-breadcrumbs>
                    <div class="text-h4">{{ data.exercise.title }}</div>
                    <div class="text-subtitle-2 text--darken-1 my-3">
                        <span class="mr-2">Группа мышц:</span>
                        <router-link tag="div" :to="exercisesForMuscleGroupPath(data.exercise.muscleGroup)">
                            <v-chip
                                color="orange"
                            >
                                {{ getCaptionMuscleGroup(data.exercise.muscleGroup) }}
                            </v-chip>
                        </router-link>
                    </div>
                    <div class="text-body-1">{{ data.exercise.description }}</div>
                </div>

                <!-- No result -->
                <div v-else class="no-result apollo">No result :(</div>
            </template>
        </ApolloQuery>
    </v-container>
</template>

<script>
import {getMuscleGroupCaptionByAlias} from "../utils/data";
import Loader from "./controls/Loader";
import {appRoutes, createRoute} from "../router/routes";

export default {
    name: 'Exercise',
    components: {Loader},

    methods: {
        getCaptionMuscleGroup: (mGroup) => {
            return getMuscleGroupCaptionByAlias(mGroup)
        },

        exercisesForMuscleGroupPath(muscleGroup) {
            return createRoute(appRoutes.exercises, [muscleGroup.toLowerCase()])
        },

        createBreadCrumbs(exercise) {
            return (
                [
                    {
                        text: 'Упражнения',
                        disabled: false,
                        to: appRoutes.exercises
                    },
                    {
                        text: exercise.title,
                        to: createRoute(appRoutes.exercise, [exercise.id]),
                        disabled: true
                    },
                ]
            )
        }
    },
}
</script>
