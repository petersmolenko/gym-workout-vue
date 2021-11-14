import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {appParams, appRoutes, createRoute} from "./routes";

Vue.use(VueRouter)

const routes = [
  {
    path: appRoutes.root,
    name: 'Home',
    component: Home,
    meta: {
      title: 'Главная'
    }
  },
  {
    path: appRoutes.workouts,
    name: 'Workouts',
    component: () => import(/* webpackChunkName: "workouts" */ '../components/Workouts.vue'),
    meta: {
      title: 'Тренировки'
    }
  },
  {
    path: appRoutes.exercises,
    name: 'Exercises',
    component: () => import(/* webpackChunkName: "exercises" */ '../components/Exercises.vue'),
    meta: {
      title: 'Упражнения'
    }
  },
  {
    path: createRoute(appRoutes.exercise, [appParams.id]),
    name: 'Exercise',
    component: () => import(/* webpackChunkName: "exercises" */ '../components/Exercise.vue'),
    meta: {
      title: 'Упражнение'
    }
  },
  {
    path: appRoutes.trainers,
    name: 'Trainers',
    component: () => import(/* webpackChunkName: "exercises" */ '../components/Trainer.vue'),
    meta: {
      title: 'Тренажеры'
    }
  },
  {
    path: appRoutes.trainer,
    name: 'Trainer',
    component: () => import(/* webpackChunkName: "exercises" */ '../components/Trainer.vue'),
    meta: {
      title: 'Тренажер'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
