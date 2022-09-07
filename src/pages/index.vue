<script setup>
import { discoverMovies, getImagePath, genreMovieList } from '../plugins/postman';
import { ref, onMounted, watch, computed } from 'vue'
import { store } from '../store'

import MovieCard from '../components/MovieCard.vue'
import router from '../router';
const movies = ref([]);
const selectedDate = ref([])
const isLoading = ref(false);
const searchByDate = ref(false);

movies.value = [];
for (let index = 0; index < 20; index++) {
  movies.value.push({})

}
const search = () => {

}
const navToDetail = (id) => {
  router.push("/detail/" + id);
  console.log("movie cilcked id = " + id)
}


const searchMovies = (page) => {
  store.commit('setPage', page);
  let params = undefined;
  if (searchByDate.value) {
    params = {
      "release_date.gte": selectedDate.value[0],
      "release_date.lte": selectedDate.value[1]
    }
  }
  isLoading.value = true;
  discoverMovies(page, params).
    then((result) => {
      const dataList = result.data.results;
      for (let i = 0; i < dataList.length; i++) {
        let movie = dataList[i];
        movie.backdrop_path = getImagePath(movie.backdrop_path);
        if (i > movies.length)
          movies.value.push({ ...movie });
        else
          movies.value[i] = { ...movie };
      }
      isLoading.value = false;


    }).catch((response) => {
      isLoading.value = false
      console.log(response);
    });
}

onMounted(() => {
  function prepareObject(movie) {
    let obj = {
      backdrop_path: getImagePath(movie.backdrop_path),
      title: movie.title,
      release_date: movie.release_date,
      vote_count: movie.vote_count,
      vote_average: movie.vote_average,
      overview: movie.overview
    }
    return obj;
  }


  searchMovies(store.state.page);
});
</script>

<template>
  <div>
    <div class="container mx-auto px-4 border-2 border-gray-100 ">
      <div class="grid grid-cols-4 gap-4 bg-gray-200 px-3">

        <div class="col-span-3">
          <div class="flex">
            <div class="mr-2">
              <v-switch color="primary" v-model="searchByDate"></v-switch>
            </div>
            <div class="mr-2 pt-4 text-gray-900" :class="{ 'text-gray-500': searchByDate }">BetweenDate :</div>
            <div class="pt-3">
              <DatePicker model-type="yyyy-MM-dd" format="yyyy-MM-dd" :disabled="!searchByDate" range v-model="selectedDate"></DatePicker>
            </div>
          </div>
        </div>

        <div class="pt-3">
          <v-btn color="primary" @click="searchMovies(store.state.page)">Search</v-btn>
        </div>
      </div>
      <div>
        <div class="w-96 mx-auto py-5">
          <div class="flex">
            <v-btn outlined :disabled="store.state.page == 1 || isLoading" color="deep-purple lighten-2 mr-2"
              @click="searchMovies(store.state.page - 1)">
              Prev Page <span v-if="store.state.page > 1">({{store.state.page - 1 }})</span>
            </v-btn>
            <div class="w-28 text-center pt-1 font-bold">
              Page : {{store.state.page}}
            </div>
            <v-btn :disabled="isLoading" color="deep-purple lighten-2" @click="searchMovies(store.state.page + 1)">
              Next Page ({{store.state.page +1 }})
            </v-btn>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <MovieCard @showdetail="navToDetail" :is-loading="isLoading" v-for="movie in movies" :key="movie"
            :movie="movie"></MovieCard>
        </div>
      </div>

    </div>

  </div>

</template>

<style >
.vpd-input-group {
  border: 1px solid rgb(230, 230, 230);
}

.vpd-input-group {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}

.vpd-icon-btn {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.vpd-input-group.vpd-disabled {
  background-color: rgb(221, 221, 221);
  ;
}

.vpd-input-group.vpd-disabled .vpd-icon-btn {
  background-color: rgb(189 189 189) !important;
}
</style>