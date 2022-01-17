<template>
    <v-container class="d-flex fill-height align-start">
        <ApolloQuery
            :query="require('../graphql/queries/Workout.gql')"
            :variables="{ id: $route.params.id }"
            class="d-flex fill-height flex-grow-1"
            slot="result"
        >
            <template v-slot="{result}">
                <apollo-query-presenter :result="result">
                    <template
                        v-slot="{data}"
                    >
						<v-row>
							<v-breadcrumbs
								divider="/"
								:items="createBreadCrumbs(data.workout)"
								class="px-0 pt-5"
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
						</v-row>
                        <v-row class="text-h4">{{ data.workout.title }}</v-row>
						<v-row class="text-subtitle-1">{{ data.workout.date }}</v-row>
						<v-row class="text-subtitle-2"></v-row>
                        <v-row>
							<v-chip
								color="black orange--text"
							>
								{{ getStatusLabel(data.workout.status) }}
							</v-chip>
						</v-row>
						<v-row class="text-body-1">{{ data.workout.description }}</v-row>
						<v-row>
							<div class="text-h6 mb-5">
								Этапы
							</div>
						</v-row>
						<v-row>
							<v-timeline dense v-if="!!data.workout.workoutParts.length">
								<v-slide-x-reverse-transition
									group
									hide-on-leave
								>
									<v-timeline-item
										v-for="item in data.workout.workoutParts"
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
                    </template>
                </apollo-query-presenter>
            </template>

        </ApolloQuery>
    </v-container>
</template>

<script>
import {appRoutes, createRoute} from "../router/routes";
import ApolloQueryPresenter from '../components/ApolloQueryPresenter.vue';

export default {
    name: 'Exercise',
    components: {
        ApolloQueryPresenter
    },
    methods: {
        createBreadCrumbs(exercise) {
            return (
                [
                    {
                        text: 'Тренировки',
                        disabled: false,
                        to: appRoutes.workouts
                    },
                    {
                        text: exercise.title,
                        to: createRoute(appRoutes.exercise, [exercise.id]),
                        disabled: true
                    },
                ]
            )
        },
		getStatusLabel(status) {
			switch(status.toUpperCase()) {
				case 'FREE': {
					return 'Свободная'
				}
				case 'IN_PROCESS': {
					return 'В процессе'
				}
				case 'COMPLETED': {
					return 'Заверешан'
				}
			}
		}
    },
}
</script>
