// App path
export const appRoutes = {
  root: "/",
  exercises: "/exercises",
  exercise: "/exercise",
  trainers: "/trainers",
  trainer: "/trainer",
  workouts: "/workouts",
  workout: "/workout",
};

// App params
export const appParams = {
  id: "id",
  muscleGroupFilter: "muscleGroupFilter",
};

/**
 * Helpers
 */

// Path builder
export const createRouteTemplate = (route, params) => {
  return route.concat(params.map((param) => `/:${param}`));
};

export const createRoute = (route, params) => {
  return route.concat(params.map((param) => `/${param}`));
};
