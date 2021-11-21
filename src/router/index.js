import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { appParams, appRoutes, createRouteTemplate } from "./routes";

Vue.use(VueRouter);

const routes = [
  {
    path: appRoutes.root,
    name: "Home",
    component: Home,
    meta: {
      title: "Главная",
    },
  },
  {
    path: appRoutes.workouts,
    name: "Workouts",
    component: () =>
      import(/* webpackChunkName: "workouts" */ "../views/Workouts.vue"),
    meta: {
      title: "Тренировки",
    },
  },
  {
    path: appRoutes.exercises,
    name: "Exercises",
    component: () =>
      import(/* webpackChunkName: "exercises" */ "../views/Exercises.vue"),
    meta: {
      title: "Упражнения",
    },
  },
  {
    path: createRouteTemplate(appRoutes.exercises, [
      appParams.muscleGroupFilter,
    ]),
    name: "Exercises by muscle group",
    component: () =>
      import(/* webpackChunkName: "exercises" */ "../views/Exercises.vue"),
    meta: {
      title: "Упражнения",
    },
  },
  {
    path: createRouteTemplate(appRoutes.exercise, [appParams.id]),
    name: "Exercise",
    component: () =>
      import(/* webpackChunkName: "exercise" */ "../views/Exercise.vue"),
    meta: {
      title: "Упражнение",
    },
  },
  {
    path: appRoutes.trainers,
    name: "Trainers",
    component: () =>
      import(/* webpackChunkName: "trainers" */ "../views/Trainers.vue"),
    meta: {
      title: "Тренажеры",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
