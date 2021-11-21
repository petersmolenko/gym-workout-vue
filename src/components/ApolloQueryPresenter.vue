<template>
    <div class="presenter fill-height">
        <!-- Loading -->
        <Loader v-if="result.loading"></Loader>

        <!-- Error -->
        <div
            v-else-if="result.error"
            class="apollo fill-height d-flex align-center justify-center"
        >
            {{ result.error }}
        </div>

        <!-- Result -->
        <slot
            :data="result.data"
            v-else-if="result.data"
            class="result apollo"
        >
            Has data.
        </slot>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
    </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
    components: {Loader},
    name: 'ApolloQueryPresenter',
    props: ['result',]
}
</script>
