<template>
	<v-container class="d-flex fill-height align-start">
		<v-container v-if="workout && !isCompleted(workout.status)" class="flex-column align-content-stretch">
			<v-row class="text-h4">{{ workout.title }}</v-row>
			<v-row class="text-subtitle-1">{{ workout.date }}</v-row>
			<v-row class="text-subtitle-2"></v-row>
			<v-row class="text-body-1">{{ workout.description }}</v-row>
			<v-row>
				<div class="text-h6 mb-5">
					Этапы
				</div>
			</v-row>
			<v-timeline dense v-if="workout.workoutParts && !!workout.workoutParts.length">
				<v-slide-x-reverse-transition
					group
					hide-on-leave
				>
					<v-timeline-item
						v-for="item in workout.workoutParts"
						:key="item.id"
						:color="item.color"
						small
						fill-dot
					>
						<v-alert
							:value="true"
							:color="item.completed ? 'green' : 'orange'"
							class="black--text"
						>
							<div class="text-h5">
								{{item.title}}
							</div>
							<div class="text--accent-1">
								<strong>Количество повторений:</strong> {{item.repetitionsNumber}}
							</div>
							<div class="text--accent-1">
								<strong>Вес (кг): </strong>{{item.weight}}
							</div>
							<div class="text--accent-1">
								<strong>Упражнение: </strong>
								<router-link
									tag="a"
									:to="`/exercise/${item.exercise.id}`"
								>
									{{item.exercise.title}}
								</router-link>
							</div>
							<div class="text mt-2">
								{{item.description}}
							</div>
							<div
								v-if="item.completed"
								class="text mt-2"
							>
								<v-icon>mdi-check-circle</v-icon>
							</div>
							<ApolloMutation
								v-else
								:mutation="require('../graphql/mutations/CompleteWorkoutPart.gql')"
								:variables="{id: workout.id , wpId: item.id}"
								class="mr-2"
								@done="onSuccessWorkoutPartComplete"
							>
								<template v-slot="{ mutate }">
									<v-btn
										color="black"
										class="control white--text"
										dark
										small
										@click="mutate()"
									>
										<v-icon>mdi-check-circle-outline</v-icon>
									</v-btn>
								</template>
							</ApolloMutation>
						</v-alert>
					</v-timeline-item>
				</v-slide-x-reverse-transition>
			</v-timeline>
		</v-container>
		<div v-else class="main-container">
			<img class="main-img" src="../assets/main.jpeg" alt=""/>
			<div class="main-message">
				<div class="text-h3 align-center d-flex justify-center white--text main-text">Нет активных тренировок</div>
				<router-link tag="div" :to="`/workouts`">
					<v-btn
						color="white"
						class="control black--text"
						dark
					>
						Начать новую тренировку
					</v-btn>
				</router-link>
			</div>
		</div>
	</v-container>
</template>

<script>
import {appRoutes, createRoute} from "../router/routes";
import {workoutStatus} from "@/server/server";

export default {
	name: 'Exercise',
	async created(){
		const workout = await this.$apollo.query({
			query: require('../graphql/queries/ActiveWorkout.gql')
		});
		//
		this.workout = workout.data.activeWorkout;
	},
	data(){
		return {
			workout: null
		}
	},
	components: {
	},
	methods: {
		onSuccessWorkoutPartComplete(workout) {
			this.workout = workout.data.completeWorkoutPart.workout;
		},
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
				case workoutStatus.free: {
					return 'Свободная'
				}
				case workoutStatus.in_process: {
					return 'В процессе'
				}
				case workoutStatus.completed: {
					return 'Заверешан'
				}
			}
		},
		isCompleted(status){
			console.log('sttt',this.workout, status, status === workoutStatus.in_process);
			return status === workoutStatus.completed
		}
	},
}
</script>

<style scoped>
	.main-container {
		width: 100%;
		position: relative;
	}
	.main-img {
		width: 100%;
	}
	.main-message{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.main-text {
		text-shadow: 1px 3px 4px rgba(0, 0, 0, .4);
		margin-bottom: 10px;
	}
</style>
