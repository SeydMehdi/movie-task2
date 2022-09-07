<template>
    <v-card :loading="isLoading" class="mx-auto" :class="{ 'animate-pulse': isLoading }" max-width="374">
        <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <div>

        </div>
        <img @click="showDetail(movie)" style="width:100%;" :src="getImageUrl(movie)" />
        <v-card-title @click="showDetail(movie)">{{ movie.title }}</v-card-title>
        <v-card-text>{{ movie.release_date }}</v-card-text>
        <v-card-text>
            <v-row align="center" class="mx-0">
                <v-rating color="amber" half-increments v-model="voteValue"></v-rating>
                <div class="grey--text ms-4">
                    {{ movie.vote_average }} ({{ movie.vote_count }})
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                <v-chip class="m-1" v-for="genre in getGenreList(movie)">{{genre["name"]}}</v-chip>
            </div>


            <div style="
            height: 100px;
            line-height: 20px;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            line-clamp: 5;">{{ movie.overview }}
            </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
            <v-btn color="deep-purple lighten-2" @click="showDetail(movie)">
                Detail
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { store, genre } from '../store'


const props = defineProps({
    isLoading: { type: Boolean, default: false },
    movie: {
        type: Object, default() {
            return { backdrop_path: "", title: "", release_date: "", vote_average: 0 }
        }
    }
})

const emit = defineEmits(['showdetail'])
const voteValue = computed(() :number => {
    return props.movie.vote_average / 2
})


const getGenreList = (movie) => {
    let arr: genre[] = [];
    if (movie != undefined) {
        for (const i in movie.genre_ids) {
            let id = parseInt(movie.genre_ids[i]);
            let filtered = store.state.genres.filter(m => { return m.id == id });
            arr = [...arr, ...filtered]
        }
    }
    return arr;
}
const showDetail = (movie) => {
    emit("showdetail", movie.id);
}

const getImageUrl = (movie) => {
    if (props.isLoading) return '/images/preview1.png'
    return movie.backdrop_path;
}


</script>