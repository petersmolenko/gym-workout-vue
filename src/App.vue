<template>
  <v-app>
    <v-app-bar
      app
      color="orange"
      absolute
    >
    <v-app-bar-nav-icon @click="drawer = true" />
    <v-spacer></v-spacer>
    <div class="d-flex align-center ml-2">
      <v-icon
        large
        color="black"
      >
        mdi-star-shooting
      </v-icon>
      <v-toolbar-title
      class="text-h5 font-weight-bold"
      >
        <router-link :to="`/`" class="text-decoration-none black--text">
          GymWorkout
        </router-link>
        <span class="text-h6 font-weight-300 orange--text px-5 py-2 black">
          {{$route.meta.title}}
        </span>
      </v-toolbar-title>
    </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      color="black"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          class="orange--text"
          active-class="orange--text text--accent-4"
          dark
          id="#menu-items"
        >
        <router-link
          :to="`${item.path}`"
          class="text-decoration-none white--text"
          v-for="item in menuItems" :key="item.caption"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-decoration-none">{{item.caption}}</v-list-item-title>
            
          </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer
    color="black"
    dark
    padless
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>{{author}}</strong>
      </v-col>
  </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
      drawer: false,
      group: null,
      el: '#menu-items',
      author: 'Peter Smolenko',
      menuItems: [
        {
          caption: 'Главная',
          icon: 'mdi-home',
          path: '/'
        },
        {
          caption: 'Тренировки',
          icon: 'mdi-flash',
          path: '/workouts'
        },
        {
          caption: 'Упражнения',
          icon: 'mdi-arm-flex',
          path: '/exercises'
        },
        {
          caption: 'Тренажеры',
          icon: 'mdi-anvil',
          path: '/trainer'
        }
      ]
    }),
     watch: {
        $route: {
            immediate: true,
            handler(to) {
              console.log(to);
                document.title = to.meta.title || to.name;
            }
        },
    }
};
</script>
