<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { genre } from '../store';
import { getMovieDetail, getMovieCredit, getImagePath } from '../plugins/postman';
import DetailItem from '../components/DetailItem.vue';
import SampleCrousel from '../components/SampleCrousel.vue';
import { credit as creditClass } from '../types/credit';
import { cast } from '../types/cast';
const router = useRoute();
let id = parseInt(router.params.id as string);
const movie = ref({
  overview: "",
  title: "",
  tagline: "",
  imdb_id: "",
  release_date: "",
  poster_path: "",
  popularity: 0,
  budget: 0, runtime: 0,
  revenue: 0,
  vote_average: 0,
  vote_count: 0,
  homepage: "",
  genres: [] as genre[]
});
const credit = ref(new creditClass());
onMounted(() => {
  getMovieDetail(id, (result) => {
    movie.value = result;
  })
  getMovieCredit(id, (result) => {
    credit.value = result;
    console.log(credit.value);
  })
})

const popularCasts = computed(() => {
  let arr: cast[] = [];
  if (credit.value.cast == undefined) return arr;
  arr = [...credit.value.cast];
  arr.sort((a, b) => {
    return b.popularity - a.popularity;
  });
  arr.splice(10);
  return arr;
})

const voteValue = computed(() :number => {
    return movie.value.vote_average / 2
})


const getGenres = (movie) => {
  return movie.genres.map(m => m.name).join(",");

};
const getTime = (movie) => {
  let hour = Math.ceil(movie.runtime / 60)
  let minute = movie.runtime - (hour * 60)
  return `${hour}h ${minute}m`
}
const toN0String = (value) => {

  return `$${value.toLocaleString()}`
}
const getCastList = () => {
  return
}
const imdbLink = (movie) => {
  return `https://www.imdb.com/title/${movie.imdb_id}`
};
</script>

<template>
  <div>

    <div class="container mx-auto px-0 border-2 border-gray-100 ">
      <div class="flex bg-gray-200 p-5">

        <div class="pt-1">
          <v-btn to="/" color="primary">
            <v-icon right dark>mdi-arrow-left</v-icon>
            Homepage
          </v-btn>
        </div>
        <div class="pt-1 ml-4">
          <div class="font-bold">
            {{ movie.title }}
          </div>
          <div>
            {{ movie.tagline }}
          </div>
        </div>
      </div>
      <div class="pt-12 grid grid-cols-3 gap-4">
        <div class="p-5">

          <img class="rounded-md border-solid border-2 border-gray-100 h-full" :src="getImagePath(movie.poster_path)" />
        </div>
        <div class="col-span-2">
          <detail-item text="Budget" :value="toN0String(movie.budget)"></detail-item>
          <detail-item text="Revenue" :value="toN0String(movie.revenue)"></detail-item>
          <detail-item text="Release Date" :value="movie.release_date"></detail-item>
          <detail-item text="Runtime" :value="getTime(movie)"></detail-item>
          <detail-item text="Score">
            <div>
               {{ movie.vote_average }}({{ movie.vote_count }} <span class="font-sm">votes</span>)

            </div>
           <div>
              <v-rating color="amber" half-increments v-model="voteValue"></v-rating>
           </div>
          </detail-item>
          <detail-item text="Genres" :value="getGenres(movie)"></detail-item>
          <detail-item text="IMDB Link">
            <a class="underline decoration-orange-400 text-orange-400" :href="imdbLink(movie)">{{ movie.title }}</a>
          </detail-item>
          <detail-item text="Homepage Link">
            <a class="underline decoration-orange-400 text-orange-400" :href="movie.homepage">
              HomePage
            </a>
          </detail-item>

          <div class="m-5 mt-24">
            <div class="">
              <span class="font-bold text-2xl border-b-4 border-solid border-orange-400 px-5 pr-10">
                Popular Casts
              </span>
              <div class="border-b-2 mt-1 border-solid border-gray-100">

              </div>
            </div>
            <div class="border-2 pt-10  border-gray-100 border-solid">
              <SampleCrousel :images="popularCasts"></SampleCrousel>
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
