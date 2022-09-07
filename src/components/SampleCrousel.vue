<template>
  <carousel :items-to-show="5">
    <slide v-for="src in props.images" :key="src">
      <div class="px-5 w-96">
        <div>
          <img class="rounded-xl w-5/6" :src="getImagePath(src.profile_path)" :key="src" />
        </div>
        <div>
          {{src.name}}
        </div>
      </div>
      
    </slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>
<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { getImagePath } from '../plugins/postman';

const props = defineProps({
  images: { type: Array, default() { return ["/images/preview1.png"] } }
})
</script>