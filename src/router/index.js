import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Главная'
    }
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: () => import(/* webpackChunkName: "workouts" */ '../components/Workouts.vue'),
    meta: {
      title: 'Тренировки'
    }
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import(/* webpackChunkName: "exercises" */ '../components/Exercises.vue'),
    meta: {
      title: 'Упражнения'
    }
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: () => import(/* webpackChunkName: "exercises" */ '../components/Trainer.vue'),
    meta: {
      title: 'Тренажеры'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
