// App path
export const appRoutes = {
    root: '/',
    exercises: '/exercises',
    exercise: '/exercise',
    trainers: '/trainers',
    trainer: '/trainer',
    workouts: '/workouts'
}

// App params
export const appParams = {
    id: 'id'
}

/**
 * Helpers
 */

// Path builder
export const createRoute = (route, params) => {
    return route.concat(params.map(param => `/:${param}`));
}

