<template>
    <v-app class="pa-0">
        <v-app-bar
            app
            color="orange"
            class="pa-0 fill-height"
            style="padding: 0"
            absolute
        >
            <v-container class="d-flex justify-space-between fill-height align-center py-0">
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
                    </v-toolbar-title>
                </div>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-md-and-down">
                    <v-btn
                        v-for="item in menuItems"
                        :key="item.caption"
                        class="orange fill-height"
                        :to="`${item.path}`"
                        flat
                        text
                    >
                        <v-icon class="mr-1">
                            {{ item.icon }}
                        </v-icon>
                        <div class="text--darken-1">
                            {{ item.caption }}
                        </div>
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-items class="hidden-lg-and-up">
                    <v-app-bar-nav-icon @click="drawer = true"/>
                </v-toolbar-items>
            </v-container>
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
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="text-decoration-none">{{ item.caption }}</v-list-item-title>

                        </v-list-item>
                    </router-link>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex flex-column">
            <div class="text-h6 font-weight-300 orange--text px-5 py-2 black text-uppercase">
                <v-container>
                    {{ $route.meta.title }}
                </v-container>
            </div>
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
                {{ new Date().getFullYear() }} — <strong>{{ author }}</strong>
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
import {appRoutes} from "@/router/routes";

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
                path: appRoutes.root
            },
            {
                caption: 'Тренировки',
                icon: 'mdi-flash',
                path: appRoutes.workouts
            },
            {
                caption: 'Упражнения',
                icon: 'mdi-arm-flex',
                path: appRoutes.exercises
            },
            {
                caption: 'Тренажеры',
                icon: 'mdi-anvil',
                path: appRoutes.trainers
            }
        ]
    }),
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || to.name;
            }
        },
    }
};
</script>

<style scoped>
/deep/ .v-toolbar__content {
        padding: 0px !important;
    }
/deep/ .v-main__wrap {
    display: flex;
    flex-direction: column;
}
</style>
